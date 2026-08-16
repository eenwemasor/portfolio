<article id="post-19" class="section-box post-19 post type-post status-publish format-standard has-post-thumbnail hentry category-laravel category-software-engineering tag-aws tag-caching tag-file-upload tag-laravel tag-logging tag-session-persistence">

    <header class="entry-header" id="primary">
    	<h1 class="entry-title">Laravel: Session Persistence, Caching, File Upload Management and Logging on a Load Balancer</h1>		    </header>

    <img fetchpriority="high" width="730" height="487" src="https://enwemasorbarnabas.com/wp-content/uploads/2024/06/laravel.png" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="Laravel: Session Persistence, Caching, File Upload Management and Logging on a Load Balancer" decoding="async" srcset="https://enwemasorbarnabas.com/wp-content/uploads/2024/06/laravel.png 730w, https://enwemasorbarnabas.com/wp-content/uploads/2024/06/laravel-300x200.png 300w" sizes="(max-width: 730px) 100vw, 730px">
    <div class="entry-content">


<p class="wp-block-paragraph">Along with the ability for your applications to scale infinitely(literally) comes the hassle of handling some vital features that makes web applications stable and functional.</p>

<p class="wp-block-paragraph">In this post, I will be highlighting some experiences I have encountered while deploying a Laravel web applications in AWS using AWS provided platform as a service tool Elastic Beanstalk, while this will not be a hands-on step-by-step tutorial on how to implement a solution to the situation highlighted, being aware of the existence of the cross-cutting concerns listed on this post will assist in implementing a solution for any application on any programming language or framework using language-specific features, with that being said let’s dive in.</p>

<p class="wp-block-paragraph">In other to scale a web application to handle a growing number of visitors cost-effectively, modern computing best practices require adding more servers that can handle concurrent requests and serve users with the correct information at the right time.</p>

<p class="wp-block-paragraph">For these multiple servers to effectively handle client requests, a load balancer sits between client requests and the servers as a proxy routing request across all servers capable of fulfilling those requests in a manner that maximizes speed and capacity utilization and ensures that no one server is overworked, which could degrade performance.</p>

<p class="wp-block-paragraph">A load balancer efficiently ensures that:</p>

<ul class="wp-block-list">
<li>Client requests or network loads are distributed across all servers.</li>

<li>Requests are only sent to online servers</li>

<li>Addition or subtraction of servers are flexible.</li>
</ul>

<p class="wp-block-paragraph">The load balancer is an efficient software technology and an absolute necessity if at all a web application can cost-effectively deliver content, but with this amazing gain comes extra efforts and in some cases a frustrating late-hour session.</p>

<p class="wp-block-paragraph">Ignoring other blockers i encountered with deploying my Laravel application in AWS Elastic Beanstalk that is not related to load balancing;</p>

<ul class="wp-block-list">
<li>Session Persistence</li>

<li>Caching</li>

<li>File upload</li>

<li>Logging</li>
</ul>

<p class="wp-block-paragraph">are to be taken into consideration when scaling applications using load balancing.</p>

<h4 class="wp-block-heading"><strong>Session Persistence</strong></h4>

<p class="wp-block-paragraph"><em><strong>Session persistence</strong></em> refers to directing a client’s requests to the same backend web or application server for the duration of a “session” or the time it takes to complete a task or transaction.</p>

<p class="wp-block-paragraph">A<em> <strong>session</strong></em> is defined as a series of related browser requests that come from the same client during a certain period.&nbsp;</p>

<p class="wp-block-paragraph"><strong><em>Session tracking</em></strong> ties together a series of browser requests—think of these requests as pages that may have some meaning as a whole, such as a shopping cart application, sessions provide a way to store information about the user across multiple requests.</p>

<p class="wp-block-paragraph">When a web application uses a load balancer to scale, multiple servers are running simultaneously and it’s not guaranteed that the server that handled the first request will handle the second request from the same client which leads to inconsistencies and weird behaviors&nbsp;<em>e.g. 403 ERR_TOO_MANY_REDIRECTS</em>, Internal server errors for routes that require certain session property to exist, user logged out wrongfully.</p>

<p class="wp-block-paragraph">Laravel provides several options for handling sessions but defaults to use the file session driver which works well for most applications. But for a web application on a load balancer, it is not an option.</p>

<p class="wp-block-paragraph">A better option with a session on a web application on a load balancer is using a third-party session driver like&nbsp;<a href="https://redis.io/">Redis</a>&nbsp;or&nbsp;<a href="https://memcached.org/">Memcached</a>, third-party drivers are a faster option.</p>

<p class="wp-block-paragraph">Database drivers are a good option to persist sessions on a load balancer, though slower compared to Redis or Memcached.</p>

<h4 class="wp-block-heading"><strong>Caching</strong></h4>

