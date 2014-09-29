---
layout: post
title: "Golang Steam File"
date: 2014-09-29 15:25
comments: true
toc: false
published: true
categories:
  - go
  - concurrency
---

Go (golang) is a highly concurrent language.  But more then that it is a simple language built using modular components and string them together in useful ways.  This modularity has lead me to play around a bit and one of things that I found was a easy way to stream a file.

<!-- more -->

At first I was very unhappy that Go did not support the default compression provided by the `xz` tool.  At work, we use `xz` to stream compress very large amounts of data.  But since go had no native support I thought that it would be a lost cause.

Turns out there is no native support because there doesn't have to be.  Below is the basic code.

```go
func xzReader(r io.Reader) io.ReadCloser {
	rpipe, wpipe := io.Pipe()

	cmd := exec.Command("xz", "--decompress", "--stdout")
	cmd.Stdin = r
	cmd.Stdout = wpipe

	go func() {
			err := cmd.Run()
			wpipe.CloseWithError(err)
	}()

	return rpipe
}
```

1. Declare the function to take an `io.Reader` as STDIN and return `io.ReadCloser` as STDOUT
1. Create a pipe so I that can capture the program's STDOUT and broadcast it as a readable stream
1. Register `xz` as the command to execute
1. Set the command's STDIN
1. Capture the command's STDOUT
1. Run a command in the background
    1. Run the command until there is an error
    1. Close the pipe when the command exists
1. Return the read end of the command's STDOUT


At this point you have a `io.ReaderCloser` (which is an `io.Reader`).  You can use it anywhere you would use an `io.Reader`.  For example lets say you have a compressed CSV file.  The following code would open the file, decompress it, parse it as CSV, and print that to the screen:

```go
func main() {
  fp, err := os.Open(os.Args[1])
  if err != nil {
    log.Fatal(err)
  }
  defer fp.Close()

  xz  := xzReader(fp)
  defer xz.Close()

  csv := csv.NewReader(xz)

  for {
    line, err := csv.Read()

    if len(line) > 0 {
      println(line)
    }

    if err != nil {
      break
    }
  }
}
```

1. Define the main function
1. Open a file
1. Test for errors and bail if there are any
1. Close the file pointer after the program exits
1. Pass the file as the stdin to the xz command and capture its output
1. Close the command's STDOUT after the program exits
1. Pass the decompressed file to the CSV parser and get back a `csv.Reader`
1. Loop until the stream is closed
    1. Read a line
    1. Print the line if it exists
        1. Note: in Go, it is perfectly reasonable for a command to work and fail in the same call.  If I check for an error before printing the line then I may miss the last line of the file.
    1. Check for a stream error and break the loop


It is a very common paradigm in Go to take an `io.Reader` and pass it to a function just to get back a new `io.Reader`, and take that and pass it around and get back what you want (like a string or CSV row).  Once you get your head around the fact that Go's power is that everything is a small well defined lego block, and that they all fit together, then it stops being strange that you would take one kind of interface and exchange it for exactly the same kind of interface.
