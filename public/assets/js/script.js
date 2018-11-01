var $tableList = $("#tableList");
var $waitList = $("#waitList");
var $clearBtn = $("#clear");

var runTableQuery = function() {
  $.ajax({
    url: "/api/notes",
    method: "GET"
  }).then(function(tableData) {
    // Loop through and display each of the customers
    for (var i = 0; i < tableData.length; i++) {
      var $listItem = $("<li class='list-group-item mt-4'>");

      $listItem.append(
        $("<h2>").text("Note #" + (i + 1)),
        $("<hr>"),
        $("<h2>").text("Current Date/Time: " + tableData[i].currentDateTime),
        $("<h2>").text("Title: " + tableData[i].title),
        $("<h2>").text("Note: " + tableData[i].note),
      );

      $tableList.append($listItem);
    }
  });
};

runTableQuery();