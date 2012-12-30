---
layout: post
title: "CI server using Firefox"
date: 2011-11-30
comments: true
categories:
 - continuous_integration
 - ci
 - testing
---

If you are like me, you always setup a CI to ensure things that you already finished are not broken by things you are currently doing. And if you are like me, you use [capybara](http://github.com/jnicklas/capybara), [selenium-webdriver](http://github.com/lanej/selenium-webdriver), and [firefox](http://www.mozilla.org/en-US/firefox/new/) to actually test the results in a browser. The rub comes when the CI server (running headless) needs to run firefox, which needs a screen.

Virtual Frame Buffer (xvfb) is a great package. All it does is provide an X11 interface in memory instead of requiring a screen. Below I detail what I do on Ubuntu, but it should work the same on any Linux distro.

<!-- more -->

### Installing Firefox
{% gist 1409172 install_firefox.sh %}

### Testing Firefox
{% gist 1409172 test_firefox.sh %}

Once firefox is installed it can be tested on a X11-forwarded ssh connection. X11-forwarding has to be enabled on the server and client and can be tested by checking `DISPLAY`.

### Installing Xvfb
{% gist 1409172 install_xvfb.sh %}

### Testing Firefox again 
{% gist 1409172 test_firefox_again.sh %}

The easiest way to test is to use image magick to take a screen shot of the VFB and save it to an image that can be opened in Firefox. If the image opens and it looks like a firefox browser is running on the google page then you did it correctly.

### Create a xvfb startup script
{% gist 1409172 xvfb.sh %}

On ubuntu no start script is provided, but a simple one put in `/etc/init.d/xvfb` is enough.

### Getting the CI server to use the VFB
At this point getting a CI server to use Xvfb will depend on how it is started. If you use the Xvfb startup script then the display is `:1`. All you have to do is `export DISPLAY=:1` before the CI server starts.