<p class="wp-block-paragraph">Caching helps relieve web application servers of CPU-intense processes by storing data closer to the client’s computer.</p>

<p class="wp-block-paragraph">When a cache client needs to access data, it first checks the cache. When the requested data is found in a cache, it’s called a cache hit. The percentage of attempts that result in cache hits is known as the cache hit rate or ratio.</p>

<p class="wp-block-paragraph">Laravel recommends the use of decoupled caching systems like&nbsp;<a href="https://redis.io/">Redis</a>&nbsp;or&nbsp;<a href="https://memcached.org/">Memcached</a>&nbsp;or maybe a database driver, using a decoupled caching system improves the cache hit rates which improves your application speed and user experience.</p>

<h4 class="wp-block-heading"><strong>File upload</strong></h4>

<p class="wp-block-paragraph">By default, Laravel file uploads are stored and managed within the public folder of the web application of a particular server, except that a load balancer spins up several servers with a replica of your web application file system, which means the files uploaded in one server is not available to other servers within your infrastructure.</p>

<p class="wp-block-paragraph">Another issue with using a local filesystem driver is the loss of uploaded files when a server is destroyed or fails, data that are stored on the server that is not distributed on other servers is lost.</p>

<p class="wp-block-paragraph">Laravel also supports an s3 filesystem driver which ensures the all-file upload within your application is stored in a centralized storage bucket in AWS, Laravel makes migrating from a local driver to an s3 driver easy, switching from a local driver to an s3 driver is probably the easiest of fixes you can make among the above-mentioned points depending on the way your application code is written.</p>

<h4 class="wp-block-heading"><strong>Logging</strong></h4>

<p class="wp-block-paragraph">Many cloud infrastructure companies provide technologies for monitoring and tracking your load balancer health, a large web application that is distributed across multiple servers can utilize these technologies to assemble internal application logs, failed request, warnings, and crashes, these help in debugging and helps devops to better manage and maintain the web application.</p>

<p class="wp-block-paragraph">Directing all application logs to a central infrastructure ensures that all bugs, causes, and all needed pieces of information to fix a bug are in a central location which is useful for developers and devops engineers managing the application.</p>

<p class="wp-block-paragraph">Luckily, Laravel provides tons of logging channels which make centralizing logs relatively an easy task to handle,&nbsp;<a href="https://laravel.com/docs/8.x/logging#available-channel-drivers">Laravel provides several logging channels</a> which assist in ensuring logs from the server end up in a single file and offers a lot of flexibility on how to go about it, there is no best solution. I chose to go with a database log solution that stores all application logs in a database that is decoupled from my web application environment.</p>

<h4 class="wp-block-heading">&nbsp;<strong>Conclusion</strong></h4>

<p class="wp-block-paragraph">Managing a web application on a load balancer is not the easiest of tasks, especially for first-timers, but can be an interesting task in the long run, session persistence, caching, file upload, and logging will not be the only tweak to be made to your application if it was not initially built with load balancer in mind or a decision to be made when kick starting any web application that will run on a load balancer.</p>

<p class="wp-block-paragraph">As technological innovations continue to improve load balancers may be able to handle some of these cross-cutting concerns automatically, already&nbsp;<a href="http://docs.aws.amazon.com/elasticloadbalancing/latest/classic/introduction.html">AWS Classic Load Balancer</a>&nbsp;supports sticky sessions which is close to solving session persistence automatically.</p>

<p class="wp-block-paragraph">Hope this helps you build a better and more scalable web application.</p>
    </div><!-- .entry-content -->

    <footer class="entry-footer">

        <div class="footer-card">
            <div class="card-icon">
                <span class="mb-icon mb-icon-user" aria-hidden="true"></span>
            </div>
            <div class="card-title">Author</div>
            <div class="card-content">
    			<a href="https://enwemasorbarnabas.com" target="_blank">eenwemasor</a>            </div>
        </div>
        <div class="footer-card">
            <div class="card-icon">
                <span class="mb-icon mb-icon-clock" aria-hidden="true"></span>
            </div>
            <div class="card-title">Modification</div><div class="card-content"><time>25/6/2024</time></div>        </div>

    	<div class="footer-card is-full">  <div class="card-icon"><span class="mb-icon mb-icon-hash" aria-hidden="true"></span></div>  <div class="card-title">Tags</div>  <div class="card-content"><a href="https://enwemasorbarnabas.com/tag/aws/">AWS</a>, <a href="https://enwemasorbarnabas.com/tag/caching/">Caching</a>, <a href="https://enwemasorbarnabas.com/tag/file-upload/">File Upload</a>, <a href="https://enwemasorbarnabas.com/tag/laravel/">Laravel</a>, <a href="https://enwemasorbarnabas.com/tag/logging/">Logging</a>, <a href="https://enwemasorbarnabas.com/tag/session-persistence/">Session Persistence</a></div></div>
    </footer>

</article>
