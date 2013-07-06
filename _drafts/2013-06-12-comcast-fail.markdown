---
layout: post
title: Comcast Fail
date: 2013-06-12 20:20
comments: true
categories: 
  - rant
  - opinion
---

The Comcast 30 day challenge fails, except in challenging my nerves!

I feel angry and scammed, but instead of ranting I am just going to give the timeline with some commentaries.

<!-- more -->

Everything below is factually accurate, but for libel reasons I will be leaving out the name of persons involved, as well as specific locations.  The place where initial contact was made will be known as "the mall", the sales agent as "A", the installation tech as "the tech", Comcast support will be known as "S1" and "S2", and the equipment recovery support will be known as "R1" and "R2".

`My commentary will have this format.`

### Final Outcome ###

Lets start with the final outcome, which was effectively a 3 hour no-op.  There is a lot of anger because we feel duped, but no money changed hands, and I was able to reset my previous service provider without incident.  There is loss of recorded programs on the DVR, but that is the only loss I have suffered.

I suffered 2 days (of the free 30) with the wrong services and a constant set of "we can't help you.  Talk to some one else" answers.  During that time the internet (though not the correct server) had several outages.

### Timeline ###

#### November - June - Worry sets in ####

Worry about money and the cost all subscription services.  Verizon isn't horrible at $116 / month for very stable internet and some HD channels, but other then mortgage and utilities it our single greatest monthly expense.  We don't have movie channels because we have both NetFlix and Amazon Prime.

I am out of contract with Verizon so my cost could jump at any time, but at least I am not locked into a 2 year contract.  Doing online research has not yielded any options that are better.

#### Early June - Small changes ####

Cancel NetFlix since we barely watch it and have amazon which offers streaming video as well.

#### June 5th, 2013 - Sign up ####

Wednesday was a rough day and we decided to eat go to the mall to eat dinner.  After dinner we walked the mall and ended up in a Best Buy.  We were looking at the $199 Chromebook when **A** approached us.

`Yes we are a emotional eaters.`

**A** was quite nice and we have been looking for a cheaper service anyway.  He tells us about the "$400 per year challenge" where comcast can save you over $400 a year with the same or better service.  After discussing what we have, he tells us about the package he has for $72 / month for 1 year.  The package is:

  * Digital Preferred Plus TV
  * 50mb / s Internet
  * HBO, Showtime and Max

`Sounds too good to be true.  We are sceptical.`

**A** then says that we don't have to pay for anything now and we get to try it for 30 days for free.  We sign up for installation Tuesday afternoon.  He takes the form and returns with the brochure which he writes on.

`What the hell.  If it works, great.  If not it isn't going to cost us anything.`

On the drive home we get a text from **A** asking when we wanted the installation.

`Now I am on guard.  This seems like all the old problems I have had with Comcast.  Memories of bad service, and bad support come flooding back.`

#### June 10th, 2013 - Red flags ####

We get a welcome package from Comcast and it has nothing in it that remotely looks like what we were told about.  The advertised packages were triple play and much more then we are willing to pay.

`Red flag 1.`

Later that night I get my confirmation call.  The call says that the install will "arrive between 8am and 10am".

`Red flag 2.`

#### June 11th, 2013 - The install ####

`I work from home.  So I am always there during the day.  I rearrange things so that I won't need the internet.`

Around 8:30am the tech arrives.  He walks around the yard examining things then comes to the door.  He asks if I have ever had Comcast.  "Not at this address".  He tells me that there is no line to the house so he going to have to check some things.  He comes back a few minutes later and says that the only option is to run a cable over the drive, and across the yard and later they will run an underground line.  I have to sign a waiver because it is a tripping hazard.

`I figured he was going to try to take the cable directly through a wall like happened at another house.  So I am happy to sign the waiver.`

`Remember that they schedule an appointment to bury the line.  It comes up later.`

Tech runs the outside line and connects it to the line that already goes into the house.  Then comes in "I DVR, digital receiver, and cable modem where do you want them".  "The DVR in the living room, the modem in the laundry room."  He asks "where is the other TV?"

`Red flag 3.  I anly have 1 TV, and **A** knew that.`

Tech says "You should call your sales guy.  Service order says I have to install 2 TVs."  **A** warned me to txt him before calling in case he was with a client.  So that is that what I do.  Meanwhile the tech installs the cable box, which has to update.  Then he goes about installing the modem.

`Awesome, soon I get my internet back.  I have been working without it, using my phone for email and other things that require me to be connected.  Soon I will be able to push what I have done to github.`

Tech installs the cable modem and needs a computer to activate it.  He uses a spare machine I have.  It installs a bunch of packages like always, which I can't risk infecting my work computer.

`I hate that Comcast has this as a requirement, but at least I have a work around.  Verizon had a similar policy, but I was in the middle of moving and didn't have a computer so their tech used a verizon laptop to complete the installation.  No such luck with Comcast so it was a good thing I had a spare laptop.`

Immediately after configuring internet I check my work machine.  It is able to connect, but can't get online.  After 5 min of debugging it suddenly works.

`Checking the modem logs the next day I found that the DHCP server kept crashing, which explains why machine was on Wifi but couldn't talk to anything.`

