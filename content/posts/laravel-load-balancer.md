---
title: "Laravel: Session Persistence, Caching, File Upload Management and Logging on a Load Balancer"
excerpt: "Cross-cutting concerns to plan for when scaling a Laravel application behind a load balancer: session persistence, caching, file uploads, and centralized logging."
date: "2024-06-25"
dateLabel: "June 25, 2024"
type: post
featured: true
category: "Laravel"
image: "/posts/laravel-session-persistence-caching.png"
imageAlt: "Laravel: Session Persistence, Caching, File Upload Management and Logging on a Load Balancer"
authorName: "Enwemasor Barnabas"
authorUrl: "https://enwemasorbarnabas.com"
tags: ["AWS", "Caching", "File Upload", "Laravel", "Logging", "Session Persistence"]
---

Along with the ability for your applications to scale infinitely (literally) comes the hassle of handling some vital features that make web applications stable and functional.

In this post, I will be highlighting some experiences I have encountered while deploying Laravel web applications in AWS using the AWS-provided platform-as-a-service tool Elastic Beanstalk. While this will not be a hands-on step-by-step tutorial on how to implement a solution to the situations highlighted, being aware of the existence of the cross-cutting concerns listed in this post will assist in implementing a solution for any application on any programming language or framework using language-specific features. With that being said, let's dive in.

In order to scale a web application to handle a growing number of visitors cost-effectively, modern computing best practices require adding more servers that can handle concurrent requests and serve users with the correct information at the right time.

For these multiple servers to effectively handle client requests, a load balancer sits between client requests and the servers as a proxy, routing requests across all servers capable of fulfilling those requests in a manner that maximizes speed and capacity utilization and ensures that no one server is overworked, which could degrade performance.

A load balancer efficiently ensures that:

- Client requests or network loads are distributed across all servers
- Requests are only sent to online servers
- Addition or subtraction of servers is flexible

The load balancer is an efficient software technology and an absolute necessity if a web application is to cost-effectively deliver content, but with this amazing gain comes extra effort and, in some cases, a frustrating late-hour session.

Ignoring other blockers I encountered with deploying my Laravel application in AWS Elastic Beanstalk that are not related to load balancing, the following are to be taken into consideration when scaling applications using load balancing:

- Session Persistence
- Caching
- File upload
- Logging

### Session Persistence

*Session persistence* refers to directing a client's requests to the same backend web or application server for the duration of a "session" or the time it takes to complete a task or transaction.

A *session* is defined as a series of related browser requests that come from the same client during a certain period.

*Session tracking* ties together a series of browser requests — think of these requests as pages that may have some meaning as a whole, such as a shopping cart application. Sessions provide a way to store information about the user across multiple requests.

When a web application uses a load balancer to scale, multiple servers are running simultaneously, and it's not guaranteed that the server that handled the first request will handle the second request from the same client, which leads to inconsistencies and weird behaviors — e.g. `403 ERR_TOO_MANY_REDIRECTS`, internal server errors for routes that require a certain session property to exist, or a user being logged out wrongfully.

Laravel provides several options for handling sessions but defaults to using the file session driver, which works well for most applications. But for a web application on a load balancer, it is not an option.

A better option for sessions on a web application behind a load balancer is using a third-party session driver like [Redis](https://redis.io/) or [Memcached](https://memcached.org/) — third-party drivers are a faster option.

Database drivers are a good option to persist sessions on a load balancer, though slower compared to Redis or Memcached.

### Caching

Caching helps relieve web application servers of CPU-intensive processes by storing data closer to the client's computer.

When a cache client needs to access data, it first checks the cache. When the requested data is found in a cache, it's called a cache hit. The percentage of attempts that result in cache hits is known as the cache hit rate or ratio.

Laravel recommends the use of decoupled caching systems like [Redis](https://redis.io/) or [Memcached](https://memcached.org/), or maybe a database driver. Using a decoupled caching system improves the cache hit rate, which improves your application speed and user experience.

### File upload

By default, Laravel file uploads are stored and managed within the public folder of the web application on a particular server, except that a load balancer spins up several servers with a replica of your web application file system, which means the files uploaded on one server are not available to other servers within your infrastructure.

Another issue with using a local filesystem driver is the loss of uploaded files when a server is destroyed or fails — data that is stored on the server and not distributed to other servers is lost.

Laravel also supports an S3 filesystem driver, which ensures that all file uploads within your application are stored in a centralized storage bucket in AWS. Laravel makes migrating from a local driver to an S3 driver easy — switching from a local driver to an S3 driver is probably the easiest of fixes you can make among the above-mentioned points, depending on the way your application code is written.

### Logging

Many cloud infrastructure companies provide technologies for monitoring and tracking your load balancer's health. A large web application that is distributed across multiple servers can utilize these technologies to assemble internal application logs, failed requests, warnings, and crashes — these help in debugging and help DevOps engineers better manage and maintain the web application.

Directing all application logs to a central infrastructure ensures that all bugs, causes, and needed pieces of information to fix a bug are in a central location, which is useful for developers and DevOps engineers managing the application.

Luckily, Laravel provides tons of logging channels which make centralizing logs a relatively easy task to handle. [Laravel provides several logging channels](https://laravel.com/docs/8.x/logging#available-channel-drivers) which assist in ensuring logs from the server end up in a single location and offer a lot of flexibility on how to go about it — there is no single best solution. I chose to go with a database log solution that stores all application logs in a database decoupled from my web application environment.

### Conclusion

Managing a web application on a load balancer is not the easiest of tasks, especially for first-timers, but it can be an interesting task in the long run. Session persistence, caching, file upload, and logging will not be the only tweaks to be made to your application if it wasn't initially built with a load balancer in mind, or a decision to be made when kick-starting any web application that will run on a load balancer.

As technological innovations continue to improve, load balancers may be able to handle some of these cross-cutting concerns automatically — already, the [AWS Classic Load Balancer](http://docs.aws.amazon.com/elasticloadbalancing/latest/classic/introduction.html) supports sticky sessions, which comes close to solving session persistence automatically.

Hope this helps you build a better and more scalable web application.
