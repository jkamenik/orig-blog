---
layout: post
title: "Ruby module instance and class methods"
date: 2011-11-21
comments: true
categories:
 - ruby
---

A very common idiom especially when code starts to become complicated is to put functions in modules and mix in that behavior to several classes. And a common expansion is to have a single `include` add both instance and class methods.

<!-- more -->

Here is how to do it:
{% gist 1384045 include.rb %}

`include` is used to add a module's instance methods as instance methods to the including class, but it doesn't traverse sub modules. `extend` is used to add a module's instance methods as class methods to a class.

When a module is `included` it can register a callback which is passed the class that is doing the including. And calling `extend` on the base and passing a submodule will cause it to put those methods at the class level. This causes a chain reaction of loading both instance and class methods using a single `include`.

**Pro Tip**: It is possible to cause the same behavior using `extend` by using the `extended` callback; however, this is not common and `include 'x'` reads better then `extend 'y'`.
