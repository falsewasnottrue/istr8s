var setValue = function(col, row, value) {
  console.log("setValue " + col + " " + row + " to " + value);

  var id = "#cell-" + col + "-" + row;
  console.log("id: " + id);

  $(id).text(value);
}

var setBlocked = function(col, row) {
  console.log("setBlocked " + col + " " + row);

  var id = "#cell-" + col + "-" + row;
  console.log("id: " + id);

  $(id).addClass("blocked");
}

var addToHistory = function(col, row, value) {
  $('#history').val($('#history').val() + col + "," + row + " -> " + value + "\n");
}

var id2col = function(id) {
  return id.substring(5,6);
}

var id2Row = function(id) {
  return id.substring(7);
}

var init = function() {
  setValue("a", 1, 8);
  setBlocked("d", 1);
  setValue("e", 1, 4);
  setBlocked("g", 1);
  setBlocked("h", 1);

  setBlocked("e", 2);

  setBlocked("b", 3);
  setValue("g", 3, 4);
  setBlocked("i", 3);

  setBlocked("a", 4);
  setValue("d", 4, 8);
  setBlocked("f", 4);
  setValue("j", 4, 3);

  setBlocked("c", 5);
  setBlocked("g", 5);

  setBlocked("d", 6);
  setValue("e", 6, 6);
  setBlocked("h", 6);

  setValue("c", 7, 5);
  setBlocked("e", 7);
  setBlocked("j", 7);

  setBlocked("b", 8);
  setBlocked("i", 8);

  setValue("a", 9, 3);
  setValue("c", 9, 4);
  setBlocked("f", 9);
  setValue("h", 9, 5);

  setBlocked("c", 10);
  setBlocked("d", 10);
  setBlocked("g", 10);
  setValue("h", 10, 6);

  $('.cell').click(function(event) {
    console.log("clicked " + this.id);
    if ($(this).hasClass("blocked")) {
      console.log("blocked");
    } else if ($(this).text() != "") {
      console.log("value set to " + $(this).text());
    } else {
      console.log("empty");
      var id = event.currentTarget.id;
      $(this).html("<input class='numberInput' id='"+ id +"-input'></input>");
      var input = $('#'+id+'-input');
      $(input).focus();
      $(input).blur(function(event) {
        var targetId = event.currentTarget.parentElement.id;
        var col = id2col(targetId);
        var row = id2Row(targetId);
        var value = event.currentTarget.value;
        setValue(col, row, value);
        addToHistory(col, row, value);
      });
    }
  });
}

init();
