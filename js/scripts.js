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

var id2col = function(id) {
  return id.substring(5,6);
}

var id2Row = function(id) {
  return id.substring(7);
}

var addToHistory = function(col, row, value) {
  $('#history').val($('#history').val() + "." + col + "," + row + "," + value + "\n");
}


var replayStep = function(step) {
  if (step.length > 0 && step.substring(0,1) == ".") {
    // put: .a,1,3
    var params = step.substring(1).split(",");
    var col = params[0];
    var row = params[1];
    var value = params[2];
    setValue(col, row, value);
  } else {
    console.log("ignored: " + step);
  }
}

var replayHistory = function() {
  var history = $('#history').val().split("\n");
  console.log(history.length);

  initBoard();
  history.forEach(step => replayStep(step));
}

var initBoard = function() {
  // clear everything
  for (col of ['a','b','c','d','e','f','g','h','i','j']) {
    console.log(col);
    for (row = 1; row <= 10; row++) {
      setValue(col, row, "");
    }
  }

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
}

var initFunctions = function() {
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
        if (value.length > 0) {
          setValue(col, row, value);
          addToHistory(col, row, value);
        };
      });
    }
  });

  $('#replayHistory').click(function() {
    replayHistory();
  });
}

initBoard();
initFunctions();
