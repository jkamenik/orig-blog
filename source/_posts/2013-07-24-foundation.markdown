---
layout: post
title: "Foundation"
date: 2013-07-24 20:34
comments: true
toc: true
categories: 
  - UI
---

[Foundation](http://foundation.zurb.com/) is a UI library which aims to simplify design by starting with a responsive library.  It is very similar to Twitter Bootstrap, but since it uses SCSS it should fit better within Rails.

The demo for what I have done is [here](http://jkamenik.github.io/waterfall-foundation)

<!-- more -->

It would be accurate to say that I have a little crush on this framework.  In my day to day I have to deal with Drupal Designers.  They are not bad people to be sure, and the designs they come up with are great.  But there is no structure to what they provide.  They are painting using waterfall colors on a still pond.  The stuff they come up with is amazing, but if you do anything but look at it all is lost.

Foundation is an apt name because it offer an underlying structure to design.  It has opinions, but as a Rails guy I am used to that.  More importantly the opinions are those of designers, but with a structure that resonates with developers.  So not being a designer I can still develop a decent UI.

## The downside ##

First the downside, it doesn't support IE lower then 8 and only partially supports IE8.  That isn't a huge issue for me, but it does make it difficult to use commercially.  Other then that I don't see any issues.

## The grid ##

Foundation uses a 12 column grid system to control the layout of elements.  12 is great measure because it divides by 2, 3, 4, and 6.  It also supports the nesting of grid rows within columns.

### Large / Medium / Small ###

When defining columns you can give it a span by adding the column count like "large-9".  Just so long as counts add to 12 everything works.  But what is awesome is that each column can be different based on screen size.

```html
<div class="small-6 medium-7 large-9"></div>
```
    
This causes the div to be 6 columns when the screen is small, 7 for medium screens, and 9 for large screens.

### Push / Pull ###

Add "push-X" cause a column to pad left by the number of columns.  "small-9 push-3" means the column is 9 wide and moved over by 3 columns, basically making it the last column even if in the html it is first.

"pull-X" does the opposite and moves a column to the right.

```html
<div class="small-9 push-3">Last on screen, first in HTML.</div>
<div class="small-3 pull-9">First on screen, last in HTML.</div>
```

### Show / Hide ###

Adding "show-for-X" will cause the div to be hidden unless the screen is the correct size.  There is a "hide-for-X" as well.

```html
<div class="show-for-small">Shown only if small</div>
```

## Semantic HTML ##

Foundation uses semantic HTML in order achieve a responsive design.  And hence why IE7 and below are not supported and IE8 is only partially supported.  But semantic HTML plays very well with the mobile web and makes the HTML easier to code and maintain.

## The Widgets ##

Along with the opinions come standardized UI widgets.  It isn't on the same level as a GUI toolkit like ExtJS, but all the basic HTML behaviors are there plus a lot of other nice items.

### Navigation ###

A "nav" element acts as a standard menu with dropdowns on a desktop.  In a mobile browser it becomes a set of clickable links that sweep left.

```html
<nav class="top-bar">
  <ul class="title-area">
    <!-- Title Area -->
    <li class="name">
      <h1><a href="#">Top Bar Title </a></h1>
    </li>
    <!-- Remove the class "menu-icon" to get rid of menu icon. Take out "Menu" to just have icon alone -->
    <li class="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
  </ul>

  <section class="top-bar-section">
    <!-- Left Nav Section -->
    <ul class="left">
      <li class="active"><a href="#">Main Item 1</a></li>
      <li class="divider"></li>
    </ul>
  </section>
</nav>
```

### Panels / Flash ###

These can be used to display a "block" of text.  They have some standard highlights like "alert" which makes them good for flash messages.

```html
<div class="panel">
  <!-- Content here -->
</div>

<div data-alert class="alert-box">
  <!-- Your content goes here -->
  <a href="#" class="close">&times;</a>
</div>
```

### Joyride ###

A joyride lets you highlight elements on the page with some descriptive text.  It is as simple creating a unordered list with the class "joyride-list".

```html
<ol class="joyride-list" data-joyride>
  <li data-id="firstStop" data-text="Next">
    <p>Hello and welcome to the Joyride documentation page.</p>
  </li>
  <li data-id="numero1" data-class="custom so-awesome" data-text="Next">
    <h4>Stop #1</h4>
    <p>You can control all the details for you tour stop. Any valid HTML will work inside of Joyride.</p>
  </li>
  <li data-id="numero2" data-button="Next" data-options="tipLocation:top;tipAnimation:fade">
    <h4>Stop #2</h4>
    <p>Get the details right by styling Joyride with a custom stylesheet!</p>
  </li>
  <li data-button="Next">
    <h4>Stop #4</h4>
    <p>It works as a modal too!</p>
  </li>
</ol>
```

### And many more ###

Look at the [kitchen sink](http://foundation.zurb.com/docs/components/kitchen-sink.html) for a list of all the widgets that you get.