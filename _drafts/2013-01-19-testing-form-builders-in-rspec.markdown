---
layout: post
title: "Testing Form Builders in Rspec"
date: 2013-01-19 22:23
comments: true
categories: 
  - testing
  - rspec
  - form builder
---

There are a great many form builders which make the tedious forms easier, but you might find that you want to roll your own.  The tool kit has a bunch of form builder examples [here](https://www.ruby-toolbox.com/categories/rails_form_builders).

This post will create a simple form builder by testing the behaviors we want.

<!-- more -->

## Forms

To make a designers life easier it is almost a requirement to wrap form items in `div`s.  So we are going to assume that every label/input combo is wrapped in a div with the class `field`.  Also, for override behaviors we will add the input type as a class, for example: `text_field` or `check_box`.  I know CSS would prefer `text-field` to `text_field`, and if I was creating a gem then I would worry about that; but I don't feel it is a big deal so I am leaving it as is.

And the good idea is to allow for uber configuration by adding the object name and field name to the class structor.

The generated HTML might look something like:

```html
<form>
  <div class="field text_field object_name-field">
    <label ...>Field</label>
    <input type=text ...>
  </div>

  <div class="field check_box_field object_name-field1">
    <input type="hidden"...>
    <input type="checkbox"...>
    <label...>Field1</lable>
  </div>

  <div class="action object_name-submit">
    <input type="submit"...>
  </div>
</form>
```

### CSS

The designers can then give generic behaviors using `.field`, and add overrides with `.field.object_name-field`.

A simple CSS might look like:

```css
.field input {
  /* All input defaults */
}
.field label {
  /* label defaults */
}
.field.object_name-field input {
  /* Override behavior for object_name-field */
}
```

## ERB

The ERB should really be very simple, and in order to follow TDD we should know what it will look like.

```erb
<%= simple_form_for @object do |f| %>
  <%= f.text_field :field %>
  <%= f.check_box :field1 %>

  <%= f.submit %>
<% end %>
```

## Testing using Rspec

### Fake model
When testing generic functionality I like to create a model like object that isn't database bound.

```ruby spec/support/test_form_active_record.rb
class TestFormActiveRecord
  include ActiveRecord::Validations

  attr_accessor :id, :field, :field1

  validates :field, :presence => true

  def persisted?; false end
end
```

### Form helper test
Using a form builder is a simple matter of passing the `:builder => SimpleFormBuilder` option so why not just create a helper that does that for us so that `simple_form_for` just works.  Any test in rspec that ends in "Helper" will have a `helper` object with all the helper functions so we can just test it directly.

```ruby spec/helpers/simple_form_helper_spec.rb
describe SimpleFormHelper do
  before do
    @object = TestFormActiveRecord.new
    @object.field  = 'test field'
    @object.field1 = '500'
  end

  context '.simple_form_for' do
    it 'should be the SimpleFormBuilder' do
      # here we test that the simple_form_for sets the correct builder object
      helper.should_receive(:form_for).with(@object, {:builder => SimpleFormBuilder})

      helper.simple_form_for(@object,{}) do |f|
      end
    end
  end
```


### Form builder test
A form builder requires a view to work, which internally it calls `@template`.  It just happens that the `helper` provided by Rspec is exactly what the form builder is looking for.  So I just add a context to the `SimpleFormHelper` test to make life easier.  Then it is a matter of creating a builder with access to the helper.

When I am testing the form builder I allow it to fully generate the HTML and then I just test the markup.

```ruby spec/helpers/simple_form_helper_spec.rb
describe SimpleFormHelper do
  ...
  context 'builder' do
    before do
      # here we pass the view template (helper) to the form builder.
      @builder = SimpleFormBuilder.new('object_name', @object, helper, {}, nil)
    end

    # now I test only the specific behavior, since I will be blindly using the existing form functions
    context '.text_field' do
      it 'should be an input div' do
        @builder.text_field(:field).should /^<div class="field text_field".*</div>$/
      end

      it 'should be a label then input' do
        @builder.text_field(:field).should /label.*input/
      end
    end

    context '.check_box' do
      it 'should be an input div' do
        @builder.check_box(:field).should /^<div class="field check_box".*</div>$/
      end

      it 'should be an input then label' do
        @builder.check_box(:field).should /input.*label/
      end
    end

    context '.submit' do
      it 'should be an action div' do
        @builder.text_field(:field).should /^<div class="action".*</div>$/
      end
    end
  end
end
```

## The form builder

Now that we know exactly how the form builder should work we can create it.  I add a new directory under app for form builders: `app/form_builders`.  You might do more or less, but the basics are:

1. Inherit from FormBuilder
1. Use `@template` for view related code
1. Use `delegate` for oft used functions
1. Pass off as much as possible to the original FormBuilder

```ruby app/form_builder/simple_form_builder.rb
class SimpleFormBuilder < ActionView::Helpers::FormBuilder
  delegate :content_tag, :tag, :to => :@template

  def text_field(method, *args)
    content_tag :div, :class => ['field', 'text_field', "#{object_name}-#{method}"] do
      label(method,*args) + super
    end
  end

  def check_box(method, *args)
    content_tag :div, :class => ['field', 'check_box', "#{object_name}-#{method}"] do
      super + label(method,*args)
    end
  end

  def submit(method, *args)
    content_tag :div, :class => ['action', "#{object_name}-submit"] do
      super
    end
  end
end
```


## The form helper

As stated before I want to create a helper that sets the `:builder` option.  It is pretty easy to create a helper in `app/helpers`.

```ruby app/helpers/simple_form_helper.rb
module SimpleFormHelper
  def simple_form_helper(object,options = {}, &block)
    options[:builder] = SimpleFormBuilder
    form_for object, options, &block
  end
end
```

Then it is a simple matter of including the form builder into the ApplicationHelper.

```ruby app/helpers/application_helper.rb
module ApplicationHelper
  include SimpleFormHelper
end
```