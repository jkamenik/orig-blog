---
layout: post
title: "Learning Selenium"
date: 2010-11-18
comments: true
categories:
 - testing
 - selenium
---

## Background
My basic need is to find a platform where I can test FF, IE, and Safari on Windows, Linux, and OS X.  I use OS X as my platform, and Safari or Webkit as my environment.  I don't like Windows or IE.  Linux is OK, but I like OS X because it just works the way I want.  And I find FF to be slow, and Firebug which is needed to debug we pages causes rendering changes and timing issues (most notably causing FF to crash).

Ideally I want the testing environment:

1. To be developed in Safari on OS X
1. To be able to test both internal libraries and rendered UI
1. To use unit tests to test internal libraries
1. To use interactive tests to test rendered UI
1. To use the unit/interactive tests as regression system moving forward
1. To write the tests once on my browser of choice
1. To run the tests on all combinations of browser and platform.
1. To not be bogged down by the testing framework
1. To be free, or very cheap

From my research it looked like Selenium did basically exactly what I needed. And unfortunately was the only real option.  There were plenty of options for taking screen shots of public sites (which mine isn't, yet) and comparing those between browsers.  And there are several options for unit testing javascript, but only Selenium did both and could be run on my own hardware.

## Implementation
From my reading it looked like I wanted to use the IDE to create the tests, and remote controls to run the browsers.  Eventually I need to scale to Selenium Grid, but that is for later discussion.

### Test code
This is the sample file that I created to test.

{% gist 1151478 code.html %}

### Using the IDE
It took a long time to understand this tool, since I had no background in Selenium.  The basic premiss is that each file is a single test case, which is a set of tests.  Each test is a grouping of three items: the action, the target, and the expected result.  It natively creates a 3 column HTML table, which it can also run, but personal preference is that use the IDE to export the basic test into a different language.

I am a rails developer, and am familar with rspec so I use the IDE to run the tests to make sure they work, but then I transfer it to rspec since it is a more expressive test framework.  The downside is that you have to use a Remote Control to run the test, which adds an extra level of complications.  We will get to the Remote Control later.

A basic HTML test looks like this:
{% gist 1151478 test.html %}

There really is nothing more to it then that.  The one thing to note is that the test uses `verifyEval` which takes a JavaScript string.

{% blockquote %}
In all tests the <code>this</code> object is the base Selenium object so if you want to get to the <code>window</code> object you have to traverse up the stack via <code>this.browserbot.getUserWindow()</code>.
{% endblockquote %}

{% blockquote %}
Unfortunately everything tested in Selenium is converted to a string before testing.  So if I need to ensure that an integer parsing function actually produces a number I need to use <code>typeof</code>.
{% endblockquote %}

## Using RSpec
The IDE is a great way to test scripts live, but for any programmer it is going to be easier to use a testing framework doing it programmatically.  As a rails guy I prefer RSpec so that is what I use.

### Installing
This package requires ruby-gems, rspec, and selenium-client.  I am going to assume you have ruby-gems installed already.  The others are installed like this:
{% gist 1151478 install.sh %}

### Converting
When using Rspec the only real thing to remember is that there are no assert* or verify* methods.  The reason is that Rspec itself is a testing framework so it will have it own version of assert and verify (in this case should).

The IDE has a great feature in that it converts the HTML test into a rspec test for you.  It isn't a great format, but it is better then nothing and is a good place to start.
{% gist 1151478 selenium.rb %}

{% blockquote %}
The browser being shown is <code>chrome</code>.  This actually means Firefox, not Google Chrome.  For Google Chrome use <code>googlechrome</code>.
{% endblockquote %}

{% blockquote %}
For Safari use <code>safari</code>, but remember that you will need to disable the popup blocker manually and close Safari (for this user) otherwise it will just sit there forever.
{% endblockquote %}

### Remote Controls
A remote control is what Selenium uses to execute the test.  The IDE comes with it built-in, but it is tied to FireFox.  To use IE, Safari, or Chrome you need to download the remote control software: <a href="http://seleniumhq.org/projects/remote-control">http://seleniumhq.org/projects/remote-control</a>.  This software is just a Java server that opens your machine on port 4444 (by default) to allow Selenium clients to run tests.  Each client gets its own browser instance to run the tests in.

{% blockquote %}
The server must be run by a user that has access the browser and has a screen to render to.
{% endblockquote %}

{% blockquote %}
Firefox will only run a single profile per user.  If you need to run Firefox concurrently on the same machine you need to fake a second profile.  Don't do it, just create a VM; you will be happier.
{% endblockquote %}

{% blockquote %}
Google Chrome does not works on OS X.  This is because OS X doesn't add application executables to the path, and the server code isn't smart enough to use the executable directly.  The fix is supposedly <a href="http://groups.google.com/group/selenium-users/browse_thread/thread/7205089285e92973?hide_quotes=no&amp;fwc=1">here</a>, but I was not able to get it to work.  If I do I will probably write another blog entry and link it here.
{% endblockquote %}

### Putting it all together
By default RSpec provides no runner code and the code the IDE produces is not standalone.  This is not a problem since installing RSpec into a rails app installs script/spec.  I have copied the runner code here so make it easier.
{% gist 1151478 runner.rb %}

I am going to assume the RSpec runner code is called spec and the test file is called test.rb.  To run this test from the command line do the following:

``` ruby
ruby spec test.rb
```

Assuming you followed all the steps the test should have opened Firefox, executed a page, run the tests, closed Firefox, and returned the results.  Now you can add more tests and have Selenium execute them.

## Related Research

1. Using Selenium Grid
1. Using Chrome, or IE
1. Using a Grid to run the same test in all browsers on all OSs
