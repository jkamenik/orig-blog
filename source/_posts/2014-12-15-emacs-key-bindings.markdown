---
layout: post
title: "emacs key bindings"
date: 2014-12-15 21:09
comments: true
toc: false
published: true
categories: 
- emacs
- howto
---

I recently switched to Emacs as my editor of choice.  It has taken a bit of work to get it to where I like it.  My full settings are on github [here](https://github.com/jkamenik/.emacs.d).

In this post I will share how I added a key binding to only a single mode.

<!-- more -->

A key binding is just maps a key sequence to a lisp function.  A global key binding can be added in the following way:

```lisp
(define-key global-map (kbd "C-/") 'comment-or-uncomment-region)
```

This causes a key sequence to be added to a map.  The `global-map` contains the global key bindings regardless of mode.  This is only useful if the command makes sense in all modes.  In a lot of cases keys should only be bound to a mode.

Each mode has its own map which emacs only uses when you are in that mode.  This is how you add mode specific key bindings.  The map for any mode is the mode name with "-map" added.  You will need to have the mode loaded for the map to exist.

The following will add Agenda mode to OrgMode, which is off my default.

```lisp
(require 'org)
(define-key org-mode-map (kbd "C-ca") 'org-agenda)
```
