<article id="post-16" class="section-box post-16 post type-post status-publish format-standard has-post-thumbnail hentry category-ci-cd category-software-engineering category-subversion tag-ci-cd tag-git tag-github tag-subversion">

    <header class="entry-header" id="primary">
    	<h1 class="entry-title">Conventional Commit: The Way to Writing Good Commits Messages</h1>		    </header>

    <img fetchpriority="high" width="2100" height="2100" src="https://enwemasorbarnabas.com/wp-content/uploads/2024/06/conventional-commits.png" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" decoding="async" srcset="https://enwemasorbarnabas.com/wp-content/uploads/2024/06/conventional-commits.png 2100w, https://enwemasorbarnabas.com/wp-content/uploads/2024/06/conventional-commits-300x300.png 300w, https://enwemasorbarnabas.com/wp-content/uploads/2024/06/conventional-commits-1024x1024.png 1024w, https://enwemasorbarnabas.com/wp-content/uploads/2024/06/conventional-commits-150x150.png 150w, https://enwemasorbarnabas.com/wp-content/uploads/2024/06/conventional-commits-768x768.png 768w, https://enwemasorbarnabas.com/wp-content/uploads/2024/06/conventional-commits-1536x1536.png 1536w, https://enwemasorbarnabas.com/wp-content/uploads/2024/06/conventional-commits-2048x2048.png 2048w" sizes="(max-width: 2100px) 100vw, 2100px">
    <div class="entry-content">


<p class="wp-block-paragraph"></p>

<p class="wp-block-paragraph">As the software ecosystems continue to grow in complexity, teams on software projects also increase in numbers, source control systems like Github, Gitlab, AWS CodeCommit, and Apache Subversion have created various bits of solutions and tools to make the process much easier.</p>

<p class="wp-block-paragraph">Commit messages which are descriptions of changes made to code repositories at a point in time are meant to be a great tool if it is properly written, in other to improve the quality of commit messages, teams come up with different rules meant to help their members write better commit messages.</p>

<p class="wp-block-paragraph">Recently, I was starting a project and was searching for ways to enforce all code commit messages to follow predefined patterns, more like a conventional way of writing commit messages for the project, an approved syntax of a commit message, and yes, I came across <a href="http://conventionalcommits.org" data-type="link" data-id="conventionalcommits.org">conventionalcommits.org.</a></p>

<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow">
<p class="wp-block-paragraph">A lightweight convention on top of commit messages. It provides an easy set of rules for creating an explicit commit history; which makes it easier to write automated tools on top of it. This convention dovetails with SemVer, by describing the features, fixes, and breaking changes made in commit messages.</p>
</blockquote>

<p class="wp-block-paragraph">conventional commits have been around for quite a while and have gained a lot of attraction from some of the large teams, from Microsoft, and Google, currently repositories like Yargs, Electron, and Jenkins apply this convention.</p>

<p class="wp-block-paragraph"></p>

<h4 class="wp-block-heading">Conventional commits structure</h4>

<p class="wp-block-paragraph">The conventional commits syntax structure contains the following items organize just the way they propose.</p>

<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-constrained wp-block-group-is-layout-constrained">
<ul class="wp-block-list">
<li><strong>Type:</strong> The type structural element describes the type of changes being committed, it could be any of
<ul class="wp-block-list">
<li><em><strong>Bug</strong></em> – used to commit changes that fix a bug</li>

<li><em><strong>Feat</strong></em> – commits new features code changes.</li>
</ul>
</li>

<li><strong>Scope:</strong> Scope provides additional contextual information to the commit type</li>
</ul>
</div></div>

<ul class="wp-block-list">
<li><strong>Description:</strong> Describe the changes made </li>

<li><strong>Body:</strong> The optional body part of the commit should provide additional information, links to an issue, a Jira task, or a link to an external context.</li>

<li><strong>Footer:</strong> Provide information if the commit is a BREAKING CHANGE</li>
</ul>

