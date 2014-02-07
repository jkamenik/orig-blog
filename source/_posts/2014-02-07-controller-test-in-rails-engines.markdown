---
layout: post
title: "Controller Test in Rails Engines"
date: 2014-02-07 14:13
comments: true
toc: false
published: true
categories: 
  - rails
  - rspec
  - rails engines
---

Testing a controller that your engine provides is tricky.  But with rspec the easiest way I have found is to follow these 3 steps:

1. Add `type: controller` to the describe block
1. Add `routes { Your::Engine.routes }` block to the top of the tests
1. Add `controller` block to the top

<!-- more -->

For example

```ruby
describe YourGem::UserController, type: :controller do
    routes { YourGem::Engine.routes }
    controller do
      # override controller behaviors here
      def current_user
          @user ||= create :user
      end
    end
    
    describe 'GET index' do
        it 'should work' do
            get :index
            expect(response).to be_success
        end
    end
end
```

Adding `type: controller` forces Rspec to treat this as a "controller" test.  And it will mix in the "controller" object, and REST helpers (get, post, put, patch, delete).

Adding `routes {...}` sets up default routing for the REST helpers, so they can find your controller.  If that is too heavy handed you can pass `use_route` (see below).

Adding the `controller` block forces rspec to create an annoyomous controller double.  I use this to provide default function that the `ApplicationController` from the host app would provide; like `current_user`.

## use_route

Instead of `routes {...}` you could provide the `use_route` param to the REST helpers.  The value is a symbol that constantizes to your Gem's namespace.  You need to provide it every helper (which is why I prefer the `routes` block).

```ruby
describe YourGem::UserController, type: :controller do
    controller do
      # override controller behaviors here
    end
    
    describe 'GET index' do
        it 'should work' do
            get :index, use_route: :your_gem
            expect(response).to be_success
        end
    end
    
    describe 'GET show' do
        it 'should work' do
            get :show, use_route: :your_gem, id: 1
            expect(response).to be_success
        end
    end
end
```

