---
layout: post
title: "Testing Rails in IE though Pow"
date: 2012-09-11
comments: false
---

## My Problem ##

I can't test in IE (but the client wants it to work in IE 7 and IE 8)

<!-- more -->

## My Setup ##

1. A mac - because I need it to work the first time every time
1. [Rails](http://rubyonrails.org)
1. [RVM](https://rvm.io) - because you should be using it
1. PostgreSQL - it is better then MySQL and actually easier to setup after you do it once.
1. [Pow](http://pow.cx) - because it is small, spins up the rails server when you need it and the url looks like http://myhost.dev, not http://127.0.0.1:3000 (some browsers will attempt to look up "localhost" via google search, before asking DNS)
1. TDD
    1. [Cucumber](http://cukes.info) - because it is easier to read integration level testing
    1. [Rspec](https://www.relishapp.com/rspec) - because I like it (it both backs cucumber, and also us the unit testing for models and libraries)
    1. [Capybara](https://github.com/jnicklas/capybara)
    1. [Capybara-webkit](https://github.com/thoughtbot/capybara-webkit) - so the browser is opened headless and doesn't intrupt other work

## My Solution ##

First do everything as normal, since you will be developing faster and only at the END worry about IE.  This is counter to a lot of thinking, but I have found that if you stick to good TDD and are testing using an actual opened browser then the only issue you will end up with are CSS related issues.

### Before you start ###

Since it is likely that you will only have CSS issues it is a requirement that you make the main CSS work on HTML5 compliant browsers.  And add exceptions for the others.

```erb
<%= stylesheet_link_tag 'real' %>
<!--[if IE]>
<%= stylesheet_link_tag 'ie' %>
<![endif]-->
<!--[if IE 8]>
<%= stylesheet_link_tag 'ie8' %>
<![endif]-->
<!--[if IE 7]>
<%= stylesheet_link_tag 'ie7' %>
<![endif]-->
```

### Use a Windows VM ###

Go to https://github.com/xdissent/ievms and install the various IE VMs.  I have not had luck with IE6 and IE7, but IE8 works fine.

```bash
curl -s https://raw.github.com/xdissent/ievms/master/ievms.sh | IEVMS_VERSIONS="8" bash
```

If it fails, just keep rerunning it, or try a different version

#### Boot and wait for driver detection ####

On first boot I usually go in as Admin and let windows detect everything and install all the needed components.  This isn't a genuine version of windows so after 30 days you will be locked out, at which point you just need to revert to the "clean" snapshot.

#### Install the OS extensions ####

For some reason the CD doesn't autoplay for me.  Just enter "d:" in the Start Menu -> Search and then select the installer.

#### Add Fake DNS ####

Pow munges DNS on the Mac so that you don't have to use "localhost".  I actually really like this about Pow and so will remain using it.  The only thing that you need to do is edit the windows Hosts file and add the Fake DNS there as well.

1. Login as the IEUser
1. Start -> Search -> "Notepad"
1. Right click and select "Open as administrator"
1. File -> Open
1. Change URL to "C:\WINDOWS\system32\drivers\etc\hosts"
1. Add the following (change the host names as you need)
    1. "10.0.2.2       myhost.dev"
    1. "10.0.2.2       myhost1.dev"
1. Now open http://myhost.dev in IE and it will work
