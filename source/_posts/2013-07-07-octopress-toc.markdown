---
layout: post
title: "Octopress TOC"
date: 2013-07-07 14:35
comments: true
toc: true
categories: 
  - octopress
  - js
---

I wanted to add a Table Of Contents (TOC) to some of my longer blog entries.  Here is how I did it.

<!-- more -->

Full credit it due to a google search which turned up this [https://github.com/bmc/brizzled/blob/master/source/_posts/2012-02-04-generating-a-table-of-contents-in-octopress.markdown](https://github.com/bmc/brizzled/blob/master/source/_posts/2012-02-04-generating-a-table-of-contents-in-octopress.markdown).

I followed it to get an idea of what I wanted, but diverged a lot.  What I wanted was:

1. The TOC to be driven by a `toc: true` in the YML front matter of any page
1. The TOC to be the first item in teh sidebar.
1. The TOC to contain only the h2 tags and below (Ignoring the H1 page title)

## 1. Add JS TOC code ##

Download the [jQuery TOC plugin](http://fuelyourcoding.com/scripts/toc/) and move the js file into javascripts directory.

Add the following code to the head.

```html _includes/custom/head.html
<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
<script src="{{ root_url }}/javascripts/jquery.tableofcontents.min.js" type="text/javascript"></script>
<script src="{{ root_url }}/javascripts/generate-toc.js" type="text/javascript"></script>
```

This downloads jQuery from a CDN, loads the TOC plugin and will eventually load our driver code.sa

## 2. Write the driver and trigger code ##

Create the driver code:

```javascript javascripts/generate-toc.js
function generateTOC(heading) {
  var container = jQuery("<section></section>");
  var div = jQuery("<ul id='toc'></ul>");
  var content = jQuery('.sidebar');

  if (heading != undefined && heading != null) {
    container.append('<h1 class="tocHeading">' + heading + '</h1>');
  }

  div.tableOfContents("#content",{startLevel: 2});
  container.append(div);
  content.prepend(container);
}
```

Adjust the footer to trigger the TOC is needed:

```html _includes/custom/after_footer.html
{% if page.toc == true %}
  <script type="text/javascript">
    jQuery(document).ready(function() {
        // Put a TOC right before the entry content.
        generateTOC('Table of Contents');
    });
  </script>
{% endif %}
```

The `page` variable is the YML front mater hash so we can check for `toc` to ensure the trigger code is only included on pages that want a TOC.

## 3. Adjust the generators ##

`rake new_post` and `rake new_page` generate a stub page with some YML head matter so it make sense for me to adjust the generators to incude `toc`.

Just add something like this to the `Rakefile`:

```ruby
task :new_post ... do
  ...
  open(...) do |post|
    ...
    post.puts "toc: false"
    ...
  end
end
```