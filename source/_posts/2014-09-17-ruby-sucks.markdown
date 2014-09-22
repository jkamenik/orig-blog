---
layout: post
title: "Ruby Sucks"
date: 2014-09-17 20:04
comments: true
toc: false
published: false
categories:
  - rant
  - ruby
---

Ruby sucks!  Kind of!

Ok, well not really.  Not even a little.  But there seems to be a misconception about what `ruby` is.  I hope to clarify somethings by first comparing it to other languages, then by ripping it apart in a constructive way.

Every computer language serves to let human control computers, and nothing more.  Every language creator chooses an abstraction level that they feel fits with their needs.  And in the end every computer language creates strings of 0s and 1s.

<!-- more -->

Here is a high level summary of some languages that I use:

1. Assembly - Turn computer instructions into easier to remember words
1. C - A set of preprocessors on top of assembly
1. C++ - An Object abstraction on top of C
1. Java - An Everything is an Object attempt
1. Javascript - Sceme for the browser
1. Python - Its academic
1. Go - Easy concurrency
1. Ruby - Reads like prose

## Assembly

For those few of you that were alive in the time before assemby, the solution was direct bit manipulation.  This was done by manually flipping switches that represented bits or feeding punch cards.  Assembly was a huge improvement.

Instead of memorizing human instructions and then having to translate to and from binary one could use simplified language.  The downside is that every CPU manufacturer had their own language set.

## C

Given that every CPU had its own Assembly language, code could not be ported to multiple computers.  Enter C, the third attempt to create a portable language.  A and B came before C, but no one uses them or even references it any more.

The syntax and 2 pass compiler design has become the standard for most modern languages.

## C++

After many years of success, someone had the bright idea that complexity can be reduced by adding objects and encosolating details.  C++ is born using the same syntax as C, but with OOP.  Early version of C++ were just a preprocessor which created C code.

As the techniques of OOP became solidified the C++ compiler became a compiler in its own right.  However, unlike C most C++ are not bootstrapped (meaning it is not written in the same language as they compile).

## Java

Java was born out of Sun Mirocosystems.  It was originally intended to be an embedded language.  The idea being that you would install the JVM as the device's OS and your program would remain the same no matter what hardware was running.  In the end this concept was years ahead of its time.

It was also one of the first languages that forced classical OOP with its "everything is an object" approach.  Unfortunately, for performance reasons the language still contained primitives and other basic non-OOP contracts making its choice to force the "main" method to be a callback of an arbitrary object kind of ridiculous.

After the embedded aproach did not pan out Sun went after the web.  During this time they also split the language from the JVM, published the bytecode spec, and picked up XML as preferred configuration format.  The verbosity of XML seemed to fit the verbosity of Java as a whole.

## Javascript

Javascript was born in Netscape to allow HTML to be programmed.  It uses prototypical inheritance instead of classical inheritance.  Its language is based on C++ with concepts of several other languages.  Javascript has a lot of advanced concepts which of its developer did not know how to properly utilize given it an undeserved bad name.

A few well constructed libraries and the advent of JSLint made it clear what was good code and eliminated much of the early pains.

## Python

Python was born in academia.  It has infinite precision and a clean syntax.  About the only ding is that the cleanlyness of the parser is more important then the expressiveness of the language.  Other then its non-expressive syntax it is a first rate language.

## Go

Go is a new comer to the language scene.  It aims to make concurrent programming easy.  It has a C-like syntax, but is also opinionated about the syntax.  So opinionated that they have a `go fmt` program which will rewrite files using the expected indentation and alignment.

It is clearly a "new" language, and lacks some fairly common features of other langagues like versioned dependancies.  But it has an active community of caring people which are solving these issues.

## Ruby

Ruby was created to be an expressive language that was a joy to work with.  Unfortunately this has meant that much of the interpreter is nearly impossible to understand.  The upside is that unlike any language before it, it can act as its own DSL.

Rake, for example, is ruby's version of Make.  While Makefile is a special text that the make program parses, a Rakefile is just ruby code.  Adding `require 'rake'` to a ruby file simply causes it load `rake.rb` which add functions which make defining tasks and dependancies like writing english.

As promised this is the point where I list rubies weaknesses

### It's nothing but bloat

It is true that ruby program are larger then C programs, but they are no larger then other interpreted languages.

### It's slow

With the speed increases for the latest version of Ruby it is faster then both PHP and python now.  And JRuby runs at nearly C speeds.  So it is fair to say that is an apples-to-apples comparison that ruby is no slower then any other interpated language.

### Any class can be changed at any time, which is scary

Ruby does allow a programmer to reopen a class and add additional behaviors to it.  As it turns out we are all adults and in practice this is more useful then not.  ActiveSupport from Rails adds a lot of nicities like `1.day.ago`

### The GIL prevents concurrent programming

Not really true.  The Global Interpreter Lock (GIL) gets a lot of flack from those that haven't actually looked at the code, but it is pretty smart.  The GIL gets locked anytime there IO and unlocked anytime a thread is about to sleep.  For example: lets say you have a loop and in the loop you spawn a thread and do a web request to http://google.com.  The frist thread would build an IO request to a socket locking the GIL, but once the request hit the wire and the thread would sleep releasing the GIL and the loop would continue.

### They change the syntax every release

### It doesn't work on Windows

### There is no self-installer, GUI builder, or XYZ

### It's good for Rails, but not much else

### Rails is huge and slow

## Conclusion

I hope by this point you get the sense that no language is bad per se.  Each language starts with a set of assumptions which inform a design.  In turn that design defines the language, which in turns defines what is easy and what is hard.  You have to pick the right tool for the job.  And each language represents a single tool.
