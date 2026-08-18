---
title: "I Built a Tiny Simulation to Actually See How a Buffer Works"
excerpt: "A first principles walkthrough of a Python program that simulates the relay race between a hard drive, a RAM buffer, and the CPU, with code for every question I asked myself along the way."
date: "2026-08-18"
dateLabel: "August 18, 2026"
type: post
featured: true
category: "Operating Systems"
image: "/posts/buffer-relay-race-simulation.png"
imageAlt: "I Built a Tiny Simulation to Actually See How a Buffer Works"
authorName: "Enwemasor Barnabas"
authorUrl: "https://enwemasorbarnabas.com"
tags: ["Operating Systems", "Python", "Concurrency", "Systems Design"]
---

I had a conversation recently about buffering that I could not let go of. I described my mental model of it out loud, something like this. A buffer is a chunk of RAM. The operating system moves a piece of a file from the hard drive into that chunk. The CPU, being much faster than the disk, reads from that chunk instead of reading from the disk directly. And while the CPU is chewing through what is already in RAM, the OS is quietly working in the background to bring the next piece over, hoping it lands in time.

That explanation felt right, but I have learned that a mental model you cannot poke at is just a story you are telling yourself. So I decided to build the smallest possible program that would let me watch this happen. Not read about it. Watch it. This post walks through that program from the ground up, and answers every question I had to ask myself while building it.

## Starting from first principles

Before touching any code, I wanted to be honest about what a buffer actually is, stripped of jargon.

A hard drive is slow relative to a CPU. Not slow in a way you would notice scrolling through a folder, but slow in the sense that if the CPU had to sit and wait for every single byte to travel from spinning platters or flash cells into a register, it would spend most of its life doing nothing. A CPU can execute billions of instructions per second. A disk read can take milliseconds. Milliseconds sound tiny until you realize the CPU could have done millions of other things in that same window.

So the operating system does something sensible. Instead of handing the CPU one byte at a time from disk, it reads a whole chunk ahead of time and parks it in RAM, which is orders of magnitude faster to read from. The CPU then reads from RAM, and the disk, in the background, is already fetching the next chunk so it is ready before the CPU asks for it.

That is the whole idea. Two things happening at different speeds, connected by a waiting room in the middle. The interesting part, the part that only becomes real when you simulate it, is what happens when the waiting room runs empty before the next visitor arrives.

## Modeling the relay race in code

I decided to represent this with two threads and a queue. One thread plays the role of the disk. One thread plays the role of the CPU. The queue between them plays the role of the RAM buffer. Here is the function that runs one race between them, and the questions I had to answer to trust that it actually simulates what I claimed it does.

### Setting up the race

```python
def run_scenario(disk_chunk_time):
    """Runs one disk-speed vs CPU-speed race and returns its event log."""
    buf = queue.Queue(maxsize=BUFFER_SLOTS)
    events = []  # (timestamp, buffer_level_after_event, description)
    log_lock = threading.Lock()
    start_time = time.time()
```

The line that matters most here is `buf = queue.Queue(maxsize=BUFFER_SLOTS)`. This is the RAM buffer. Not a metaphor for it. An actual bounded, thread safe, first in first out structure with a hard capacity, exactly like a real buffer only has so many slots of RAM allocated to it. Everything else in the setup exists to support recording what happens to that queue over time. `events` is the timeline I will plot later. `log_lock` exists because two threads will be writing to that timeline at once, and `start_time` gives every timestamp a common zero point.

### A small helper for recording what happened

```python
def log(description):
    with log_lock:
        t = time.time() - start_time
        events.append((t, buf.qsize(), description))
```

Every time something worth noting happens, a chunk gets filled, a chunk gets processed, a stall begins, this function gets called. It grabs the current elapsed time, checks how many chunks are currently sitting in the buffer with `buf.qsize()`, and appends both alongside a human readable description. This is what turns the simulation from something that just runs into something I can actually look at afterward.

### The disk, playing its slow and steady role

```python
def disk_reader():
    """The hard drive: fills the buffer chunk by chunk."""
    for i in range(TOTAL_CHUNKS):
        time.sleep(disk_chunk_time + random.uniform(-0.02, 0.02))
        buf.put(i)
        log(f"disk filled chunk {i}")
    buf.put(None)  # sentinel: "that's the whole file"
```

