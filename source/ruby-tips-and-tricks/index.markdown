---
layout: page
title: "Ruby Tips and Tricks"
date: 2013-07-04 21:46
comments: true
sharing: true
footer: true
toc: true
---

This is a basic stream of useful ruby information that I aquired over the years.

## Use "p" instead of "puts" ##

`p` works similarly to `puts` in that it print to the screen, but with two useful changes.

1. It prints prints using `inspect`
1. It returns the objects passed in

The following are equivilant:

```ruby
x = "some string"

(puts x.inspect; x)
p x
```

Useful for adding debug inline without changing flow.

```ruby
unless @user.save
  flash.alert = @users.errors.full_messages.join("<br>")
  redirect_to :action => :edit
end

# could be debuged
unless p(@user.save)
  flash.alert = p(@users.errors.full_messages.join("<br>"))
  redirect_to :action => :edit
end
```

## "_" can be used in number ##

Suppose you have the number 10000000000.  Is that 100 Thousand, 1 Million, 10 Million, or 100 Million?

`10_000_000_000` now it is easier to tell

## Use `system` with arrays and env args ##

`system` executes a command in a subshell and returns true/false based on the commands success, but there are several
ways it behaves.

`system 'ls -a'` - DO NOT USE! Executes `ls` using the system shell.  This might cause issues if the shell isn't what you expect it.

`system 'ls', '-a'` - executes `ls` at the kernel level, avoiding the shell entirely.  Using the splat aperator also allows build arguments before use: `system *command`

`env = {}; system env, 'ls -a'` - sets the subcommand to env instead of the current env.

```ruby
env = {'PATH' => '/tmp'}
system env, 'echo $PATH' => "/tmp"
system env, 'echo', '$PATH' => nil, because "echo" is a shell command, not a system command
```

## Awesome `fetch` ##

`fetch` is like the subscript operator, except that it throws an exception if the key isn't found.  Also, you can specify a default value.  It is really useful to ensure that you don't get an unexpected `nil`.

```ruby
{}[:test]             => nil
{}.fetch :test        => raises KeyError
{}.fetch :test, 'foo' => 'foo'
{}.fetch :test do
  'default'
end                   => 'default'
```

This can be useful if you need nested hashes, but are unsure if they exist

```ruby
{}.fetch(:some,{}).fetch(:key,{}).fetch(:nested,'far') => 'far'
```

## `super` without options ##

Most of the time you are going to be find blindly passing the current function's arguments up the ancestory change.  Sometimes you want more control.  Below are some ways to call `super`.

```ruby
class Something < Else
  def blindly_passing_everyting(*args,&:block)
    super
  end

  def forcing_options(*args)
    super('other','options')
  end

  def sending_no_options(*args)
    super() # the parens are very important
  end

  def sending_nothing(*args,&:block)
    super(&nil) # the &nil is very important
  end
end
```

## `Struct`ing ##

If you have a container class - that is a class whose primary role is to collect data - then `Struct` might be perfect.  Also, you can use a special trick of constant assignment in ruby to make a class.

```ruby
Point = Struct.new :x, :y
p1 = Point.new 1, 2
p2 = Point.new 1, 2
p1 == p2                   => true
p3 = Point.new 1, 3
p1 == p3                   => false
p1.class                   => Point
```

## Inline rescue ##

Lets says you have a line that might throw an exception which you don't care about.  So long as the exception is a subclass of `StandardError` you can do the rescue inline.

```ruby
# somewhere "user" is set to nil

user.name                  => NoMethodError raised
user.name rescue 'Unknown' => 'Unknown'
```

## Lambda vs. Proc vs. Block ##

First, a block is a Proc.  And a proc retains the calling context.  For that reason it can access variables in the current space, but it also means that "return" will end the current context entirely, not just the block.

```ruby
def test
  var = 'foo'
  [1,2,3].each {|x| puts var; return if x == 2}
  puts "never printed"
end => prints "foo" twice
```

Lambdas is a kernel method that creates an unbound Proc and checks the argument list.  If you are planning to pass around a callable object use a Lambda.

## Threequal ##

This is ruby's smart check operator.  It is also the operator that is used by case statements.  And more interesting still is that Proc aliases `###` to `call`.  This means that you can do advanced testing with lambdas in case statements; just remember to return true or false.

```ruby
success = lambda {|http| (200..299) === http.response_code.to_i}
case response
when success then puts 'Worked'
else puts 'Failed'
end
```