<pre class="wp-block-code"><code>&lt;type&gt;[optional scope]: &lt;description&gt; [optional body] [optional footer(s)]</code></pre>

<p class="wp-block-paragraph">Examples:</p>

<ul class="wp-block-list">
<li><strong>Commit message with the description and breaking change footer</strong>
<ul class="wp-block-list">
<li><em>feat:allow provided config object to extend other configs BREAKING CHANGE: extends key in config file is now used for extending other config files</em></li>
</ul>
</li>

<li><strong>Commit message with<strong> <code>!</code></strong> to draw attention to breaking change</strong>
<ul class="wp-block-list">
<li>feat!: send an email to the customer when a product is shipped</li>
</ul>
</li>

<li><strong>Commit message with scope and <code>!</code> to draw attention to breaking changer</strong>
<ul class="wp-block-list">
<li>feat(api)!: send an email to the customer when a product is shipped</li>
</ul>
</li>

<li><strong>Commit a message with no body</strong>
<ul class="wp-block-list">
<li>docs: correct spelling of CHANGELOG</li>
</ul>
</li>

<li><strong>Commit message with scope</strong>
<ul class="wp-block-list">
<li>feat(lang): add Polish language</li>
</ul>
</li>
</ul>

<p class="wp-block-paragraph">Multiple tools have been built around conventional commits to help ensure the convention is followed through by all members of the team regardless of your environment.</p>

<p class="wp-block-paragraph">Vscode’s library <em>VScode Conventional Commits</em> and other libraries/plugins exist for different languages.</p>

<ul class="wp-block-list">
<li><strong>commitizen-tools/commitizen:</strong> A tool written in Python to create commit rules for projects, auto bump versions, and auto changelog generation.</li>
</ul>

<ul class="wp-block-list">
<li><strong>php-commitizen:</strong> A PHP tool built to create commit messages following the Conventional Commits specifications. configurable and usable for PHP projects as a composer dependency or globally for non-PHP projects.</li>
</ul>

<ul class="wp-block-list">
<li><strong>python-semantic-release:</strong> Automatic Semantic Versioning for Python projects. This is a Python implementation of the semantic release for Node.js</li>
</ul>

<ul class="wp-block-list">
<li><strong>VSCode Conventional Commits:</strong> Add Conventional Commits supports for VSCode.</li>
</ul>

<ul class="wp-block-list">
<li><strong>Pyhist:</strong> A Python utility to automatically update the package version from the git history and generate the Changelog.</li>
</ul>

<ul class="wp-block-list">
<li><strong>Versio:</strong> A monorepo-compatible tool that updates version numbers based on conventional commits and project dependencies. It can generate tags and changelogs, too.</li>
</ul>

<p class="wp-block-paragraph">These tools help developers write commit messages that assist fellow developers, devops and also contribute to automation.</p>

<p class="wp-block-paragraph">At the start of every software engineer’s career, the goal is always to learn the languages, understand algorithms, solve problems, and build and ship live software. Still, as the experience gather and we work on more complex applications and larger team, over time we realize that not only do we need to write clean codes but we have to write content that assists the team and provides information for better decision making.</p>

<p class="wp-block-paragraph">conventional commits is a great tool, that helps enforce the behaviours, especially to new developers, it will introduce the importance of commit messages when done right.</p>
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
            <div class="card-title">Modification</div><div class="card-content"><time>24/6/2024</time></div>        </div>

    	<div class="footer-card is-full">  <div class="card-icon"><span class="mb-icon mb-icon-hash" aria-hidden="true"></span></div>  <div class="card-title">Tags</div>  <div class="card-content"><a href="https://enwemasorbarnabas.com/tag/ci-cd/">CI/CD</a>, <a href="https://enwemasorbarnabas.com/tag/git/">Git</a>, <a href="https://enwemasorbarnabas.com/tag/github/">Github</a>, <a href="https://enwemasorbarnabas.com/tag/subversion/">Subversion</a></div></div>
    </footer>

</article>
