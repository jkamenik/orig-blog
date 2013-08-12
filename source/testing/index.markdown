---
layout: page
title: "Testing"
date: 2013-08-01 19:52
comments: true
sharing: true
footer: true
toc: true
---

This page is about how I test.  It is certainly not total correct, but I do welcome comments on ways to improve.

## Rules for testing ##

I used to be one that believed that everything had to be tested.  I still believe that, but now I know that different things need to be tested differently.  I have come up with some guidelines that I generally use.

1. The goal of testing is to know when something is "done".

1. Don't test the functionality of gems, but do test the integration of a gem.
1. If testing something is difficult then you designed the "thing" wrong.
    1. Check for standard patters, or 
    1. Drop to a lower level test.
1. Only stub things you own.
    1. For things you don't own, memoize ([VCR](https://github.com/vcr/vcr) is good for http request memoization)
1. Don't write code until there is a failing test
1. [Coding "confidently"](http://www.youtube.com/watch?v=T8J0j2xJFgQ) can ease the test burden
1. For a customer / Product manager requested features use Cucumber
    1. Define the idea of the test ahead of time, and get buy-in before testing.
    1. Only write features of interest for the customer.
        1. For feature that are a requirement, but not of interest for to your customers, use Rspec feature tests
    1. Those high level phrases become your steps.
    1. If cucumber is confused then so will your customer.
1. For uninterested customers start with feature testing in Rspec
    1. The same tools are used (capybara), but it is faster in both terms of time and in terms of coding

### Traversing tests ###

1. Start with integration/acceptance testing
1. Each failed step is an opportunity to drill into a unit test
1. Move down when tests failure no long talk about the code at hand
1. When a test passes move sideways to another test in the same area.
1. When all tests pass in an area move back up
1. "Done" is when all acceptance tests pass

## The Testing Stack ##

Everything here is based on a Ruby on Rails app.  Currently 3.x Rails.  4.x will likely change things

1. Rspec
1. Cucumber
1. Capybara
1. Capybara Webkit
1. Factory Girl
1. Timecop
1. VCR
1. Database cleaner

### Rspec ###

Everyone has their opinions on testing.  I know MiniTest and use it when a project that I submit to uses it, but my projects use Rspec.

### Cucumber ###

Ok, so let me just get it out there: Cucumber is evil.  Don't get me wrong I like cucumber, but I have gotten myself into so much trouble using cucumber.  Granted the issue was that was using cucumber to write specs, but nothing in the cucumber world made it seems like that was a bad idea.

## The debugging stack ##

As you are testing inevitably you will run into an error that tests can't explain.  Here are the tools that I use.

1. Pry Rails
1. Better Errors
1. Letter Opener
1. Exception Notification

### Why no debugger??? ###

My experience with debuggers has always been that they are for programmers that don't first test their code!  I have been coding for over a decade and find that debug print statements are more reliable and consistent, unless you working in assembly.  Even embedded systems with no file system have syslog clients.

### Pry Rails ###

Basically just replaces `rails console` with [Pry](https://github.com/pry/pry).  Pry makes it easier and cleaner to drive into objects, but I always have to remember to only include it `development` and not `test`.

### Better Errors ###

Replaces the standard error screen that is displayed when an exception is thrown with a better look screen.

### Letter Opener ###

Opens email messages in a browser window.  This makes it easier to see what the end email is going to look like and it doesn't involve an email server.

### Exception Notification ###

This is a MUST have for production!  But it sends a full stack trace email if your app fails in production.  Now you will know about site failures and can debug them before you get a support ticket.