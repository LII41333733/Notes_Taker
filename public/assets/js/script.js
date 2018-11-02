var $tableList = $("#tableList");
var $waitList = $("#waitList");
var $clearBtn = $("#clear");


$listItem = $(".list-group")

$listItem.on("click", ".list-group-item", function () {
  $(".save-note").attr("can-save", false);
  const noteData = $(this).data();
  console.log(noteData)
  $(".note-title").val(noteData.title).attr("readonly", true)
  $(".note-textarea").val(noteData.note).attr("readonly", true)
})

$(".new-note").on("click", function () {
  $(".save-note").attr("can-save", true);
  $(".note-title").attr("readonly", false).val("");
  $(".note-textarea").attr("readonly", false).val("");
})



$(".save-note").on("click", function () {
  if ($(".save-note").attr("can-save") === "true") {
  const note = {
    currentDateTime: "Your Mother",
    title: $(".note-title").val(),
    note: $(".note-textarea").val()
  };

  if ((note.title === "") || (note.note === "")) {
    console.log("Eat ass")
    return;
  } else {
    console.log("Good!")
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



      //set title and notes back to read only
      //make it as if you clicked the last saved note to view


      //render new note pane

      runTableQuery();
    }
  }
})

const viewNote = () => {
  const quote = $(this).parents(".list-group-item").data();
}


var runTableQuery = function () {
  $.ajax({
    url: "/api/notes",
    method: "GET"
  }).then(function (tableData) {
    // Loop through and display each of the customers
    for (var i = 0; i < tableData.length; i++) {
      var $listItem = $("<li class='list-group-item'>").data(tableData[i]);

      $deleteButton = $("<i class='fas fa-trash-alt float-right text-danger delete-note'></i>")

      $listItem.append(
        $("<p>").text(`${i + 1} | ${tableData[i].currentDateTime}`).append($deleteButton).css('font-weight', 'bold'),
        $("<hr>"),
        $("<h4>").text("Title: " + tableData[i].title),
        $("<p>").text("Note: " + tableData[i].note),
      );

      $tableList.append($listItem);
    }
  });
};

runTableQuery();