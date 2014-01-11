---
layout: post
title: "RBAC in Ruby"
date: 2014-01-10 15:07
comments: true
toc: true
categories: 
  - ruby
  - howto
---

RBAC stands for *Role Based Access Control*.  It is basically a means to programmitically configure access rights without hardcoding.

The full details are [here](http://en.wikipedia.org/wiki/Role-based_access_control), but to be honest I don't fully understand it as writen.  What I understand of it is from trial and error.

This entry is an attempt to codify that understanding and apply it using the ruby language.

<!-- more -->

## Basics ##

The inputs to the policy are:

1. User or Actor
1. Action being performed
1. Resource being acted on

<pre>
    +-------------------------------------------------------+
    | +-------+                                +----------+ |
    | |       |            +------+            |          | |
    | |  User |+---------->|Action|+---------->| Resource | |
    | |       |            +------+            |          | |
    | +-------+                                +----------+ |
    +-------------------------------------------------------+
                               +
                               |
                               v
                            +------+
                            |Policy|
                            +------+
                               +
                               |
                               v
                          +---------+
                          |Yes or No|
                          +---------+
</pre>

## Policy ##

The policy is where the business logic goes.  It can be as simple as a set of Ruby classes that simply return values, or it can be as complicated as ActiveDirectory.

The players are:

1. Role - collection of permissions bound to a user
1. Permission - an answer which is limited to a resource and action

Here is the basic flow of a permission:

<pre>
    +------+            +------+             +------------+
    | User |+---------->| Role |+----------->| Permission |
    +------+            +------+             |------------|
              Has many            Has many   | Resource   |
                                             | Action     |
                                             | Allowed?   |
                                             +------------+
</pre>

A user can have 1 or more roles.  Each role can have 1 or more permissions.  Each permission associates an action on a resource with an answer.  Either the user is explicitly allowed or explicitly not allowed to access the Resource.

*Note:* I have purposely kept the data model simple.  In more complicated setups there can be several levels of permissions, permissions can have filters, and/or permissions can be directly bound to a user (instead of being bound to a role).  These complications are often introduced to deal with edge cases which are outside the scope of this article.

### Policy logic sample code ###

Once the actors are known the logic is easy.  Simply filter in only the permission on a user for the resource and action in question then "and" all permissions together.

```ruby
class Policy

    # returns true if the user *can* perform action on resource, false otherwise
    def allowed?(user,action,resource)
        reduce_permissions list_permissions(user,action,resource)
    end

private

    # returns an array of filtered permissions
    def list_permissions(user,action,resource)
        perm = user.roles.inject([]) do |array,role|
            array.concat role.permissions.for(resource).with(action).compact
        end
    end
    
    def reduce_permissions(perm_array)
        return implicit_allow if perm_array.empty?
        
        perm_array.reduce(true,:&&)
    end
    
    # "and", for "or" use ":||"
    def reduce_function
        :&&
    end
    
    # default behavior is NOT to give access
    def implicit_allow
        false
    end
end
```
