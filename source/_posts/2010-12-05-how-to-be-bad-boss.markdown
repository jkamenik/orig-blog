---
layout: post
title: "How to be a bad boss"
date: 2010-12-05
comments: false
categories:
 - opinion
 - howto
 - rant
---

Being a boss is a complicated thing. It is your job to get people to do things, sometimes things they do not want to do. And it is especially complicated in the software industry, where it is like herding cats.

I see a lot of posts on how to be a good boss, but the problem there is that they often forget to mention the things that can and will immediately erode any success you might have had. I am going to assume that as a reader you strive to be a person who others are willing to follow.

Nobody is perfect, so you will probably have done at least one of these things in the past. Or you do then without even knowing. Now is your chance to stop, and be a constructive boss who people want to work for.

<!--more-->

## Be smarmy

Yep, this is number one.Smarmy people are falsely friendly (think used car dealers). Notice I did not say do not "be mean." As a boss sometimes you will need to be mean, or at least not very nice.  And even that should be kept to a minimum, but it is never OK to be smarmy.  All it does is make people uncomfortable confiding in you, which means they will either find better employment (if they can) or they will sabotage you.

Here are some examples of what I mean by smarmy:

* Suggest that a problem can be solved by the employee working overtime
* Using scrum (or any general meeting) to point out an employee's failure
* Joke about firing an employee
* Make any sarcastic comment about an employee in the presence of others
* Only talking to an employee when you need them to do something (i.e., I am only talking to you because I want something)

Some ways to tell that you have already failed at this:

* All laughter stops when you enter the room
* Conversations between you and an employee die quickly
* Employees no longer tell you about issues they are having

## Be a hypocrite

A hypocrite is someone who says one thing and thinks or does another. It can be as overt as being prejudiced (racist, sexist, etc...) or as covert as being passive aggressive. Being a hypocrite is risky because when other people find out, you are just being deceitful, and no one wants to deal with that.

One example is saying that code needs to be high quality but not leaving time for testing. Overtly this often resembles explicitly adding a testing phase at the end of coding and then cutting it if coding goes long. Covertly this is often assuming that testing is done as part of coding, but scoffing at longer estimates. Speed and quality have a tenuous relationship. Something done slowly may or may not be of quality, but something quickly is almost never of quality.

The best way not to be a hypocrite is not to bring your values and prejudices into the equation. To do this though you have to understand what your values and prejudices are. In the case of the no testing, quality is explicitly stated as the important part, but speed is implicitly stated as the important factor. More specifically speed at the cost of quality is stated as the import factor. To avoid this, it is important to explicitly state the importance of all three tenets of the project triangle: that way you avoid the embarrassing case where one tenet goes to 0 unintentionally. See: [Project Triangle](http://en.wikipedia.org/wiki/Project_triangle).

## Be arrogant

I am not talking about being hard headed or stubborn. I am talking about being truly arrogant. Stubborn people will listen to reason, assuming the opposing argument is good enough; arrogant people cannot be directly convinced. There are two forms of arrogance to watch out for: arrogance of idea, and arrogance of presenter. Arrogance of idea is simply dismissing an idea because it is in direct conflict with your internal ideas or values. Arrogance of presenter is rejecting an idea because of who presented it.

Two engineers approach you with different solutions to the problem of releasing on time: one says to keep the feature set and stop doing unit testing, and the other says reduce the feature set but keep the unit testing. Which do you choose? If you choose "keep the feature set" then you wrong. If you choose "keep the unit testing" you are also wrong. If you chose either (based on only the information provided) then the choice you made was based on you internal values only and not based on the problem being presented.

In the context of work the truth is that new hires probably know more about a given framework than you, and certainly will have a different perspective on how things should be done. They are probably offering you this knowledge, because they have already encountered the problem you are now seeing and have found an appropriate solution. It is tempting to dismiss this simply because a new hire presented it and they don't know the full business impact of their suggestion. But ask yourself: if the system architect presented you with this idea would you accept it? If yes, then you are suffering from arrogance of presenter and should tread lightly.

I suggest instead that you judge an idea (never a presenter) on its merits in the context of only the problem (never on facts you assume to be true). And make sure you are consciously and actively judging the idea, and you are not adding your own problem or values.

## Offer post hoc rewards

A post hoc reward is a reward given after work is complete. In physical work the effects of post hoc rewards are well known and lead to better results, but in knowledge work offering post hoc rewards has a distracting effect. Work will take longer and be of lower quality. It will make employees very good at performing work that maximizes their incentives, and not at developing a quality product. Be aware that offering reward for work done defines a tangible value for that work, which may demoralize an employee who feels under compensated as a result.

<iframe width="560" height="315" src="http://www.youtube.com/embed/u6XAPnuFjJc" frameborder="0" allowfullscreen></iframe>

Intrinsic rewards can and should be used. These are things that are given universally and without reservation. Basic examples would be vacation, and health benefits. Other examples would be a free day to work on any project the employee wanted, or free soda/tea/coffee. These intrinsic benefits help endear you and the company to the employee.

## Accept estimates less than 4 hours

This may only be true in software, but tasks never take less than 4 hours. A task is really an atomic complete chunk of work, so to be considered complete it must be coded, tested, reviewed, and committed. However, some employees will claim they finish tasks sooner. Often these people are cutting corners (not testing, or not getting a review) or they are doing a bunch of tasks that should have logically been considered one task.

Either way they are playing a game with the numbers to get their counts higher, which means that you are probably rewarding over aggressive estimates, and have a huge defect backlog. Well done!

## Assume research is intrinsic

I have seen this bite so many bosses, where they say something like "tasks cannot take longer then 4 days." The problem is that now you have employees trying to split tasks that have little or no real research done. So when it comes time to implement you have a bunch of small tasks that are too small to warrant research, but no real clear direction because no real research was done.

Estimates of several weeks or months are fine early in the process. But enough time needs to be given to investigate feasibility prior to high level scoping. Prior to implementation, time should be given to research an implementation and split the tasks out. All of this time should have been blocked in as a single unit during high level scoping.

## Require meetings

Meetings cost time and money. And in addition to the meeting itself there is time before the meeting where people ramp down, and time after the meeting when people need to ramp back up again. Both ramping phases are about 10 minutes each.

To monetize this for you, let's say you have 12 employees going to a meeting, and on average they make $24 an hour, and the meeting is 15 minutes (a scrum). The total chunk of wasted time is 35 minutes or about $14 per employee. For the company that means you wasted $168. And that does not include any prep time employees had to take.

In general, meetings need to be kept to a minimum and kept on track because they will end up being the single most costly event both in terms of money and productivity.

## Watch your employees work

Nobody is comfortable being scrutinized. Do not set up your office so that you are looking into your employees' cubes, and don't wonder around aimlessly, and never under any circumstances hover. By doing this you are showing your employees that the most important thing is to look busy (a function of the keyboard and finger), not to solve problems (a function of the brain). At the point where your employees feel scrutinized they will work just hard enough to not get fired, and will partake in CYA games.

The best example is Office Space the movie. Little more needs to be said.
