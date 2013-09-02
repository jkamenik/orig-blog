---
layout: post
title: "Technical Debt Calculator"
date: 2013-09-01 20:40
comments: true
toc: false
categories: 
  - planning
  - ui-mockup
  - technical-debt-calculator
---

All projects have some amount of Technical Debt.  And for projects I manage I am tired of keeping that knowledge in my brain.  My idea, and an example of UI mocking, is to create a technical debt calculator which can store the choices made on a project and map how those choice interfere with other choices.

The term Technical Debt refers to "any work that needs to be performed before a particular job can be complete."  That is true, but I don't like the wording.  Instead I am going to define it as "any choice that makes future progress more difficult or impossible".

A project is defined by the choices.  Good or bad, every choice adds debt that must be juggled.  In fact, when a person is "in the know" that is referring to the fact that they know most-if-not-all the technical debt of a given project.  I find those people to be useful as a well of knowledge, but not as forward thinkers.

There is something about keeping all the Technical Debt knowledge that makes you adverse to change.  It isn't technical debt that kills projects per se it is the keepers of technical debt that resist change that do.

<!-- more -->

My drive for this project is to not become a keeper-of-technical-debt on any project, and to communicate the debt clearly.  Often times when a project starts the time from talk to fully formed featured is hours or days.  1 - 3 years in and the same amount of effort is 1 to 2 days.  And on large projects that have taken several direct changes the time can be 1 to 2 weeks.  The only change being the number of previous choices.


## The good choices ##

My calculator is meant only to track the bad choices or old choices.  There are some "good" choices that will slow forward progress, but ultimately prevent larger issues.  Here is a short list of something that will add time to the project but should NOT be considered technical debt:

1. TDD/BDD
1. Agile methods
1. Using existing frameworks
1. QA
1. Code reviews
1. Local builds
1. Continuous integration
1. Saying "no"
1. Having confidence and a direction

## Existing State ##

I spend a little bit of time with pen and paper taking notes and drawling prototypes.  In the future I will expand on these ideas, but for how here they are in their raw form.

[First set of designs]({{ root_url }}/images/tech-debt-calc/tech-debt-calc1.png)

[Schema Notes]({{ root_url }}/images/tech-debt-calc/tech-debt-calc2.png)

[First redesign]({{ root_url }}/images/tech-debt-calc/tech-debt-calc3.png)

[First redesign cont.]({{ root_url }}/images/tech-debt-calc/tech-debt-calc4.png)