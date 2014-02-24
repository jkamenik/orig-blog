---
layout: post
title: "Crafty Timer"
date: 2014-02-24 13:28
comments: true
toc: false
published: true
categories: 
  - JS
  - Crafty
  - howto
---

Crafty JS is a game engine written in Javascript.  Like many game engines there is a main event loop that drives everything.  This is actually a great thing, unless you are trying to use timers.  

Javascript is single threaded but asynchronous.  This means there is no way to "sleep" the main loop.  Instead there is a `setTimeout` function which takes a callback that is called after the timer has expired.  In most JS programs having one or more timers setup via `setTimeout` isn't much of an issue.

In Crafty there is already a main event loop that actually performs the same function and it better fits the separation of background and rendering responsibilities.  Remember that in a game you will have hundreds or thousands of background calculation per second but only 40 to 60 rendering calculations.

With that in mind I created two components: a Timer which does everything in the background, and TimePrinter which is a timer and rerenders the current seconds until the timer expires.

<!-- more -->

Timer
-----

```coffeescript timer.coffee
Crafty.c('Timer',{
  _stopFunc:    null,
  _expireTime:  null,
  _secondsLeft: null,
  
  start: ->
    return if this._stopFunc
    return if this._calculateTime <= 0
    
    self = this
    this._stopFunc = Crafty.bind('EnterFrame', ->
      # a proxy callback which sets the "this"
      self._calculateTime()
    )
    this
    
  stop: ->
    return unless this._stopFunc
    Crafty.unbind('EnterFrame', this._stopFunc)
    this._stopFunc = null
    this
    
  expiresIn: (seconds, autoStart = false)->
    this._expireTime = Date.now() + (seconds * 1000)
    this.start() if autoStart
    this
    
  addSeconds: (seconds, autoStart = false)->
    this._expireTime = Date.now() if this._secondsLeft <= 0
    this._expireTime += (seconds * 1000)
    this.start() if autoStart
    this
    
  _calculateTime: (event)->
    now  = Date.now()
    left = this._expireTime - now
    this._secondsLeft = Math.floor(left / 1000)
    
    this.stop() if this._secondsLeft <= 0
    this._secondsLeft
})
```

`start` starts the timer.  It binds to the "EnterFrame" event and sets up a proxy callback to ensure the "this" variable is maintained during the callback.

`stop` remotes the "EnterFrame" callback thereby detacting it from the timer loop.

`expiresIn` sets up a number of seconds to expire the timer in.  There is an optional second paramter to start the timer loop.

`addSeconds` adds seconds to the existing timer, making it take longer to expire.  If the timer has expired then it behaves like `expiresIn`

`_calculateTime` is the work horse.  It calculates the real time and compares it to the expire time and returns the number of seconds until it expires.  If the current time is greater or equal to the expire time then the timer is considered expired and is stopped.  Stopping the timer removes any useless calculations, speeding up the overall game.

Time Printer
------------

In order to separate concerns I created a separate component to print the number of seconds until the timer expires.  By separating things out I can have a general purpose timer which is displayed many different ways.

This class simply shows the number of seconds left as a string.

```coffeescript time_printer.js
Crafty.c('TimePrinter',{
  init: ->
    this.requires '2D, DOM, Text, Timer'
    this.attr({
      x: 100,
      y: 100,
      w: 200
    })
    self = this
    this.bind('RenderScene',->
      self.render()
    )
    
  render: ->
    this.text ''+this._secondsLeft+' seconds'
})
```

`init` requires the DOM, 2D, and Text components so that I can render text.  It also requires Timer so that it behaves like a Timer.  It also binds to the "RenderScene" event, which just rendering thread.

`render` is the call back called when it is time to render the entity.

Usage
-----

A simple usage might look something like this:

```coffeescript scene/loading.coffee
Crafty.scene('Loading',->
  printer = Crafty.e("TimePrinter")
  printer.expiresIn 10, true
)
```

```html timer.html
<html>
<head>
    <script src="lib/crafty.js"></script>
    <script src="src/components/timer.js"></script>
    <script src="src/components/time_printer.js"></script>
    <script src="src/scenes/loading.js"></script>
    <script>
      window.addEventListener('load',->
        Crafty.init()
      
        Crafty.scene('Loading')
      )
    </script>
    <style>
        body { 
            padding: 0;
            margin:  0;
        }
    </style>
</head>
<body></body>
</html>
```