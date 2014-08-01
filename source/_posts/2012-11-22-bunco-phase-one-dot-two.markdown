---
layout: post
title: "Bunco Phase 1.2"
date: 2012-11-22 21:55
comments: true
categories:
  - bunco
  - phase1
---

This is just a slight addendum to the [Bunco Phase 1]({%
  post_url 2012-11-21-bunco-phase-one %}) Post.  After having used the score card in several games there are a few issues that arise with the existing layout.

1. Input is cumbersome
1. The interface is SLOW!
1. Cannot correct screw ups

<!-- more -->

## Cumbersome input

It is hard to tell how well a design is going to work without actually using it.  When we actually started to use it we noticed that it was too difficult to keep track of whose turn it was and it really slowed down the game.  This is exactly the opposite of what using the phone as a scorecard should be.

The major reason for the slow down is that we maintain the player turn state in the app.  More specifically I _force_ the management of whose turn it is.  I had done this as a way of saving space, but when implemented it sucked.

I redesigned things a bit to include score buttons for each player.  But in order to fix the buttons I had to lose the header and refresh button.

{% img /images/bunco/ScoreBoard_2.png %}

## Slow!

Between clicking a score button and seeing the score applied and being able to click the button again was at least 1 second.  Not huge if you only need to enter a small number of inputs.  But a long game can take up to 246 inputs ((21 + 20)*6).  So in just the inputs it takes more then 4 minutes!  The problem is that rolling the dice is very quick with a long game being less then 2 minutes.

I used the Safari profiler and it was very clear that 99% of the total time was in repainting the view.  I use Backbone to get the events and a simple MVC, and as such you would expect it to refresh the view using the new data.  Specifically _all_ the time was taken after triggering the "create" event.

The template that repeats for each round is:

```html
    <script type="text/template" id="round">
        <div data-role="collapsible" data-collapsed="<%= !active %>">
            <%
            var person = "";
            if(active){
                person = "(P"+player+"'s turn)";
            }
            if(complete){
                person = "(P"+player+" wins)";
            }
            %>
            <h3>Round <%= round_number %> <%= person %></h3>
            <div class="ui-grid-a">
                <div class="ui-block-a">
                    <%= p1_score %>
                </div>
                <div class="ui-block-b">
                    <%= p2_score %>
                </div>
            </div>
        </div>
    </script>
```

The view is:

```javascript
  score_card.RoundListView = Backbone.View.extend({
    initialize: function(){
      this.template = _.template($("#round").html());
    },

    render: function(){
      var dom      = this.$el;
      var template = this.template;
      dom.empty();

      this.collection.each(function(round){
        dom.append(template(round.toJSON()));
      });

      // needed for jquery to rerender dom
      dom.trigger('create');  // Massive time sink, 99% of rendering time

      return this;
    }
  });
```

When any record is changed I rerender the entire page.

```javascript
rounds.on('change',function(model){view.render()});
```

### Find and replace, instead of rerender

Rerendering shouldn't really be an issue, but it turns out that jQuery Mobile does a huge amount of DOM pollution, which is hugely expensive.  It would be much faster if we could just find and replace single items and regenerating the entire page.

I changed the template to include more IDs to making finding items faster and easier:

```html
    <script type="text/template" id="round">
        <div data-role="collapsible" id="round<%=round_number%>" data-collapsed="<%= !active %>">
            <%
            var person = "";
            if(complete){
                person = "(P"+player+" wins)";
            }
            var p1_score_id = "p1_r"+round_number;
            var p2_score_id = "p2_r"+round_number;
            %>
            <h3>Round <%= round_number %> <%= person %></h3>
            <div class="ui-grid-a">
                <div class="ui-block-a">
                    <span id="<%= p1_score_id %>">
                        <%= p1_score %>
                    </span>
                </div>
                <div class="ui-block-b">
                    <span id="<%= p2_score_id %>">
                        <%= p2_score %>
                    </span>
                </div>
            </div>
        </div>
    </script>
```

I added a find and replace method to the view:

```ruby
  score_card.RoundListView = Backbone.View.extend({
    //same as before

    findAndReplace: function(round){
      var player   = round.get('player');
      var complete = round.get('complete');
      var number   = round.get('round_number');
      var p1_score = round.get('p1_score');
      var p2_score = round.get('p2_score');

      this.$el.find("#p1_r"+number).html(p1_score);
      this.$el.find("#p2_r"+number).html(p2_score);

      if(complete){
        this.$el.find('#round'+number+' h3 .ui-btn-text').html("Round "+number+" (P"+player+" wins)").trigger('collapse');

        // when chaging a header and mark the winner we have to repaint the entire page.
        this.$el.trigger('create');
      } else {
        // if not complete just make sure the item is expanded
        this.$el.find('#round'+number+' h3').trigger('expand');
      }
    }
  });
```

Then I just need to change the on change event to find:

```javascript
rounds.on('change',function(model){view.findAndReplace(model)});
```

## Screw ups

Adding points to the wrong user happens, and for the time being I still don't have a good answer.  But then again there are a lot of design changes to be tested before we try to tackle this.  It is hard to tell if this will even be an issue now.
