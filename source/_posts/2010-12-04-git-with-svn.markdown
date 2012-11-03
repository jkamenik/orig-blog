---
layout: post
title: "GIT with SVN"
date: 2010-12-04
comments: true
categories:
 - howto
 - git
 - svn
---

Normally, I would just use GIT without a bridge to another control system, but many companies use SVN.  There are just so many benefits to using GIT that, for me, I am going to use it if there is a bridge to repository type the company uses.  I certainly don't hate SVN or CVS or Perforce, but GIT allows me to work the way that I know I am most productive; which is commit early, commit often.

What I mean by commit early, commit often is that I commit even if I only have part of the solution. As I find the other parts of the solution I commit those as well. That way when I am 2 or 3 days into a fix I already have the commit messages saved in GIT, so I don't have to remember what I did for those 2 or 3 days. When the solution is shippable only then do I push it up to the company's repository.

## Benefits of GIT include:

1. Being able to share non production ready code (Peer to Peer)
1. Being able to have many local branches
1. Being able to logically group commits (via local branches) and push all at once
1. Fantastic branch switching/merging
    1. Rarely will you ever have to fix a merge conflict yourself
1. Rebase as well as merge
    1. Rebase is SVNs style of linear commits
    1. Merge is non-linear and tries to keep commits sequentially ordered by date.  So if two branches are merged and both were actively worked on then the commits are intermixed.  (makes a lot more sense in practice then in writing)

With GIT's power comes a little bit more complexity, and here I will detail the method that I have developed over months of fits and starts.  That way you can experience the benefits of using GIT for day to day work, but still use SVN when dealing with corporate.

## Settings up the SVN Bridge
You can have GIT manage an entire SVN repository, branches and all. However, for GIT to do this it must checkout every revision of the SVN repo. This can be very painful when there are a lot of commits. Instead I recommend only managing a single branch starting a specific revision near HEAD. You will lose history older then that revision, but it does save a lot of time for large SVN repositories.

For the below example I am going to assume we have a standard SVN repository at http://example.com/svn, the latest revision is 400, and the SVN username is test.

Find the latest revision of the repository:

``` bash
svn log http://example.com/svn/trunk | head
```

The latest revision will start with an "r" and be within the first 5 lines.

Setting up a git repo:
``` bash
git svn init --username=test http://example.com/svn/trunk dev
git svn fetch -r 400
```

Now you have a local GIT repo in dev that is synced to SVN trunk at revision 400. And when you `git svn dcommit` the user `test` will be used.

## Always work in a branch

In my company before anything is allowed to be checked into SVN it must go through a peer review.  In any given day I might work on 2 or 3 bugs/tasks.  For each, I create a GIT branch with the bug/task ID and work there.  When I am done I use `git log -p` to list the diffs that I submit for review. Then I move on to the next item, while the fix is being reviewed.  When the first bug/task is reviewed and accepted I jump back to master, rebase it, jump to the branch, rebase master, jump back to master and merge the branch, and finally svn dcommit everything.  After I mark the bug/task complete I also delete the branch. If the code is not accepted then I still have a branch where I can make the required corrections and repeat the process.

It might sound complicated, but it really isn't. The only reason for all this rebasing is so that GIT's native merge tools deal with SVN merge conflicts. I am not sure why, but they are far better then what the SVN bridge can do, and will ultimately lead to few headaches for you.

In code it looks like:
``` bash
git> git svn rebase
git> git checkout -b task1
... work on task 1
git> git log -p -n X &gt; task1.diff
... create diff of all (X) changes needed for task1
... email the diff for review
git> git checkout master
git> git svn rebase
git> git checkout -b task2
... work on task 2
... when task 1 is approved commit what you have for task 2 and dcommit task1
... return to task 2 when task 1 is committed
```

This style also works well if your boss comes over at the 11th hour and assignes you a new emergency assignment.  When you are done with the emergency switching gears is as easy as switching branches.

## DCommitting your changes

As states above I use the checkout, rebase, checkout, rebase, checkout, merge, dcommit style.  This seems cumbersome until you understand the purpose.

From any branch always checkout into master.  This allows master to stay pure of your changes and makes its less likely that git svn will fail.

Once master is up-to-date checkout the branch again and rebase the master changes into the branch.  Fixing any rebase conflicts there might be.  By fixing them on the branch we keep master clean so we are using git's rebase/merge capabilities, not the SVN bridge's.  There are times this step can be skipped, but once you have to deal with your first rebase conflict from the bridge you will wish you had branched.

Now that the branch holds the latest code to be dcommitted to SVN: checkout master, merge the branch, and dcommit master.  You could rebase the changes from the branch if you prefer, it really makes no difference because your changes are on top of SVN now either way.  Once done all of master's log messages will be rewritten to what is in SVN.

All together it looks like this:
``` bash
git> git checkout master
git> git svn rebase
git> git checkout task1
git> git rebase master
... SVN needs your changes to be rebased so rebase master
... by rebasing onto to a branch it is easier to deal with rebase failures
... fix any rebase issues
git> git checkout master
git> git merge task1
... could merge or rebase, doesn't matter here
git> git svn dcommit
... mark the task closed
git> git brach -D task1
... svn doesn't always mark the branch merged properly so use -D instead of -d
```

## Pro Tips

### Different user names

Use a different username for SVN and GIT.  That way it is easy to see in the log what is committed to SVN since the bridge will rewrite the commit log from what SVN says.

* For SVN I use jkamenik.
* For GIT I use jkamenik at gmail dot com.

Commits that are in SVN also have the SVN revision number in the log message, but I find it easier to use usernames since it is at the top of the log message.

### Setup Aliases

Git allows more commands to be added via aliases. An alias can be a shortening of a git command: `st = status`. Or it can be a shell command that git will execute `test = !sh -c 'echo "it works!"'` (notice the leading !).

Here is the alias part of my <span class=code>~/.gitconfig</span> file looks like:
```
[alias]
  # Old SVN aliases
  ci = commit
  co = checkout
  st = status
  stat = status
  # stuff I find useful
  br = branch
  df = diff
  rm-all = !git st | grep deleted | awk '{print $3}' | xargs git rm
  add-all = !git st | grep modified | awk '{print $3}' | xargs git add
  st-br = "!f(){ git co master && git svn rebase && git co -b $1 }; `f`"
  up-br = "!f(){ git co master && git svn rebase && git co $1 }; `f`"
  co-br = "!f(){ git up-br $1 && git co master && git merge $1 && git svn dcommit }; `f`"
```

Notice that `st-br`, `up-br`, and `co-br` are basically all the set of commands I noted above in single command style.

### Stashing changes

The stash is a hidden place that git can keep changes that are not yet ready to commit.  This is very useful if you get switched to another task and really don't have time to fully vet a change on the current task.  You can stash the outstanding change and later replay them.

`git stash` keeps a queue of changes so you can stash more then one thing, but you can only replay them top down.

``` bash
git> git stash
... hides all modified files
git> git stash list
... lists all stashes
git> git stash apply
... applies the top stash, but does not remove it
git> git stash pop
... applies the top stash, and remove it

## Resources

* [GIT <-> SVN workflow](http://www.biostat.jhsph.edu/~rpeng/biostat776/workflow.html)
* [Effectively using GIT with SVN](http://www.viget.com/extend/effectively-using-git-with-subversion/)
