---
title: "Software Versioning Conventions – The Software Community Standards"
excerpt: "A look at the major software versioning schemes — Semantic Versioning, Calendar Versioning, and the Spring Projects naming scheme — and why the community leans toward SemVer."
date: "2024-06-25"
dateLabel: "June 25, 2024"
type: post
category: "Versioning"
image: "https://enwemasorbarnabas.com/wp-content/uploads/2024/06/versioning.png"
imageAlt: "Software Versioning Conventions"
authorName: "Enwemasor Barnabas"
authorUrl: "https://enwemasorbarnabas.com"
tags: ["CalVer", "Semantic Versioning Scheme", "SemVer"]
---

[Techopedia](https://www.techopedia.com/definition/25977/software-versioning) defines software versioning as the process of numbering different releases of a particular software program for both internal use and release designation. It allows programmers to know when changes have been made and track changes enforced in the software. At the same time, it enables potential customers to be acquainted with new releases and recognize the updated versions.

Software versioning conventions, better identified as version naming conventions, have been tagged as opinion-based — in other words, there is no correctly acceptable pattern. This is because the software community is very large and diverse; every team or organization believes that their approach to naming their build releases assists the team in troubleshooting situations.

In retrospect, the software community tends to agree and establish standards on certain conventions to help facilitate best practices. This leaves one wondering why, after all these past decades, there is yet to exist a formal specification on how to approach naming software release versions.

Notwithstanding, the software community has seen the evolution of some software versioning convention schemes coined by industry leaders, which have been applied by a large bunch of the community.

## Semantic versioning (SemVer)

The [Semantic versioning scheme](https://semver.org/) has a well-detailed specification document which was originally authored by the co-founder of GitHub, [Tom Preston Werner](https://tom.preston-werner.com/). This versioning scheme solves the problem of dependency hell, preventing the occurrence of version lock and/or version promiscuity in software development while also communicating meaning with the version number.

Semantic versioning is a widely adopted version scheme that uses a sequence of three digits (**Major.Minor.Patch**), an optional pre-release tag, and an optional build meta tag. In this scheme, risk and functionality are the measures of significance. Breaking changes are indicated by increasing the major number (high risk), new non-breaking features increment the minor number (medium risk), and all other non-breaking changes increment the patch number (lowest risk). The presence of a pre-release tag (`-alpha`, `-beta`) indicates substantial risk, as does a major number of zero (`0.y.z`), which is used to indicate a work-in-progress that may contain any level of potentially breaking changes (highest risk).

```text
version [Major].[Minor].[Patch]
```

1. **MAJOR version** – when you make incompatible API changes
2. **MINOR version** – when you add functionality in a backward-compatible manner
3. **PATCH version** – when you make backward-compatible bug fixes

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

Opinions in the community also suggest that the SemVer scheme is only suited for versioning APIs and not for user-facing software.

## Calendar Versioning (CalVer)

The [CalVer](https://calver.org/) versioning scheme names its release channels based on the release calendar instead of arbitrary numbers. Microsoft, Ubuntu, Twisted, PyCharm, Teradata, etc. are some of the notable projects that started or later switched to using the CalVer versioning scheme.

CalVer versioning assumes [the Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar) as its default calendar, though not constrained to it. How projects utilize the calendar in naming their releases depends on the project management.

Ubuntu, for example, uses a three-segment CalVer scheme, with a short year and zero-padded month.

It has done so [from the very start](https://en.wikipedia.org/wiki/List_of_Ubuntu_releases), in October 2004, making 4.10 the first general release of Ubuntu. Ubuntu still uses CalVer following the release of its latest version 20.04, which was released on April 23rd, 2020.

Also, Microsoft encodes the date into its release numbers. For Microsoft Windows 95, the first two digits indicate the number of months that have passed from the January of the year in which the project started (with each major Office release being a different project), while the last two digits indicate the day of that month. So 3419 is the 19th day of the 34th month after January of the year the project started.

The assertion is that Calendar Versioning is ideal for large projects that are constantly changing scope, time-sensitive projects, and changes driven by some external factors.

## Spring Projects Version Naming Scheme

The Spring Projects version naming scheme, even though coupled with the [Spring Platform](https://spring.io/projects), is an interesting and maybe even more satisfying solution to the problem of version lock and/or version promiscuity.

This scheme builds on top of the Semantic Versioning scheme, adding extra labels to the version naming.

- **BUILD-SNAPSHOT** – the current development release.
- **M[number]** – A Milestone release (M1, M2, M3, …) marks a significant stage in the release process.
- **RC[number]** – A Release Candidate (RC1, RC2, RC3, …) is the last step before building the final release.
- **RELEASE**

At the end of the release process, the Spring team produces a RELEASE. Consequently, this is usually the only production-ready artifact. We can also refer to this release as **GA**, for *General Availability*.

## Final thought

How to version your release is your choice, but the software community has in some sense favoured the Semantic Versioning Scheme. Some of the notable reasons why the semantic versioning scheme is favoured by a larger percentage of the community are highlighted below:

- **Independent of project size** – the SemVer scheme can be applied to any size of project, from internal organization software to an enterprise's software projects
- **There is a formal specification** – it becomes easy for users to understand your software's current stage through your versioning
- **A solution to dependency hell** – the rules of semantic versioning, if properly applied, solve the problem of version lock and/or version promiscuity

Some projects use the semantic versioning scheme as their main scheme while others combine calendar versioning with semantic versioning, ensuring non-technical users understand the software version without having to read the semantic versioning specification while also preventing the occurrence of dependency hell.

While some projects choose to apply some industry-popular schemes, the essence of any versioning scheme is to enable smooth development, deployment, and better bug tracking in a software project.
