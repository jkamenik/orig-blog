---
layout: post
title: "JS Unit Testing using YUI"
date: 2010-12-15
comments: true
categories:
 - JS
 - howto
 - testing
---

Ok, Selenium was a partial success that you can read about [here](http://randomsoftwareinklings.blogspot.com/2010/11/learning-selenium.html), but it really was harder then I wanted it to be and it required a lot of setup for only a little bit of testing. I noticed that a project that I use a lot ExtJS uses a modified version of YUI Test. So I converted my Selenium test example to YUI Test.

<!-- more -->

My initial impression was confusion because you have to download the entire YUI 2 suite just get to get the [test tools](http://developer.yahoo.com/yui/yuitest/). Also, when you download the entire suite they are many different copies of the same file in various stages of minification. But following the documentation I boiled down exactly what I needed and threw away the rest. I put all the code for my test [here](https://github.com/jkamenik/yui-test-example) so you can follow along.

You will need the following files from the YUI archive:

* build/logger/assets/logger.css
* build/logger/logger.js
* build/yuiloader-dom-event/yuiloader-dom-event.js
* build/yuitest/assets/testlogger.css
* build/yuitest/yuitest.js

Create an HTML file that includes the css and js files:
{% gist 1151464 index-header.html %}

The HTML will also need to instantiate the test logger and run the test runner global. I bound the test run to a button so I could control when it ran:
{% gist 1151464 index-body.html %}

Now that we have a `YAHOO.tool.TestRunner` we need to add a test that can be run.  Instantiate a `new YAHOO.tool.TestCase` and add it to the TestRunner. All a TestCase needs is a name and a bunch of functions that start with "test". Everything else is automatic. Below is a simplified version of the [full file](https://github.com/jkamenik/yui-test-example/blob/master/test.js).
{% gist 1151464 test.js %}

## Conclusion
Though Selenium is more automated that comes at the cost of being more complicated then testing should be. If I were a team of programmers then sure setting up and maintaining Selenium Remote controls would be a small part of the overall effort, but since I am not a team of programmers I think it is overkill.

What I really need is an easy to run, easy to write, repeatable, unit testing framework in JS. I do the leg work on pointing my various browsers at the html and reviewing the results. When things get big enough that I need to setup a continuous integration server, or I have a QA department, then I will give Selenium another go. For now YUI test is the way to go.
