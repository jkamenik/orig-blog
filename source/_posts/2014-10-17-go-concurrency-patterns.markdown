---
layout: post
title: "Go Concurrency Patterns"
date: 2014-10-17 20:57
comments: true
toc: false
published: true
categories:
  - go
  - concurrency
  - patterns
---

One of Golangs strengths is its composibility.  This strength is only useful if you know how to make those composable parts.  That is where patterns are useful.

Golang is concurrent, which is not necessarily parallel.  However, to make things concurrent you have to break thing into automatic steps.  If you are careful in how two step share information then you can easily turn concurrent design into parallel design.  Go channels make this communication stupid simple.

In this post I am going to share what I think are the basis of most other concurrency patterns: The Generator, The Worker, and The Consumer.

<!-- more -->

## The Generator

A generator simply does work and places that work on a channel.  What that means is really up to what is needed but the pattern is:

1. Create a channel
1. Create closure which does work
1. Execute the closure as a goroutine
1. Return the channel

```go
func generateInt() chan int32 {
  // 1. Create a channel
  out := make(chan int32)

  // 3. Spawn a closure
  go func(){
    defer close(out)

    // 2. Do work
    for i := int32(0); i < 100; i++ {
      out <- i
    }
  }()

  // 4. Return the channel
  return out
}
```

## The Worker

A worker takes stuff off an input channel, works on it, and places the result on an output channel.

```go
func enlargeInt(in chan int32) chan int32 {
  out := make(chan int32)

  go func() {
    defer close(out)

    for x := range(in) {
      out <- x*2
    }
  }()

  return out
}
```

## The Consumer

A consumer takes stuff off an input channel and consumes it.  There are two primary way to do this: Blocker and Signaller.

### Blocker

The blocker form simply run the code.  This version is useful if there is a main loop which shouldn't exit until all work is complete.

```go
func printInt(in chan int32) {
  for x := range(in) {
    fmt.Println(x)
  }
}
```

[Here is a full working version.](http://play.golang.org/p/7Iz7kV7soo)

### Signaller

A signaller is actually a varient of the Worker pattern, where the output channel is used to signal the completion of work.

```go
func printInt(in chan int32) chan bool {
  out := make(chan bool)

  go func() {
    defer close(out)

    // Work until the channel is closed
    for x := range(in) {
      fmt.Println(x)
    }

    // Single that I am done
    out <- true
  }()

  return out
}
```

[Here is a full working version.](http://play.golang.org/p/1LIgv1ULDy)
