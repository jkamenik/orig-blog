---
layout: post
title: "B'More on Rails Meetup - Feb 11, 2014"
date: 2014-02-12 09:09
comments: true
toc: false
published: true
categories: 
  - ruby on rails
  - b'more
---

Last night I attended the B'More on rails meetup group's monthly presentation.  Always a group crowd.  Always good pizza.  And always good talks.

Last nights talks where about Polymer and the JVM.

<!-- more -->

## Polymer

Presented by Chris Strom

Before the meeting started we still only had 1 presentor, so Chris whipped together a [lightning talk](http://en.wikipedia.org/wiki/Lightning_talk) on Polymer.  He has been blogging about it for some time, and is in the process of writing a book on Polymer.

Polymer is horizontal in scope.  Instead of taking over the entire rendered page like Angular, jQuery, or Backbone, it isolates itself to sub page elements utilizing [Shadow Dom](http://www.w3.org/TR/shadow-dom/).

The simpliest way to think about a Shawdow DOM is like an HTML namespace.  Programming languages have long had namespaces to isolate parts of code and keep things maintainable.  HTML has never had this, so reusable components have been a real headache.

HTML 5 is trying to change that with a lot of advanced techniques, and Polymer is wrapping that in an easier to use library for programmers.

## The JVM

Presented by Gary Trakhman

The sides are [here](https://github.com/gtrak/jvmrubyists)

It is nice to see new presentors.  I am not sure if he is new to the group, but I have not seen him present before, so props for that.

The talk itself was an overview of many concepts about the Java Virtual Machine (JVM), but not really about the Java programming language, and not deep in any one area.  Gary (as well as most of us in the Ruby community) find the Java language too verbose to be useful.  There were some Java examples just to give a comparison to Ruby, but his main examples were using Closure.

The JVM uses a Just In Time (JIT) compiler to take bytecode and translate it into platform specific instructions.  The instructions for Linux are different from Windows are different from BSD, but the bytecode is universal.  Java, JRuby, and Closure are just programming languages that produce bytecode.

After the presentation Gary went into a live demo using a Closure console to execute code in real time.  The console simply starts a JVM, pipes it bytecode, and then prints the results in the terminal.  With the JVM running he also open the visiual profiler - which is provided in the Java Development Kit - so we could see the performace metics of the running code.

## Sponsors

* [MDLogix](http://www.mdlogix.com/) hosted the event
* [SmartLogic](http://www.smartlogicsolutions.com/) provided the pizza
* [Back Forty](http://www.inthebackforty.com/) - Honorable mention