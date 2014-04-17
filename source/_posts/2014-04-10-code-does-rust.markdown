---
layout: post
title: "Code does rust"
date: 2014-04-10 14:58
comments: true
toc: false
published: true
categories: 
  - rant
  - opinion
---

Fourteen years ago Joel Spolsky wrote an article entitled "Netscape Goes Bonkers".  In that article he states that "old software doesn't rust".  The rest of the article is good, but that statement is "off".

<!-- more -->

To be clear, as a direct comparison software contains no metal to oxidize and therefore cannot actually "rust".  But as an analogy, over time untouched software will slowly degrade and eventually stop working.  So the corrected statement should have been "[untouched] old software rust[s]."

Recently, some login code I wrote a few years ago magically stopped working on FireFox.  This functionality continues to work on all other major browsers. However, due to the fact that FireFox decided to change how it handled cookies my software is now slightly less capable of performing as expected.

As a result, instead of making further progress on a new feature I am forced to a take a moment to clean and fix the rust spot.  Not a challenging fix and not indicative of a fundamental design problem, but rather, an annoying, little issue which needs to be addressed. Of course, the big picture view is that, over the years, I've had to deal with hundreds of problems just like this one. Meaning that when I don't closely maintain a project's codebase and adapt it to dependency updates, then it's performance and functionality is diminished.  Very similarly to how an unmaintained metal surface rusts.

This leads me to believe that software does in fact rust. 

The solution? I've found that there is no substitute for taking the proactive approach and resolving these problems early on because eventually the rust will become too significant and lead to the software being scrapped altogether.

Ideas age like fine wine, but software rusts.

How to slow the problem
-----------------------

Any time there is an interface between two systems there is corrosion.  This is as true in software as it is in the real world.  Tires exist because road surfaces chew-up (corrode) anything that slides across them.  The tire is the car manufacturer's interface to the road.  The same method works for software.

If the interface between two systems is highly corrosive (constantly changing) then the best interface is someone else's.  For example, Heroku is a going to be a better interface to "cloud" hosting then Amazon.  Amazon is infrastructure in the cloud; basically the road.  Heroku is web hosting in the cloud and uses Amazon as a base; basically the tire.  So if all you want to spend your time on is building the car, then use Heroku as the tires.

If the interface between two systems is only slightly corrosive then add a standardized "socket", to protect yourself.  Car's don't produce enough point-heat to light a cigarette, and instead of piping the 800+ degree exhaust into the cabin or giving unprotected access to the car's battery the car manufacturer introduced a socket that could power a heating coil.  The socket protects the car, and provides a standard interface.  And by being standardized, anyone (not just the manufacturer) can create an adaptor to fit the socket.

An Application Programming Interface (API) is the software equivalent of a standardized socket.  Any place your system needs to be accessed, simply create an API, even if you control both ends.  Now your tests can focus on ensuring an unchanging API, to catch any wear that needs to be addressed.

If the interface is non-corrosive then test for wear.  Many systems "guarantee backwards compatibility" (at least until they it breaks the first time).  This is the software equivalent of a well lubricated non-corrosive interface.  It is still not immune to corrosion, but you don't (and shouldn't) actively protect yourself.  Instead, add some once-in-while checks.  Cars usually get a 50K mile service to check for these low wear areas.  Do something similar with your software.

Of the millions of cars that get a 50K mile service a small percentage will have a catastrophic failure, where one of those non-corrosive interfaces corroded.  The same will happen in your software, eventually, but the cost of constantly checking those parts is far greater than any saving gained by not letting it fail.  It is better to follow good practices (like modular design, and not cutting corners) then it is to search for failures everywhere all the time.

If the interface is solid, then fail to launch if there is wiggle.  Cars need engines.  That is a solid interface and a hard requirement, without it you go no where.  And if a engine dies while it is running there is the expectation that the car will stop.  We might be surprised that an engine breaks, but we are not surprised when a broken engine stops a car.  Web servers need databases and network connections.  So code to bind to a port or connect to the database should allow the app to fully fail.

During normal operations it is common for a database connection to be temporarily closed, like network timeouts.  Temporary failures should have one additional layer of protection: a limited retry count.  After the retry count is exceeded then the issue should be considered a full failure and the app should stop.

Sidenote: Degrading software
----------------------------

And now I hear you saying "Woah, apps should degrade gracefully."  Honestly, they shouldn't, at least not self-degrade.  You would never drive a car, get a flat, and expect the car to change its own tire.  No, you pull over, install the spare tire, and at a degraded level drive slowly to a tire shop to have it fixed (at least that is what you should do).  But the car did not degrade itself.  You, as the driver, are expected to make that choice for the car.

The same is true in software.  The software should not degrade itself.  There should be a watchdog for your software which periodically checks to see if it is alive.  If during one of the checks the software is found dead then it should be resurrected.  If it suffers SIDS then the watchdog notifies someone, otherwise it is business as usual.  To be a good-citizen, your software should play nicely with the watchdog.

By adding degradation to your software you must also add complexity to your watchdog, so that it can deal with your "dying" software.  And even if you are fine with the Law of Demeter violation you just introduced, you still cannot overcome the permanently-half-dead issue.  Permanently-half-dead is the common state in degrading software where your software has one or more forms of degradation and as a result, it cannot self-correct.  It will never die because it is degraded, but it can never perform fully either.

As a further aside, people often confused degrading software with defensive software.  But to clarify, defensive software is only concerned with preventing bugs due to unforeseen usage.  Things like swapping direct memory manipulation with a memory manager, and code reviews, and testing are defensive.  Defensive software can and does terminate before it can degrade into doing something foolish.  Take for example:

```ruby
class DegradedUser
  def name=(name)
    # if the user provides too much data, 
    # ignore their wishes, do what we want,
    # and don't tell them
    @name = name.to_s[0..16]
  end
end

class DefensiveUser
  def name=(name)
    raise 'name is too long' if name.length > 16

    @name = name
  end
end
```
