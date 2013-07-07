---
layout: post
title: "The problem with Best Practices"
date: 2012-05-20
comments: false
categories:
 - rant
---

I hate the term "Best Practices" for two important reasons.  First, in an attempt to be concise the eliminate the most import information: the reasoning.  They are often just the call-to-action statement. and they are often passed down as policy.  Some best practices are good practices (for example pre-flight checklist) when applied to the correct situation.  But without the reasoning statement, it is hard to tell if the practice can be applied to other situations.  If I had to apply a pre-flight checklist before starting to code then I would waste a huge amount of time.

<!-- more -->

Second, best practices eliminate critical thinking.  With a misnomer like "Best Practices" it is not surprising that they are not questions.  And in most situation questioning a "Best Practice" is taken as an affront to the person/department that introduced the Best Practice.  I am not sure why this is, because very rarely is a Best Practice the best practice for every situation.  But since they defy questioning once instituted they become technical dept when they outlive their usefulness.

Instead of "Best Practices" I prefer "Pro Tips."  But the name itself is not as important as to how it is presented.  In order for me to consider a "Pro Tip" it must have three parts: a list of benefits, a list of drawbacks, and description of behavior.

## A best practice: Always backup your work using git ##

I do not think that any software engineer is going to argue that backing up work is a good thing.  But by phasing it this way the problem because that "git" becomes an afterthought and therefore an annoyance.

## A Pro Tip: Use git as a journal ##

Using git as a backup mechanism is a good thing.  But it is better to use git to journal what you are doing.  So instead of work for an entire day, committing everything at a single time, and then pushing everything at once you should do a single complete thing, and commit that.  Usually commits happend every 5 to 10 minutes, but they are generally self contained.

Benefits:

1. Your work is backed up
1. You and others can see your train of thought
1. You can return of any point and attempt other options
1. You eliminate the fear of trying new things
1. Focused work

Drawbacks:

1. You have to know git to make the most of it
1. You have to take the time to make smaller commits
1. You have to push more often
1. You might have to start branching in order to keep organized
1. Difficult for messy thinkers (tinkerers)

See: a pro tip is a bit longer, and more detailed, but at the same time it is more convincing.  The reader can then choose when and how to try the tip, and also is free to adapt the tip to their given situation.  For example: a developer is going to use git differently then a designer; but git could be useful for both.