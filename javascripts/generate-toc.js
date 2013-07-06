function generateTOC(insertBefore, heading) {
  var container = jQuery("<section></section>");
  var div = jQuery("<ul id='toc'></ul>");
  var content = $(insertBefore).first();

  if (heading != undefined && heading != null) {
    container.append('<h1 class="tocHeading">' + heading + '</h1>');
  }

  div.tableOfContents("#content",{startLevel: 2});
  container.append(div);
  container.insertBefore(insertBefore);
}
