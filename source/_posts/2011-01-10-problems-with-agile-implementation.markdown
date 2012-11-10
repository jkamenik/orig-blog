---
layout: post
title: "Problems with Agile Implementation"
date: 2011-01-10
comments: true
categories:
 - rant
 - opinion
---

I really like agile programming. It keeps me close to the action, and makes me have to think about my next moves. It also keeps me informed as to what is going on around me. But in my many years of using agile I realize that, though the process itself is very nice, its implementations can tend not to be.

<!--more-->

Problem don't arise from agile itself, but who and how it was implemented. If the implementer's goals do not match the [Agile Manifesto](http://en.wikipedia.org/wiki/Agile_software_development) there is little chance of success. I have used [scrum](http://en.wikipedia.org/wiki/Scrum_(development\)) many times and the most common problems I see are:

1. Agile as Micromanagement
1. Agile as a Whip
1. Agile as an Excuse


### Agile as Micromanagement
#### It looks like:

1. Having to break task down into hourly segments of work
1. Having to break task that logically have to be done by a single person
1. Having to account for ALL time taken, even time not related to code like attending meetings

#### Agile tenet misused:

1. Individuals and interactions over process and tools
1. Working software over comprehensive documentation

This happens when a manager ([chicken role](http://en.wikipedia.org/wiki/Scrum_(development\)#.E2.80.9CChicken.E2.80.9D_roles)) is the Scrum Master or when the Product Owner has say over implementation specifics. It is a confusion of roles, which in turn leads to a confusion of goals, which in turn leads to over documentation.


### Agile as a Whip
#### It looks like:

1. Filtering a burn-down on an individual basis
1. Placing more in the sprint then can be done (but still requiring it all to be done)
1. Associating points with people (publicly)
1. Associating number of tasks done with effort
1. Associating points with hours
1. Basically anything where measured output is more important then people

#### Agile tenet misused:

1. Individuals and interactions over process and tools

Anytime you associate numbers with people you have created a [crab mentality](http://en.wikipedia.org/wiki/Crab_mentality). Their focus will stop being on software, but on making their numbers better. Those that are better at number games will succeed, those that are better at software will fail.


Anytime you put your people under undo pressure then simple mistakes are made. This is going to later erode confidence in the team. It is going to happen like this: "you missed a comma in a Javascript file which causes it not to work in IE. That was such a simple mistake to have tested for that I am not sure you are testing any of your code." The problem was caused by 4 hours of sleep in 72 hours of coding at the end of an over-extended sprint. The programmer was nearly delirious. It is shocking it was the only mistake, not that it was a simple mistake!


Unfortunately I have seen this situation start innocent enough, with comments like "we don't want to over work the staff" or "we want to make sure they always have something to do" or "we want them working on the correct things". If the "we" in question is management ([chicken role](http://en.wikipedia.org/wiki/Scrum_(development\)#.E2.80.9CChicken.E2.80.9D_roles)) then there is probably already micromanagement going on, and Agile is being used as whip to solve the problems created by the bad implementation.


### Agile as an Excuse.
#### It looks like:

1. "You said it would take XXX. It took YYY. You need to make up the difference out of your own time"
1. "We cannot slip these date, and you have already pared back the release N sprints ago. You need to put in extra effort"
1. "Agile is about being agile. Even though we are mid sprint we are radically changing direction, but we are not canceling the sprint or doing sprint planning. We are just swapping out some tasks for others."
1. "You picked the language. It is now your problem to bring this project to conclusion and under budget."

#### Agile tenet misused:

1. Individuals and interactions over process and tools
1. Responding to change over following a plan

These are all excuses I have heard. Each time given by a person in [chicken role](http://en.wikipedia.org/wiki/Scrum_(development\)#.E2.80.9CChicken.E2.80.9D_roles) (managers) because they are ignoring changes in the field (military term). Every choice has a set of outcomes: some good, some bad. The attempt with agile is not to mitigate bad outcomes, but to allow those outcomes to contribute to the overall direction.

Sometimes the bad outcome will be that something took to long, or that one language/tool was not the correct choice given the problem set. If for every problem that happens the developer has to take their own time, or face embarrassment, to solve the problem then they will stop making choices. Not just choices that might have bad outcomes, but choices altogether. At which point someone in a [chicken role](http://en.wikipedia.org/wiki/Scrum_(development\)#.E2.80.9CChicken.E2.80.9D_roles) will start making more choices then they should.
