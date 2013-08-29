---
layout: post
title: "Using Keynote for Mockups"
date: 2013-08-29 08:47
comments: true
toc: true
categories: 
  - ui mockup
  - howto
  - keynote
---

There are a lot of UI mockup software out there.  I am sure they are good, but chances are that you already have exactly what you need.  I used to ominigraffle, which was fine.  And I know people that use Visio.  And there are a ton of UI Mocking software out there that costs a ton.

However, I have found presentation software (specifically Keynote) already has all the features you need for a good UI mockup.

Features of Keynote:

1. Almost everyone knows how to create a presentation
1. $20 on the app store (that is not a sales price)
1. Presentation ready
1. Master slides, which allows
    1. Crafting static backgrounds
    1. Text placeholders
    1. Custom guidelines
1. Hidden slides
    1. Allows for templating common items, but not showing them in the presentation
1. Clickable elements
    1. Allows simulating of a working UI.

<!-- more -->

Here is my step by step for creating UI mockups.

## 1. Use pen and paper ##

Paper and Pen are the fastest way to get your ideas out of your head.  The other good thing about pen and paper is that you are not nessissarly constrained by UI medaphores built into a computer.  If you are trying to think of a better way to do something using a computer that is subtly forcing your into common UI patterns then that is the direction you will head.  You will not end up with anything better then before and you will likely have wasted a lot of time doing it.

Paper is supposed to be fast, not perfect.  So only use standard printer paper and a black pen.  Nothing more.

### 1.1 Paper layout ###

Fold the paper like [this]({{ root_url }}/images/paper_in_8s.jpg).

This gives you 16 slides to play with (8 on each side).  Also, it roughly simulates landscape and portrait layout of a screen.  I recommend sacrificing one slide with a orientation arrow (point to the top of the sheet) and short title.  Definitely not a requirement, but it helps when you come back to these slides after a week.

### 1.2. The shotgun ###

Take part of the UI metaphor and shotgun different ideas on all 16 slides (15 if you want to keep a title).  Spend no more then 10minutes on it, or about 35s / slide.  All you are trying to do is come up with ideas on what might work.

After that spend some time on each slide deciding what does and does not work.  Cross out the complete failures.  Circle things you like.

Repeat this as much as you need to.

### 1.3 Story-board ###

If you are creating a multipart UI then take everything that worked and story-board out the progression.  Use only the elements that worked.  You might find that when story-boarded things, that you thought would work, don't work.  There is not harm shotgunning some new ideas.

Each state of the UI is a single slide.  For example, if I am looking to demo a warning message when a user checks a checkbox then I would draw one frame with the button unchecked and no warning, and another with the button checked and a warning.  You can fill in the rest of the slides with other states or you can leave them blank.

### 1.4 The reveal ###

Don't give a formal presentation.  Just show your slides and explain what you are trying to do.  Ideas will fly, so take notes.

One of two things will happen during the reveal: 1) the ideas are fine, but need a little work.  Or 2) everything about the idea is wrong.  If there are only minor tweaks then I recommend **not** redoing anything paper and instead moving on to more formal design.

If everything is wrong then stop now.  No harm, no foul.  You either didn't have enough to go on, or your ideas weren't clean.  Either way you only spent 10 to 20 minutes on something that was likely to fail anyway.  It probably best if the project is scrapped or rethought.

### How do I share paper with remote workers? ###

Good question!  That is why white paper without lines, and a blank pen are so important.

You share the document by scanning it with a scanner (if you work in an office) or you take a picture of it with your smart phone!

## 2. Setup a master document ##

Keynote isn't really meant for everyone to edit at the same time.  But you can create a master document which you share with the team so that everyone is on the same page.

1. Start by creating a new document with the "White".
1. Open the "Master Slides" menu: View -> Show Master Slides
1. Delete all the master slides except "Title & subtitle" and "Blank"
1. Fill out the title slide

## 3. Template common elements ##

At this point you should have a rough set of slides or a story-board and the basic master document.  You may have 10s or 100s of slides that need to be converted to digital, but before any of that create common UI elements.

