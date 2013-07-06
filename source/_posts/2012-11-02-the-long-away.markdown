---
layout: post
title: "The long away"
date: 2012-11-02
comments: false
---

## The Reason ##

First, let me apologize to my 3 readers that I have been away for so long.  There are a lot of reasons why I have been gone, but mainly it boils down to how much I hate the blogger interface for dealing with code.

Sure, blogger is a simple platform and does exactly what it says.  Sure, it integrates with google plus, twitter, etc...  Sure, it was easy to configure, setup and deploy.  Sure, it has a lot of features.

But, it sucks for code!  And I mean Sucks!  For code there are a few very specific hot button items that are must haves:

1. Monospaced font and significant whitespace (&lt;pre> in HTML)
1. Line numbers
1. Syntax highlighting

Not that much to ask, but those features are ONLY ever going to be needed by a programmer.  So I can see why they don't get that much attention.

Both the old and the new blogger interface have a way of dealing with this, but it is time consuming and annoying:

1. Use gist.github.com as a dumping place for all your code samples
    1. Create a separate file in the gist for each sample (makes it easier later)
    1. Make sure the file name has the right extension so that syntax highlighting happens
    1. Copy the embed codes for each gist
1. When editing the blog only use HTML mode!
    1. The gist code is a javascript so it will only render in preview
    1. Switching between HMTL and compose sometimes rearranges non-visible items, which means when your page renders your code could be anywhere
    1. If I am going to write raw HTML I might as well use Markdown, which sucks less and converts to HTML
1. Hope that nobody views your blog with JS disabled!

## The Solution ##

After playing with many blogging solution and giving up on Wordpress entirely (Sorry I just cannot get what I want without a LOT of php hacking), I have decided to give a Octopress a serious shot.  I use github all the time and even host a few things using github pages.

In case you don't know, Github pages can render Jekyll sites.  And Jekyll is a blog aware static site generator, which can read markdown.  And Markdown is a much more human friendly markup language then HTML, but compiles into HTML; also, Github uses it everywhere in their site (as do a lot of other places).

So things started to fall into place with Jekyll.  I just needed to install a syntax highlighting gem, and design the site.  In the process, I stumbled across Octopress, which is a wrapper around a Jekyll site, works with github, has syntax highlighting, provides a clean theme, and has a programmer friendly workflow.

So Octopress is the blog engine for me.  And it will reside at [http://jkamenik.github.com](http://jkamenik.github.com).  I will slowly be transferring all my entries from here, but I doubt I will retire this site entirely.