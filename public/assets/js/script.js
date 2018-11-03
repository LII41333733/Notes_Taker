var $tableList = $("#tableList");
var $waitList = $("#waitList");
var $clearBtn = $("#clear");



$(document).on("click", ".list-group-item", function (event) {
  event.preventDefault();
  $(".saved").css("visibility", "hidden") 
  $(".save-note").attr("can-save", false);
  const noteData = $(this).data();
  $(".note-title").val(noteData.title).attr("readonly", true)
  $(".note-textarea").val(noteData.note).attr("readonly", true)
})

$(".new-note").on("click", function() {
  $(".saved").css("visibility", "hidden") 
  $(".save-note").attr("can-save", true);
  $(".note-title").attr("readonly", false).val("");
  $(".note-textarea").attr("readonly", false).val("");
})

$(document).on("click", ".delete-note", function (event) {
  $(".saved").css("visibility", "hidden") 
  $.ajax({
    url: "/api/notes",
    method: "DELETE",
    data: $(this).parent().parent().data()
  }).then(function() {});
  runTableQuery();
  $(this).parent().parent().remove();
})


$(document).on("click", ".save-note", function(event) {
  event.preventDefault(); 
  // 11/1/2018 10:52 AM
  const timeStamp = moment().format("MM/DD/YYYY h:mma");

  if ($(".save-note").attr("can-save") === "true") {
  const note = {
    currentDateTime: timeStamp,
    title: $(".note-title").val(),
    note: $(".note-textarea").val()
  };

  if ((note.title === "") || (note.note === "")) {
    return;
  } else {
    $(".saved").css("visibility", "visible")
    $(".save-note").attr("can-save", false);
    $.ajax({
      url: "/api/notes",
      data: note,
      method: "POST"
    });

    $(".save-note").attr("can-save", "false");
    $tableList.empty();
    $(".note-title").val(note.title).attr("readonly", true);
    $(".note-textarea").val(note.note).attr("readonly", true);
  

      runTableQuery();
    }
  }
})


var runTableQuery = function () {
  $.ajax({
    url: "/api/notes",
    method: "GET"
  }).then(function (tableData) {
    
    if (tableData.length === 0) {
      $tableList.append($("<li class='list-group-item'>").append("<h2>").text("Add a new entry!"))
    } else {
    // Loop through and display each of the customers
    for (var i = 0; i < tableData.length; i++) {
      var $listItem = $("<li class='list-group-item'>").data(tableData[i]);

      $deleteButton = $("<i class='fas fa-trash-alt float-right text-danger delete-note'></i>")

      let $title;
      let $note;

      if (tableData[i].title.length > 20) {
        $title = $("<h4>").text(`${tableData[i].title.slice(0, 20)}...`)
      } else {
        $title = $("<h4>").text(`${tableData[i].title}`)
      }
      if (tableData[i].note.length > 35) {
        $note = $("<p>").text(`${tableData[i].note.slice(0, 35)}...`)
      } else {
        $note = $("<p>").text(`${tableData[i].note}`)
      }


      $listItem.append(
        $("<p>").text(`${i + 1} | ${tableData[i].currentDateTime}`).append($deleteButton).css('font-weight', 'bold'),
        $("<hr>"),
        $title, 
        $note
      );

      $tableList.append($listItem);
    }
  }
  });
};

runTableQuery();