[http://keynotopia.com/](http://keynotopia.com/) and things like it can be purchased to augment your UI collection.  Copy over or create the UI elements that are present in your story board.

Once you have a good set of common UI elements in one or two slides mark them skipped slide: Slide -> Skip slide.  This will let you later copy and paste elements but skip the slide during presentations.

## 4. Create common backgrounds (using master slides) ##

Just like creating common UI element, creating master slides lets you quickly throw together backgrounds.  More importantly editing the master slides causes every slide to update.

A master slide is just like a normal slide except that it can be used as the base for other sides.  For that reason anything that you put in a master side is not editable in a normal slide.  The exception is text which can be marked as a placeholder and changed in the slide.

I recommend building master slides in the following manner.

### 4.1 Background object ###

As a standard slide you can put any objects including shapes, and text.  The rule of thumb is to start with a recognizable background.  For websites that means creating something that looks like a web browser.  For a iPhone app create the outline of an iPhone.  For a computer program create common window.

Since these objects aren't editable in slides you may find that you create quite a few master slides with different aspects of the project.  That is a good thing.  You master slides will ballon as your design balloons, which is another form of feedback.

**Tip**: You may also want to create a slide that simulates scrolling to the middle or bottom of the page.  Just add a right scroll bar to the right at different positions: top, middle, bottom.

### 4.2 Guides ###

Once you have the master slide objects in place you will notice that the center of the usable area will not be centered the center of the slide.  This makes it difficult to position things on slides in a consistent way.  To make it easy again add guides.

Show the rulers: View -> Show Rulers.  Then grabbing the top ruler and dragging down will add a horizontal guide.  Grabbing the left ruler and dragging right will add a vertical guide.

**Tip:** I add guides on the edges (like the sides of the iPhone screen).  Then I add guides in the middle.  Sometimes I will also add guides at the golden mean, or thirds, but never both at the same time.

### 4.3 Placeholders ###

Any text box can be a placeholder which means that the text can be modified on the slide.  When doing a website I make the browser title and URL bar a placeholder.

To create a placeholder first add a "Text box", place it where you want, and give it a good default value.  With the item selected open the **Inspector** and go to the *Master Slide* tab.  Check "Define as Text Placeholder" and give it a unique name.

A slide can modify a placeholder in any way it needs to.  This includes changing size, position, or even deleting the item entirely.  But it is a really good way to add quickly configurable defaults.

## 5. Create UI (using slides) ##

With the master slides and templates in place it is a simple matter to create slides.  A slide should contain no more then would fit on a single screen; remember presentation slides don't scroll.  If you need a multipage slide split it over 2 or 3 slides.

Do not try to make the screen interactive.  That is not the purpose of a presentation.  Stick with duplicating the paper slides.

## 6. Create interaction (using clickable items)  ##

You could stop at step 5 and give a pretty great presentation, but sometimes you really want to take things over the top.  Keynote allows you to make objects hyperlinks, which can link to another slide, a webpage, or another presentation.

In the design view there is a visual clue that the item is clickable, but not during the presentation.  And since hyperlinks can jump forward or backwards in the presentation this feature can get you into a lot of trouble.  It is very important that the entire presentation be closed to finished before adding hyperlinks.

**Tip:** To help you stay out of trouble, duplicate a slide and only change one item.  Then link from the first slide to the second in a way that makes sense, and be sure to link from the second back to the first.  Resist the urge to have the second slide link anywhere but to the first slide.

## 7. Don't Add details ##

You can spend hours adding details which will either need to be completely removed and redone or will be ignored.  The goal is to provide enough fidelity to be useful but not enough detail to reach the "uncanny valley" of sorts.  If the fidelity of the design is too high then people start picking apart the details, and stop thinking about the presentation.

### Uncanny Valley ###

This is a term borrowed from the field of human aesthetics that states "[it] is the region of negative emotional response towards robots that seem 'almost human'".  See the [wikipedia article](http://en.wikipedia.org/wiki/Uncanny_valley) for details.

The issue doesn't stop with humans judging humans, it takes place anytime a human judges something that seems familiar.  Especially computer programs.  Basically, as we add detail there is a point right before "perfect" which is so bad that it is worse then if stopped at the hand drawings.

1. Nothing -> neutral
1. Drawings -> good
1. Keynote -> better
1. Keynote with details -> **HORRIBLE!!!!**
1. Actual implementation -> best

