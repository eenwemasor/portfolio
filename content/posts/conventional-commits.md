---
title: "Conventional Commit: The Way to Writing Good Commit Messages"
excerpt: "An introduction to the Conventional Commits specification — its structure, examples, and the tooling ecosystem built around it."
date: "2024-06-24"
dateLabel: "June 24, 2024"
type: post
featured: true
category: "CI/CD"
image: ""
imageAlt: "Conventional Commit: The Way to Writing Good Commit Messages"
authorName: "Enwemasor Barnabas"
authorUrl: "https://enwemasorbarnabas.com"
tags: ["CI/CD", "Git", "Github", "Subversion"]
---

As the software ecosystems continue to grow in complexity, teams on software projects also increase in number. Source control systems like GitHub, GitLab, AWS CodeCommit, and Apache Subversion have created various bits of solutions and tools to make the process much easier.

Commit messages, which are descriptions of changes made to code repositories at a point in time, are meant to be a great tool if properly written. In order to improve the quality of commit messages, teams come up with different rules meant to help their members write better commit messages.

Recently, I was starting a project and was searching for ways to enforce all code commit messages to follow predefined patterns — more like a conventional way of writing commit messages for the project, an approved syntax of a commit message — and yes, I came across [conventionalcommits.org](http://conventionalcommits.org).

> A lightweight convention on top of commit messages. It provides an easy set of rules for creating an explicit commit history, which makes it easier to write automated tools on top of it. This convention dovetails with SemVer, by describing the features, fixes, and breaking changes made in commit messages.

Conventional commits have been around for quite a while and have gained a lot of traction from some of the large teams — from Microsoft to Google. Currently, repositories like Yargs, Electron, and Jenkins apply this convention.

### Conventional commits structure

The conventional commits syntax structure contains the following items, organized just the way they propose:

- **Type:** describes the type of change being committed. It could be any of:
  - **Bug** – used to commit changes that fix a bug
  - **Feat** – commits new feature code changes
- **Scope:** provides additional contextual information to the commit type
- **Description:** describes the changes made
- **Body:** the optional body part of the commit should provide additional information, links to an issue, a Jira task, or a link to external context
- **Footer:** provides information if the commit is a `BREAKING CHANGE`

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Examples:

- **Commit message with description and breaking change footer**
  - `feat: allow provided config object to extend other configs` — `BREAKING CHANGE: extends key in config file is now used for extending other config files`
- **Commit message with `!` to draw attention to breaking change**
  - `feat!: send an email to the customer when a product is shipped`
- **Commit message with scope and `!` to draw attention to breaking change**
  - `feat(api)!: send an email to the customer when a product is shipped`
- **Commit message with no body**
  - `docs: correct spelling of CHANGELOG`
- **Commit message with scope**
  - `feat(lang): add Polish language`

Multiple tools have been built around conventional commits to help ensure the convention is followed by all members of the team regardless of environment.

VS Code's _VSCode Conventional Commits_ extension and other libraries/plugins exist for different languages:

- **commitizen-tools/commitizen:** a tool written in Python to create commit rules for projects, auto-bump versions, and auto-generate changelogs
- **php-commitizen:** a PHP tool built to create commit messages following the Conventional Commits specification — configurable and usable for PHP projects as a Composer dependency, or globally for non-PHP projects
- **python-semantic-release:** automatic Semantic Versioning for Python projects — a Python implementation of semantic-release for Node.js
- **VSCode Conventional Commits:** adds Conventional Commits support for VS Code
- **Pyhist:** a Python utility to automatically update the package version from the Git history and generate the changelog
- **Versio:** a monorepo-compatible tool that updates version numbers based on conventional commits and project dependencies — it can generate tags and changelogs too

These tools help developers write commit messages that assist fellow developers and DevOps engineers, and also contribute to automation.

At the start of every software engineer's career, the goal is always to learn the languages, understand algorithms, solve problems, and build and ship live software. Still, as experience is gathered and we work on more complex applications and larger teams, over time we realize that we not only need to write clean code, but we have to write content that assists the team and provides information for better decision-making.

Conventional commits is a great tool that helps enforce these behaviours, especially for new developers — it introduces the importance of commit messages when done right.
