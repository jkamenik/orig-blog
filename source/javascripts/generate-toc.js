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
