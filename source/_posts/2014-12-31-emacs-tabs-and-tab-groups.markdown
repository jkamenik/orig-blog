---
layout: post
title: "Emacs Tabs and Tab Groups"
date: 2014-12-31 09:35
comments: true
toc: false
published: false
categories: 
	- emacs
	- howto
---

From other editors I am used to having Tabbars.  Switching to Emacs I
miss that behavior.  Emacs does have a `tabbar` plugin, but it isn't
quite what I want.

<!-- more -->

By default it groups the tabs in a seemingly random way.  I am sure it
makes sense if you wrote it, but for me I want the things group by my
projects.  For me a project is a diretory wich has a `.git` directory
at its root.

First I created a simple function to get the project root, or return nil.

```common-lisp
(defun my-project-root ()
  "Return the root of the project."
  (locate-dominating-file default-directory
			  ".git"))

```

Basically this search all parent directories until it finds one
containing the ".git" directory.  The build in function details are.

`locate-dominating-file BASE FILE` searches the parent directory tree
from BASE until it finds FILE.

`default-directory` is a file local variable which is the directory of
the current file.


Next I set the `tabbar-buffer-groups-function` to return the group
name of the current file.  The only requirement is that the function
return a list, but it is recommended that the list only contain a
single item.

```common-lisp
(setq tabbar-buffer-groups-function
      (lambda ()
        (let ((dir (expand-file-name default-directory)))
          (cond ((member (buffer-name) '("*Completions*"
                                         "*scratch*"
                                         "*Messages*"
                                         "*Ediff Registry*"))
                 (list "#misc"))
                ;; Group tabs based on project root
                ((my-project-root) (list (my-project-root)))
                ;; If nothing else use the current dir
                (t (list dir))))))
```

Here we capture the absolute path of the current file.  Then we check
a bunch of things to determine which best represents the group name.
The first thing we do is group the special buffers together.  Then we
use the project root to group files.  And if nothing else we use the
file's directory as the group name.

`lambda ARG BLOCK` creates an anonymous function.

`let VAR BLOCK` sets a variable and then calls a block.  The variable
is then local to that block.

`cond TUPLE TUPLE...` executes tuples until the first time in the
tuple is true.  When it finds a true tuple it executes the second item
and returns it.

`member ITEM LIST` returns true if the first item is contained within
the second list.

`list ITEM` converts an item into a single item list.

`my-project-root` See above.


