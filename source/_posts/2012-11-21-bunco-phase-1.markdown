---
layout: post
title: "Bunco Phase 1"
date: 2012-11-21 08:21
comments: true
categories:
  - bunco
  - phase1
---

Phase 1 is alwasy a learning experience.  Often very little work is done, but a lot of research is done.  I generally do not like that approach.  Instead I like to start out simple and let that guide me.  And it has guided me to a initial working version at [http://jkamenik.github.com/Bunco](http://jkamenik.github.com/Bunco).

<!-- more -->

## The Target

Before any design could start I first had to decide what language, what library, what device, and how it will be accessed.

### Device

I have my phone with me everywhere I go.  So it is a clear choice as the scorecard and input device.  The only question then becomes: do I host it from the web, or create a native app?

I don't know native iPhone, but I know that PhoneGap can be used to generate a native app from a hosted one.  So I can still go native if I want, but I don't have to start with an all or nothing approach.

### Hosting

Now that I have decided on using the phone and hosting I have to figure out where to host and let that inform what else is available to me.

I could use a standard LAMP install on a hosting provider, but those can get expensive.

I could use a home server with DDNS to reverse port through my firewall, but I don't like maintaining my own infrastructor.

I could use a Micro Amazon EC2 instance (free for the first year), but again I have to do a lot of setup.

I could use Heroku and either spinup a simple Node.js or Ruby on Rails app.  Actually I started doing this, but then decided that in this stage with the need to message between phones it was overkill to even setup a server.

That is where Github Pages comes in.  I already use them to serve my blog, and a few other things.  And I am pretty much serving a static site.  All I have to do is work out of a git branch called gh_pages and everything will just work.

### Lanuage and Libraries

Knowing that I am serving a static site from GitHub I open to using the web, but limited into things that are pre-compiled and static.  And since it going to be for the iPhone jQuery Mobile is a natrual fit because it just uses HTML5's Sematic markup feautres.

I could use CoffeeScript - in fact if it gets any bigger I will - which compile to Javascript, but has a lot of nicities I am used to when working on Rails.  But since this isn't a full blown Rails 3.2 app - with the full asset pipeline and compiling, mimifing, and cache busting that goes along with it - the boon of CoffeeScript is slightly deminished.  Also, since I am starting with a library I haven't used before it might be more complicated debuging a CoffeeScript bug vs a jQuery Mobile bug.  I will leave CoffeeScript on the back burner for now.

#### Aside (Backbone.js)

As an aside, when I started I was writing raw JS hashes, but was having trouble keeping things sorted.  I remember my days of using ExtJS, which is great for managing complex GUIs, but very large.  Then I remembered Backbone.js which is what I use now.  Much smaller, and less combersome.

## Design

Once all the limitation are know (or at least most of them) everything starts with a design.  And I am not graphic designer, so I usually just go at the problem using rails.  Not really an option here.

But since I plan on using jQuery Mobile, right on their website they have a embedded designer.  The output is HTML5 markup with the "data" flash that jQuery Mobile uses.  Here is my initial design:

<!-- image here -->
1. Header - Refresh button and title
1. Footer - Scoring buttons: 0, 1, 5, 21
1. Body - The score board.  Players across, Rounds down.

### The score board

Very quickly I figured out that I really didn't have the room for the scoreboard.  Not without shrinking the size of the text to unreadable levels.  So I had to switch to another style.

Enter the accordian.  Instead of a grid where I see all scores I use an accordian showing the round number of the scores for both players.  Sure only really get to the see the score of current round, but I can just add the winner of the round to the visible title and that solves the problem.  Plus it takes up less room total, which is a win.

{% img /images/bunco/ScoreBoard_1.png %}
<!-- image here -->