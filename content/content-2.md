<article id="post-21" class="section-box post-21 post type-post status-publish format-standard has-post-thumbnail hentry category-calendar-versioning category-semantic-versioning category-software-engineering category-spring-projects-version tag-calver tag-semantic-versioning-scheme tag-semver">

    <header class="entry-header" id="primary">
    	<h1 class="entry-title">Software Versioning Conventions – The Software Community Standards</h1>		    </header>

    <img fetchpriority="high" width="3004" height="1682" src="https://enwemasorbarnabas.com/wp-content/uploads/2024/06/versioning.png" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="Software Versioning Conventions" decoding="async" srcset="https://enwemasorbarnabas.com/wp-content/uploads/2024/06/versioning.png 3004w, https://enwemasorbarnabas.com/wp-content/uploads/2024/06/versioning-300x168.png 300w, https://enwemasorbarnabas.com/wp-content/uploads/2024/06/versioning-1024x573.png 1024w, https://enwemasorbarnabas.com/wp-content/uploads/2024/06/versioning-768x430.png 768w, https://enwemasorbarnabas.com/wp-content/uploads/2024/06/versioning-1536x860.png 1536w, https://enwemasorbarnabas.com/wp-content/uploads/2024/06/versioning-2048x1147.png 2048w" sizes="(max-width: 3004px) 100vw, 3004px">
    <div class="entry-content">


<p class="wp-block-paragraph"><a href="https://www.techopedia.com/definition/25977/software-versioning">Techopedia</a>&nbsp;defines software versioning as the process of numbering different releases of a particular software program for both internal use and release designation. It allows programmers to know when changes have been made and track changes enforced in the software. At the same time, it enables potential customers to be acquainted with new releases and recognize the updated versions.</p>

<p class="wp-block-paragraph">software versioning conventions better identified as version naming conventions have been tagged as opinion-based, in other words, there is no correctly acceptable pattern, this is because the software community is very large and diverse, every team or organization believes that their approach to naming their build releases assists the team in troubleshooting situations.</p>

<p class="wp-block-paragraph">In retrospect, the software community tends to agree and establish standards on certain conventions to help facilitate best practices. This leaves one wondering why after all these past decades, there is yet to exist a formal specification on how to approach naming software release versions.</p>

<p class="wp-block-paragraph">Notwithstanding, the software community has seen the evolution of some software versioning convention schemes coined by industry leaders, which have been applied by a large bunch of the community.</p>

<h2 class="wp-block-heading"><strong>Semantic versioning (SemVer)</strong></h2>

<p class="wp-block-paragraph">The&nbsp;<a href="https://semver.org/">Semantic versioning scheme</a>&nbsp;has a well-detailed specification document which was originally authored by the co-founder of GitHub&nbsp;<a href="https://tom.preston-werner.com/">Tom Preston Werner</a>, this versioning scheme solves the problem of dependency hell, preventing the occurrence of version lock and/or version promiscuity in software development while also communicating meaning with the version number.</p>

<p class="wp-block-paragraph">Semantic versioning is a widely adopted version scheme that uses a sequence of three digit<strong><em>s (Major. Minor. Patch)</em></strong>, an optional pre-release tag, and an optional build meta tag. In this scheme, risk and functionality are the measures of significance. Breaking changes are indicated by increasing the major number (high risk), new non-breaking features increment the minor number (medium risk) and all other non-breaking changes increment the patch number (lowest risk). The presence of a pre-release tag (-alpha, -beta) indicates substantial risk, as does a major number of zero (0.y.z), which is used to indicate a work-in-progress that may contain any level of potentially breaking changes (highest risk).</p>

<pre class="wp-block-code"><code>version [Major].[Minor].[Patch]</code></pre>

<ol class="wp-block-list">
<li><strong>MAJOR version –</strong>&nbsp;when you make incompatible API changes</li>

<li><strong>MINOR version –</strong>&nbsp;when you add functionality in a backward-compatible manner, and</li>

<li><strong>PATCH version –</strong>&nbsp;&nbsp;when you make backward-compatible bug fixes.</li>
</ol>

<p class="wp-block-paragraph">Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.</p>

<p class="wp-block-paragraph">Opinions in the community also suggest that the SemVer scheme is only suited for versioning APIs and not for user-facing software.</p>

<h2 class="wp-block-heading"><strong>Calendar Versioning</strong>&nbsp;(<strong>CalVer</strong>)</h2>