This function pretends to be the hard drive. For each of the twenty chunks that make up our imaginary file, it sleeps for roughly `disk_chunk_time` seconds, simulating how long a real disk read would take, then pushes the chunk into the buffer with `buf.put(i)`. The small jitter added with `random.uniform` exists because real disks are never perfectly consistent, and I wanted the simulation to feel a little less like a metronome and a little more like reality. Once every chunk has been pushed, it puts a `None` into the buffer as a sentinel, a signal to the other side that there is nothing left coming.

### The CPU, playing its fast and impatient role

```python
def cpu_reader():
    """The CPU: forced to wait if the buffer runs dry."""
    while True:
        wait_start = time.time()
        chunk = buf.get()
        waited = time.time() - wait_start

        if chunk is None:
            break

        if waited > 0.01:
            log(f"CPU STALL waiting for chunk {chunk} ({waited:.3f}s)")
        else:
            log(f"CPU processing chunk {chunk}")

        time.sleep(CPU_CHUNK_TIME)  # simulate the CPU working on it
```

This is the CPU. It loops forever, asking the buffer for the next chunk with `buf.get()`. Here is the detail that makes the whole simulation honest rather than staged. `buf.get()` blocks if the buffer is empty. It does not return an error or a placeholder value. It genuinely pauses the thread until something is available. I measure exactly how long that pause lasted with `waited`, and if it crosses a small threshold, I log it as a stall rather than ordinary processing. If the chunk turns out to be the sentinel, the loop ends. Otherwise, it sleeps for `CPU_CHUNK_TIME`, standing in for the actual work the CPU would be doing on that chunk of data.

### Letting them race each other

```python
    t1 = threading.Thread(target=disk_reader)
    t2 = threading.Thread(target=cpu_reader)
    t1.start()
    t2.start()
    t1.join()
    t2.join()
    return events
```

Both functions get wrapped in threads and started together. `t1.join()` and `t2.join()` simply mean the function will not return until both threads have finished their work. What gets returned is the full timeline recorded in `events`, ready to be plotted.

## Why a queue and not something simpler

Once the simulation ran, I asked myself whether a queue was actually the right tool here, or whether I had just reached for it out of habit. Thinking it through from first principles again, a real buffer between a disk and a CPU has three properties. Order has to be preserved, since chunk zero must be processed before chunk one. Capacity has to be fixed, because RAM allocated to buffering is never infinite. And both sides have to be able to act independently, with the disk not waiting for permission to read the next chunk, and the CPU not waiting for the entire file before it starts consuming.

A `queue.Queue` gives you all three for free, and the two operations that matter most are its blocking behavior.

```python
chunk = buf.get()  # blocks the CPU thread if the buffer is empty
```

```python
buf.put(i)  # blocks the disk thread if the buffer is already full
```

The first line is what makes a stall a real, measurable event instead of something I have to fake with a flag. The second line is what enforces backpressure, meaning the disk thread genuinely cannot get more than `BUFFER_SLOTS` chunks ahead of the CPU, exactly like a real buffer cannot hold more than its allocated RAM allows. Both behaviors come from `Queue` internally using a condition variable, so I never had to hand roll any polling or manual locking around the put and get calls themselves.

## Why the lock around logging matters

I also had to convince myself that `log_lock` was pulling its weight and not just defensive code I added out of paranoia.

```python
def log(description):
    with log_lock:
        t = time.time() - start_time
        events.append((t, buf.qsize(), description))
```

It is easy to assume that since Python has a global interpreter lock, appending to a list is already safe, and it is. But the lock here is not protecting the append on its own. It is protecting the combination of reading the current time, reading the current buffer size, and appending both together as one unbroken unit. Without the lock, it is entirely possible for the disk thread and the CPU thread to both call `log` at nearly the same moment, and have their timestamp and buffer size calculations interleave in a way that produces entries out of true chronological order. That would quietly corrupt the timeline I depend on later to identify stalls and plot the buffer level, so the lock is not optional, it is what makes the recorded history trustworthy.

## Why this only works as two threads

There was a point where I wondered if I even needed threads at all. Could I not just call `disk_reader()` and then `cpu_reader()` one after another and get the same picture?

