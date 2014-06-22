---
layout: post
title: "Google Query Language"
date: 2014-06-22 11:19
comments: true
toc: false
published: true
categories:
  - budget
  - howto
  - spreadsheet
---

A while back, my wife and I started keeping a budget.  We need something very easy that shows us where we are every moment.  Also, to ensure that it is not something we "forget" it must be something that we manually enter.

I created a Google Form in order to allow us to capture the receipts.  The form dumps into a Google Spreadsheet.  I then use a Pivot Table and the Google Query Lanauage to create a Chart.  In this post I will cover the entire process.

<!-- more -->

## Step 1: Create a form

1. Create a google form
1. Add the following fields
    1. "Company" - text- required
    1. "Date" - date - required (don't include time)
    1. "Amount" - text - required (add a "number" validation)
    1. "Category" - list - required.  We added the following
        1. Other / Unknown
        1. Baby Supplies
        1. Car
        1. Entertainment
        1. Gas
        1. Groceries
        1. Home
        1. Medical
        1. Pet Supplies
        1. Resturants / Fast Food
    1. "Comment" - paragraph
1. Choose response destination
    1. Choose a "New Spreadsheet"
1. Send the form to yourself and anyone else that needs to enter receipts

At this point you have a Form which submits to a Spreadsheet.  I recommend bookmarking the link in your smart-phone so that it is easy and quick to add receipts right after your purchases.

## Step 2: Pivot

Form usually record into a sheet called "Form Responses" which I assume here.

1. Select "Form Responses"
1. Select Data -> Pivot table report...
    1. Rows - Add "Category"
    1. Values - Add "Amount"

Now you should have a two column table.  On the left are the categories.  On the right is the sum of all the values of that category.

## Step 3: Google Query

In order to chart the budget vs the actual spending we need to create another table.

1. Insert a sheet named Budget.
1. Label the columns: Category, Budget, Actual, Query
1. Copy all the categories to column A
1. Add the budgeted amount to column B
1. Add the following to column C
    1. `=if(isna(C2), 0, C2)`
1. Add the following query to column D
    1. `=QUERY('Pivot Table'!A:B, "select B where A='"&A2&"'","")`
    1. "#N/A" means that are no receipts for the category and can safely be ignored.
1. Copy and paste cell C2 and D2 to the rest of the cells in the column
    1. Google will change the internal references (A2, and C2) to the correct cell name, so you don't have to.

The Google Query Language is defined [here](https://developers.google.com/chart/interactive/docs/querylanguage).  It is a good read to see all the power of this language, but I am only going to explain the parts that we need.

### Query

`QUERY` takes three arguments: range of values, query string, and optional headers.  I am going to explain them in reverse.

The headers are guessed if nothing is provided.  This would cause the query to take two cells, which is not the behavior I wanted.  By adding "" it removes the header.

The query string tells google what data we are selecting into the cell.  In our simple example it is a direct value select using a conditional.  This is because the column order may not be the same in both sheets.  "select B" means to choose the "B" from whatever rows match the query.  "where A='"&A2&"'" means to limit the rows returned to those where the value of cell A matches the value of A2 in this sheet.  The "&" is the string concat operator.

The range of values tells Google what it is allowed to look at.  We use the 'Sheet'!Col:Col form in order to select data from another sheet.  We only provide the columns A and B because we want to look at all rows.

### ISNA

Charts cannot deal with non-number columns.  Since the query can produce a non-number output (#N/A) we need to add an additional level of processing.

`isna` takes a cell and returns if that cell is #N/A.

`if` take a boolean, a true value, and a false value.  If the first argument is true then the true value is returned.  If the first argument is false then the false value is returned.

## Chart

Charts can only take numbers and they can only accept contiguous cells.  A, B, and C are the columns that we want to chart.

1. Insert -> Chart
1. Data range: Budget!A1:C14
1. Use row 1 as headers
1. Chart type: Bar chart
1. Add a chart title

## Publish

The point of this document is to know where your money is going quickly.  In order to make it easy publish the document.  This will make google convert the document into a HTML version which is easily viewed in your smart phone.  The chart will even be convert to an image.

1. File -> Publish to the web...
1. Check "Automatically republish when changes are made"
1. Copy the link
1. Send to link to anyone that needs to be kept informed about the budget
