---
layout: post
title: "Automator - Start work - workflow"
date: 2013-09-10 09:25
comments: true
toc: false
categories: 
  - cat1
---

I don't like to repeat myself, and I use a Mac, so I have a great little tool called "Automator".  Every morning when I am about to start work I open Spotlight (`cmd + space` for me) and type "startwork".  The first app that shows up is my Automator workflow for opening all the programs that I need to work.

Here is my Automator workflow:

{% img /images/start-work.png %}

<!-- more -->

## The apple script (The first action) ##

This is a template apple script that just launches all my applications.

1. Adium - An OS X chat client that can almost all IM protocols.
1. Waterfall Campfire - My company's campfire chatroom isolated inside a Fluid app.
1. iTerm - My terminal of choice.
1. Tower - My git client of choice.
1. RubyMine - My IDE of choice.

*Note: I use "activate" with iTerm, because "launch" throws an error*

### Assigning apps to desktops ###

Automator cannot do this for you (at least not yet).  But I am very particular about where and how I like my windows setup.  Luckily the Mac remembers the last window settings on exit, so moving things around, resizing windows, and quitting does the trick.  However, it does **not** remember which screen an app is on.

To assign an app to open on a specific screen follow these steps:

1. Open the app
1. Move the app to the screen you want (using mission control)
1. Switch to that screen
1. In the dock
    1. Right click the application icon
    1. Click Options -> Assign To -> This desktop

*Note: this only effects where the app opens, you can move windows to other screens anytime you want*

## Opening URLs (Last 3 actions) ##

The last three actions are the easiest way I can find to open multiple URLs in the same browser at once.  The automator task uses the system's default browser which for me is Chrome.

*Note: the URLs are opened in a semi-random order.  I don't know how to fix that.*

I like to open URLs as close to where I actually do my work as possible.  The trick is hacking the URLs.  These are the URLs that I use most.  Other URLs come and go - like right now where I open github.

1. Pivotal Tracker - https://www.pivotaltracker.com/s/projects/`project id`
    1. I tend to work on a single project for long periods of time so I just open that project every time.
1. Google Mail - https://mail.google.com/mail/u/`multi-login index`
    1. The `/u/...` tells google to open a different logged in account.  I *always* log into my personal gmail account first (index 0) and my work account second.  So `/u/1` is my work email.
    1. If you add `/u/...` but aren't logged into google multiple times it will ask you to login again.  This can be jarring if you are not expecting it.
1. Basecamp - https://basecamp.com/`account-id`