The answer is no, and working through why was clarifying. If I ran them sequentially, `disk_reader` would run first, and the moment the buffer filled up to its four slot capacity, `buf.put(i)` would block forever, since nothing would be around to drain it. `cpu_reader` would never even get a chance to start. That is a deadlock, not a simulation.

```python
t1 = threading.Thread(target=disk_reader)
t2 = threading.Thread(target=cpu_reader)
t1.start()
t2.start()
```

Running them as independent threads is what allows both sides to be genuinely suspended on their own timeline at the same moment, one sleeping to simulate slow disk access, the other either sleeping to simulate processing work or blocked waiting on the queue. That overlap in real wall clock time is the entire point. It is also worth saying that this works well in Python despite the global interpreter lock precisely because both threads spend almost all their time sleeping or blocked on the queue's internal lock rather than actually computing anything, which is exactly the kind of workload where Python threads are still useful even with the GIL in the picture.

## Why these specific numbers

The last question I asked myself was whether the numbers I picked were meaningful or arbitrary.

```python
CPU_CHUNK_TIME = 0.10

SCENARIOS = {
    "Disk keeps up (smooth playback)": 0.07,
    "Disk can't keep up (stalls)": 0.15,
}
```

The reasoning turned out to be simpler than I expected. `CPU_CHUNK_TIME` is the fixed reference point, the time it takes the CPU to consume one chunk once it has one in hand. Everything else gets judged against it. When the disk produces a chunk faster than the CPU consumes one, the buffer keeps filling up and rarely, if ever, runs dry, so the CPU never has to stop. When the disk produces a chunk slower than the CPU consumes one, the CPU keeps draining the buffer faster than it gets refilled, and it is guaranteed to eventually catch up to an empty buffer and stall.

The disk timings also include a bit of random jitter to feel less robotic.

```python
time.sleep(disk_chunk_time + random.uniform(-0.02, 0.02))
```

I made sure that jitter never crosses over into the other scenario's territory. Zero point zero seven plus or minus zero point zero two lands between zero point zero five and zero point zero nine, always comfortably below the CPU's zero point one. Zero point one five plus or minus zero point zero two lands between zero point one three and zero point one seven, always comfortably above it. That gap is what keeps the demo honest and repeatable rather than something that occasionally flips its own result by chance.

The stall detection threshold gets the same treatment.

```python
if waited > 0.01:
    log(f"CPU STALL waiting for chunk {chunk} ({waited:.3f}s)")
```

Zero point zero one seconds is small enough to catch a genuine stall, which in the slow disk scenario is closer to zero point zero five seconds, but large enough to ignore the tiny scheduling noise that any thread based simulation will have, even in the smooth scenario where nothing is actually starved.

## What the timeline actually shows

When both scenarios run and get logged, the resulting plot makes the whole argument without needing any further explanation. In the smooth scenario, the buffer level climbs upward over time, one, two, three, four chunks waiting, and the CPU stalls exactly once, right at the very start when nothing has arrived yet. In the slow disk scenario, the buffer level never climbs past one chunk, and nearly every single chunk causes a stall, because the CPU keeps catching up to an empty queue faster than the disk can refill it.

That is the entire lesson sitting right there in the shape of two lines. A buffer does not make a slow source faster. It only smooths out short term unevenness, and only if, on average, the thing filling it can keep pace with the thing draining it. If the source is fundamentally slower than the consumer, no amount of buffer capacity fixes that, it just delays when you notice.

## Closing thought

What I like about building this rather than just accepting the explanation as correct is that it turned a plausible sounding paragraph into something with actual failure modes I had to reason through. Why a queue, why a lock, why threads, why these numbers. Each question forced me to justify a design decision against the physical thing it was standing in for, disk latency, RAM capacity, CPU scheduling. That is really the whole value of building small simulations like this one. Not to produce something impressive, but to force your own understanding to survive contact with code that either works or does not.

If you want to go further with this, the natural next step is simulating read ahead, the strategy an operating system uses to guess how much data to pull into the buffer before it is even asked for, which is a whole topic of its own.

The full script, all pieced together and ready to run on its own, is available here.

[Full source: buffer_relay_race.py](https://gist.github.com/eenwemasor/60ef542cd51a2c65c72ca7a8982b84b2)