Checking speedtest.net I find that I am only getting 20mb /s down.  I tell the tech it should be 50mb.  He says "you need to call your sales guy."

He then heads back to check the cable box.  Asks "what service do you have"?  "Digital Perferred Plus".  His response "Oh well that's not what is enabled on this box.  You should call your sales man and get this correct.  There is nothing I can do.  I could call support but they might not be able to help, but it would cost you."

`Wait what!?!  Support at comcast costs money now, and they can't help you with problems?`

I haven't gotten a response back from **A** so I give him an actual call.  The phone goes to voice mail and the voice says "the user has not setup their voicemail, goodbye".

`Red flag 4.  Holy hell!  A salesman that can't be reach and Comcast unable to help.  F'`

About 10 minutes later I get a call back and explain the situation.  The tech is doing cleanup so he is still here.  **A** tells me to have him take back the spare tuner and he will correct service tomorrow.

`Not what I want to hear, but at least things will be corrected soon.`

#### June 12th, 2013 - The fail ####

**7:30ish** - I start work and try speedtest.net again.  Still 20mb.  **A** must not be at work yet.

**10:50ish** - The internet goes out for about 10 minutes.  Great.  **A** corrected my account.  `or so I thought`

**11am** - Internet comes back so I check speedtest.net.  Still 20mb.  `WTF?!? Less then one day in and I am already have network outages?`

**11:03am** - I txt **A** "Any word on getting my package corrected?".  I then go about figuring out why the Internet went out.  From the modem logs it appears the DHCP (needed for computer to talk to the internet) crashed.  The time wasn't exactly right, but modem timestamp might not be accurate so that is my best guess.

**4:10pm** - I txt **A** "4pm and still word nor is the service working correctly".  Then realize my mistaken and txt "Still no word*"

**6:50pm** - I call Comcast back on a number they called me from after the appointment.  Turns out that is just the survey line and they can't transfer me.  They give me an alternate number, but that is the best they can do.

**6:52pm** - I Comcast at the number provided.  A few menus later and a short wait I am talking to retainment agent **S1** about canceling service.  I explain the situation and she wants to see if she can correct my service before canceling.  I am on hold for about 10minutes when she comes back to tell me that I have to talk to my sales person.

`Now I am thinking that I need to talk to the sales person to cancel.  Crap!`

"I can't get ahold of him.  Just cancel the service."  **S1** says "sorry for all the problem we can certainly cancel your account.  Since you are in the 30day window there will be no charge."

A short wait later **S1** says "You service is now canceled.  Do you have any questions at this time?"  "Are you going to send me a box so that I can return the equipment."  She says "No, but I can redirect you to a recovery agent."

`Crap.  I have been on the phone for more then an hour and now I have to talk to someone else.`

Another short wait and now I am talking to **R1**.  For verification reasons I have tell her all my account details.  Then she says "I am sorry, but we cannot collect your equipment Comcast has you down for a service call in 2 weeks so until that is finished there is nothing I can do"  "What?  I literally just got done canceling and was redirected here."

**R1** says "I am sorry sir, but we are not Comcast.  We are a 3rd party.  You need to call Comcast."  "Fine, please transfer me back."  "I am sorry sir I cannot do that.  You have to call them back yourself."  So I hung up.

`Now I question if Comcast is a company or a loose collection of people whose job it is to bounce you around like ping pong balls.  Have I even been talking to Comcast?`

**7:15pm** - I call Comcast back, wait again, and go through the same verification as before.  Now I am with **S2** who just like **S1** attempts correct my service and will not help until she does.  I give her all the details.  She says "Sir that is not a package that we offer.  What I can do is waive the DVR for a year and give you HBO and your cost is only $89.99 / month".

`Oh hell no.  I was sold $72 all in, no contract, including 3 movie channels.  Now I am being switched to a waived DRV (read contract required) and less for more?`

I say "No that is worse then I was sold.  But I already canceled the service and at recovery they told me they could collect because I had an outstanding appointment."

**S2** says "Let me check...  I see they have an appointment in 2 weeks to bury a line, but"  I cut her off "but since I canceled there isn't a need to bury a line.  Can you please cancel that appointment so I can have my equipment collected?"

`I shouldn't have cut her off, but it has been almost 2 hours of being bounced around and no one can help me completely and accurately.  I need to start being clear and not giving openings because I still have to make dinner.`

**S2** says "Ok sir.  We can cancel that appointment.  If that is all I can transfer you back to recovery.  Have a nice day."

A short wait, and re-verification of my account later I am talking to **R2**.  She ask when I would like someone to pickup the stuff.  So I schedule it and hang up.

**7:30pm** - I disconnect the Comcast line to the house and reconnect the Verizon line.  I then pull out all the Comcast parts and replace them with my Verizon equipment.  I leave the Comcast DVR because we taped a several things yesterday that we want to watch and collections isn't for several days.

`When we tried the DVR later it was bricked by corporate.  Nothing worked.  So those shows are lost to us now.  Thank god for online streaming.`

**7:42pm** - I text **A** "No worries.  Several calls to support later.  Comcast is canceled".  I then start writing this blog.