---
layout: post
title: "Using &amp;&amp; instead of if"
date: 2014-09-21 20:39
comments: true
toc: false
published: false
categories:
  - ruby
  - programing
---

You can use `&&` to perform a logical `if`.  And there are a few reasons it may be better to use `&&`.

If I was a Computer Scientist I might pull out logic maps or Turing completeness or do a mathematical proof.  If I was a Computer Architect I might argue that I do not need to prove anything and you should trust my experience.  Luckily I am a Software Engineer, so I will prove my point with tests.

<!-- more -->

Lets take `if a then b`.  The entire purpose of the `if then` it to only execute `b` if `a` is true.  If I were to write it using tests I might do it this way:

```ruby
require 'spec_helper'

describe "if then" do
  class Test
    def a; end
    def b; end

    def if_then
      if a
        b
      end
    end
  end

  let(:t) {Test.new}

  it 'executes a' do
    expect(t).to receive(:a).and_return false

    t.if_then
  end

  it 'executes b if a is true' do
    expect(t).to receive(:a).and_return true
    expect(t).to receive(:b)

    t.if_then
  end

  it 'does not execute b if a is false' do
    expect(t).to receive(:a).and_return false
    expect(t).not_to receive(:b)

    t.if_then
  end
end
```

These tests pass.  So, I will make no change to the tests.  But, I will refactor the Test class to use `&&`:

```ruby
class Test
  def if_then
    a && b
  end
end
```

These tests also pass!  And you are probably thinking that I duped you somehow.  Let me explain why this works.

Logical `and` (&&) and logical `or` (||) can both be short circuited; meaning that if a certain condition is met they can immediately return a value without needing to execute more statements.  For `and` if any value is `false` then the entire statement is false.  So the first time the program sees a `false` value it can return.  For `or` the first `true` causes `true` to be returned.

The actual execution for `a && b ` is as follows:

1. Execute a
1. if a is false return false
1. if a is true Execute b

If you look carefully that is identical to the execution path of `if a then b`, which is why all the previous tests pass without modification.

## if not then

Just like `&&` maps to `if then`, `||` maps to `if not then` or in some lanugages like ruby `unless then`.  I leave it as an exercise for the reader to write the tests, but the code is as follows:

```ruby
class Test
  def if_not_then
    a || b
  end
end
```

## if then else

`else` is just the `if not` case.  Since, `||` is eqivilant to `if not` we can chain it after `&&`.

```ruby
class Test
  def if_then_else
    # if a then b else c
    a && b || c
  end
end
```

## Why is this useful?

For some reason many languages can execute `&&` and `||` a lot faster then `if then else`, but I very rarely consider performance a good excuse for crappy looking code.  I have some simple reasons to use `&&` instead of `if`:

### 1. You are chaining actions

If the things that you are chaining are actions being performed and those action return weather they were successful then it often reads better as `&&`.

```ruby
# bad
paint_it_black if find_a_door

# good
find_a_door && paint_it_black
```

### 2. You are likely to chain additional items

Once you nest logic then readability goes out the window.  Using `&&` helps.

```ruby
# bad
if column_a_is_a_string
  if column_b_is_a_number
    if not column_c_is_a_boolean
      raise 'Bad'
    end
  end
end

# good
column_a_is_a_string &&
column_b_is_a_number &&
column_c_is_a_boolean ||
raise 'Bad'
```

### 3. You don't know how many items you need to chain

Sometimes you need to parse a file of conditionals, or will be given a list of conditionals.  Most of the time you cannot ensure that there are only two items on the list, so the `if then` contract is not useful, but a variant of `&&` will work.

```ruby
[a,b,c].each do |x|
  y = x.call

  # short circuit the first success
  return y if y
end
```
