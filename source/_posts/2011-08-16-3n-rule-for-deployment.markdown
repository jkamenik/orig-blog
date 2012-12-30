---
layout: post
title: "The 3N Rule for deployment"
date: 2011-08-16
comments: true
categories:
 - deployment
---

As a programmer I am lazy, but in a productive way.  It is not that I don't do anything.  It is that I only do things a set number of times.  I have a simple rule, which I call the "3N rule", which states "I will doing something once, script it the second time, and use the script from then on".  Therefore, if I have 3 to N devices to manage then I have a script that takes minimal input and replicates the change on all devices.

<!-- more -->

I also have a 3N rule for programming, but that is a matter for another time.

By using a script I eliminate a lot of the human error and also increase my productivity because computers are, now days, faster at responding to stimuli then I am.  But computers are "swift idiots" so for this to work the environment has got to be controlled.  I recommend doing the following:

1. Use VMs
1. Run headless, enable SSH
1. Use [ClusterSSH](http://sourceforge.net/apps/mediawiki/clusterssh/index.php?title=Main_Page) or [csshX](http://code.google.com/p/csshx/) for learning what to script
1. Use [Capistrano](https://github.com/capistrano/capistrano/wiki) or [Fabric](http://docs.fabfile.org/en/1.2.0/index.html) for automating change

By using a VM and running headless you remove the temptation to sit at a physical terminal. It also eliminates the fear associated with screwing something up as it is trivial to snapshot a machine and restore its state.

By using SSH and ClusterSSH you enable yourself to start thinking about the cluster as a whole, and more importantly start acting on the cluster as a whole. If some of the servers get out of sync then it makes management more difficult, so by using ClusterSSH you eliminate that problem.

By using Capistrano, or its like, then you eliminate the human error entirely. This is just good policy. Also, a benefit of a deployment script is that it is self documenting (assuming you know how to read).
