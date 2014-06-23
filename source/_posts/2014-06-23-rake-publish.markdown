---
layout: post
title: "rake publish"
date: 2014-06-23 08:29
comments: true
toc: false
published: true
categories:
  - howto
  - octopress
---

Octoblog (the engine behind this blog) uses [Jekyll](http://jekyllrb.com/).  As such, it also supports the `publish` flag.  I a previous post I detailed how I added this feature back to Octopress.  Here I will show you a little rake task to easily publish an unpublished post.

<!-- more -->

## Requirements

For a post to be published I wanted a few things to happen:

1. `published: true` was set in the YAML front-matter
1. `date: <todays date>` was set in the YAML front-matter
1. The file was moved to today.

Here is what I came up with.

```ruby Rakefile
desc "Publishes an unpublished entry by changing its name, updating its internal timestamp, and setting published: true"
task :publish, :pattern do |t, args|
  require 'tempfile'
  require 'fileutils'

  files = Dir[File.join(source_dir,posts_dir,args[:pattern])]
  raise "No files found matching pattern" if files.size == 0
  raise "Too many files match pattern" if files.size > 1

  name_time = Time.now.strftime('%Y-%m-%d')
  file_time = Time.now.strftime('%Y-%m-%d %H:%M')

  file = files.first
  name = File.basename file
  new_name = name.gsub(/\d+-\d+-\d+/,name_time)
  w        = Tempfile.new('publish')

  File.open file do |f|
    scan = false
    f.readlines.each do |line|
      # limit scanning to the YAML front matter
      scan = !scan if line == "---\n"
      unless scan
        w.write line
        next
      end

      line.gsub!(/published.*/,"published: true")
      line.gsub!(/date.*/, "date: #{file_time}")

      w.write line
    end
  end
  w.close

  FileUtils.rm file
  FileUtils.mv w.path, File.join(source_dir,posts_dir,new_name)
end
```

Line 6: I take a argument and get a list of files matching the pattern

Line 7 & 8: I found it was too easy to screw up a pattern and publish too few or too many posts.  For that reason I am explicit about the failure.

Line 15: Calculates its name for today.

Line 16 & 37: Generate a temp file to write to.  I found that bad things happened if you published a post that you wrote the same day.  Solution was to write to a temp file and then move the temp file later.

Line 19 && 22: An inelegant solution to isolating scanning to only the YAML front-matter.

Line 28 & 29: Update the YAML front-matter.
