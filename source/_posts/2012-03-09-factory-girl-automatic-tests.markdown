---
layout: post
title: "Factory Girl Automatic Tests"
date: 2012-03-09
comments: true
categories:
 - factory_girl
 - testing
---

Early in a project I started to use factory girl without fully understanding it. After many months of creating steps like `Given /^(\d+) blog exists$/` and `Given /^the following blogs exist:$/` I started to come up with generic functions that would build those steps.

Stupid me for not checking that factory girl already does something like that. All you have to do is include factory girl's [step_definition](http://github.com/thoughtbot/factory_girl/blob/master/lib/factory_girl/step_definitions.rb) file:

```ruby env.rb
requie 'factory_girl/step_definitions'
```

Once you start using FactoryGirl correctly there are a world of new features that can make your steps both cleaner and more concise. Here are some tips I have found via trial and error.

<!-- more -->

# Tip 1: Do not reinvent the wheel
Factory girl will create steps for all factories that you have register.

```text example_steps.feature
Scenario: Showing example steps
  Given the following blogs exist:
    | name       |
    | first blog |
  Given a blog exists with a name of "first blog"
  Given a blog exists
  Given 41 blogs exist
  Given 14 blogs exist with a description of "Test"
```

# Tip 2: Use association, Do not add more steps then are needed
Factory girlassociation are automatically created before the factory is created and they are automatically linked. It only supports the **belongs_to** behavior, so keep that in mind.

Using the "**Given the following XXX exist**" step you can define attributes, on the theassociation, in the table. If we leave the association out then a default is created. If we define an attribute then it will be found or created using that attribute.

Lets say you have a product and it can belog to a category. You do not need to create a category.

```ruby product_category.rb
class Category < ActiveRecord::Base
end

class Product < ActiveRecord::Base
  belongs_to :category
end

FactoryGirl.define do
  factory :category do
    name 'Foo'
  end

  factory :product do
    association :category

    name 'Bar'
  end
end
```

```text product_category.feature
Scenario: Bad
 Given a category exists with a name of "Foo"
 Given a product exists with a category of "Foo"

Scenario: Good
  Given the following products exist:
    | name | category  |
    | Foo  | name: Bar |
```

# Tip 3: Attaching files via CarrierWave</span>
Since cucumber is a text file it doesn't make much sense for you to define full files in steps. It also doesn't really make sense to embed full file paths in the tests. Instead, you can use a Transient attribute and some code so that in cucumber you define a file name and in the factory it converts to an actual file.

```ruby file_product.rb
class Product < ActiveRecord::Base
  mount_uploader :file, FileUploader
end

FactoryGirl.define do
  factory :product do
    ignore do
      file_name 'small_image.png'
    end
    file { File.open(Rails.root.join("path/to/files",file_name)) unless file_name.blank? }
  end
end
```

```text file_product.feature
Scenario: Products
  Given a product exists
    # 1 product with an included file whose file_name was "small_image.png"
  Given the following products exist:
    | name      | file name     |
    | No image  |               |
    | Big image | big_image.png |
```

# Tip 4: Fixing a circular dependency between two models</span>
Lets say you have a Store model and User model. And a User can both work at and own a Store. If you put associations in both the User and the Store model then each will try to create the other, infinitely. We can reuse the transient method as before to break the circle.

The trick is to avoid defining an association in both factories, but instead use a transient attribute in one factory to simulate the behavior of an association. Also, since transient attributes are not likely to have the same level of sophistication as the associations you should use the association to define the more complex of the two models.

```ruby  user_store.rb
class User < ActiveRecord::Base
  belongs_to :store
  has_many   :stores, :foreign_key => 'owner_id'
end

class Store < ActiveRecord::Base
  belongs_to :owner, :class_name => 'User'
end


FactoryGirl.define do
  factory :user do
    name 'John Doe'

    ignore do
      store_name nil
    end
    store {Store.find_or_create_by_name(store_name || 'Test store')}
  end

  factory :store do
    name 'Test store'

    association :owner, :factory => :user
  end
end
```

```text user_store.feature
Scenario: 2 users named 'John Doe', and 2 stores named "Test store"
  Given a user exists
  Given a store exists


Scenario: 2 users both working at the same store
  Given the following users exist:
    | name     | store name |
    | John Doe | Test store |
    | Jane Doe | Test store |


Scenario: 2 stores both owned by the same person
  Given the following stores exist:
    | name     | owner          |
    | MD Store | name: John Doe |
    | CA Store | name: John Doe |
```

# Tip 5: Fixing a circular dependency between the same model</span>
Let say you have a Category model, and that model can belong to another Category (a tree) then you cannot use an association or you get the same infinite recursion issue as before. Here we can use a transient attribute along with an **after_create** hook to simulate the behavior we want.

```ruby category.rb
class Category < ActiveRecord::Base
  acts_as_nested_set
end

FactoryGirl.define do
  factory :category do
    name 'Foo'

    ignore do
      parent nil
    end
    after_create do |category,attributes|
      unless attributes.parent.blank?
        parent = Category.find_by_name(attributes.parent)
        category.move_to_child_of(parent)
      end
    end
  end
end
```

```text category.feature
Scenario: Has no parents
  Given the following categories exist:
    | name |
    | Foo  |
    | Bar  |
    | Baz  |

Scenario: Nested tree
  Given the following categories exist:
    | name | parent |
    | Foo  |        |
    | Bar  | Foo    |
    | Baz  | Bar    |

  # + Foo
  # |+ Bar
  #  |- Baz
```