<p class="wp-block-paragraph">The&nbsp;<a href="https://calver.org/">CalVer</a>&nbsp;Versioning names its release channels based on the release calendar instead of arbitrary numbers, Microsoft, Ubuntu, Twisted, Pycharm, Teradata, etc are some of the notable projects that started or later switched to using the Calvar versioning scheme.</p>

<p class="wp-block-paragraph">Calver Versioning assumes&nbsp;<a href="https://en.wikipedia.org/wiki/Gregorian_calendar">the Gregorian calendar</a>&nbsp;as its default calendar, though not constrained to it. How projects utilize the calendar in naming their releases depends on the project management,</p>

<p class="wp-block-paragraph">Ubuntu for example uses a three-segment CalVer scheme, with a short year and zero-padded month.&nbsp;</p>

<p class="wp-block-paragraph">It has done so&nbsp;<a href="https://en.wikipedia.org/wiki/List_of_Ubuntu_releases">from the very start</a>, in October 2004, making 4.10 the first general release of Ubuntu, Ubuntu still uses the CalVer following the release of its latest version 20.04 which was released on April 23rd, 2020</p>

<p class="wp-block-paragraph">Also, Microsoft encodes the date into its release numbers, Microsoft Windows 95, the first two digits indicate the number of months that have passed from the January of the year in which the project started (with each major Office release being a different project), while the last two digits indicate the day of that month. So 3419 is the 19th day of the 34th month after January of the year the project started.</p>

<p class="wp-block-paragraph">The assertion is that Calendar Versioning is ideal for large projects that are constantly changing scope, time-sensitive projects, and changes are driven by some external factors.</p>

<h2 class="wp-block-heading"><strong>Spring Projects Version Naming Scheme</strong></h2>

<p class="wp-block-paragraph">The Spring Projects version naming scheme, even though coupled with the&nbsp;<a href="https://spring.io/projects">Spring Platform</a>&nbsp;is an interesting and maybe even more satisfying solution problem of version lock and/or version promiscuity,</p>

<p class="wp-block-paragraph">This scheme builds on top of the Semantic Versioning scheme, adding extra labels to the version naming.</p>

<ul class="wp-block-list">
<li><strong>BUILD-SNAPSHOT –</strong>&nbsp;BUILD-SNAPSHOT is the current development release.</li>

<li><em><strong>M[number] –</strong></em>&nbsp;A Milestone release (M1, M2, M3, …) marks a significant stage in the release process.</li>

<li><em><strong>RC[number] –</strong></em>&nbsp;A Release Candidate (RC1, RC2, RC3, …) is the last step before building the final release.</li>

<li><strong>RELEASE</strong></li>
</ul>

<p class="wp-block-paragraph">At the end of the release process, the Spring team produces a RELEASE. Consequently, this is usually the only production-ready artifact. We can also refer to this release as <strong>GA</strong>, for <em>General Availability</em>.</p>

<h2 class="wp-block-heading"><strong>Final thought</strong></h2>

<p class="wp-block-paragraph">How to version your release is your choice, but the software community has in some sense favoured the Semantic Versioning Scheme, some of the notable reasons why the semantic versioning scheme is favoured by a larger percentage of the community are highlighted below;</p>

<ul class="wp-block-list">
<li><strong>Independent of project size</strong>&nbsp;– the SemVer scheme can be applied to any size of the project, from internal organization software to an enterprise’s software projects</li>

<li><strong>There is a formal specification</strong>&nbsp;– it becomes easy for users to understand your software’s current stage through your versioning.</li>

<li><strong>A solution to dependency hell</strong>&nbsp;– the rules of semantic versioning if properly applied solve the problem of version lock and/or version promiscuity.</li>
</ul>

<p class="wp-block-paragraph">Some projects use the semantic versioning scheme as their main scheme while others combine the calendar versioning with the semantic versioning, ensuring non-technical users understand the software version without having to read the semantic versioning specification while also preventing the occurrence of dependency hell.</p>

<p class="wp-block-paragraph">While some projects choose to apply some industry popular schemes, the essence of any versioning schemes is to enable smooth development, deployment, and better bug tracking in a software project.</p>
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

    	<div class="footer-card is-full">  <div class="card-icon"><span class="mb-icon mb-icon-hash" aria-hidden="true"></span></div>  <div class="card-title">Tags</div>  <div class="card-content"><a href="https://enwemasorbarnabas.com/tag/calver/">CalVer</a>, <a href="https://enwemasorbarnabas.com/tag/semantic-versioning-scheme/">Semantic Versioning Scheme</a>, <a href="https://enwemasorbarnabas.com/tag/semver/">SemVer</a></div></div>
    </footer>

</article>
