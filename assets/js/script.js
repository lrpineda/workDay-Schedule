var items = {};
// Show today's date
var todaysDate = moment().format("dddd, MMMM Do");
$("#currentDay").text(todaysDate);

// Setting up the hourly agenda
var hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
var currentHour = moment().format("hA");

var createAgenda = function () {
  for (let i = 0; i < hours.length; i++) {
    var hourEl = $("<li>").addClass("time-block row");
    var hourCol = $("<div>").addClass("col-md-2 hour text-right");
    var itemDesc = $("<div>").addClass("col-9 description");
    var saveEl = $("<div>").addClass(
      "col-1 d-flex justify-content-center align-items-center saveBtn"
    );
    var saveBtn = $("<i>").addClass("fa-solid fa-save");
    saveEl.append(saveBtn);
    var difference = moment(hours[i], "hA") - moment(currentHour, "hA");
    var hourText = $("<p>").text(hours[i]);
    if (difference < 0) {
      itemDesc.addClass("past");
      hourCol.append(hourText);
      hourEl.append(hourCol, itemDesc, saveEl);
    } else if (difference === 0) {
      itemDesc.addClass("present");
      hourCol.append(hourText);
      hourEl.append(hourCol, itemDesc, saveEl);
    } else {
      itemDesc.addClass("future");
      hourCol.append(hourText);
      hourEl.append(hourCol, itemDesc, saveEl);
    }

    $("#byHour-List").append(hourEl);
  }
};

createAgenda();



$(".description").on("click",  function () {
    var text = $(this).text().trim();
    var classes = $(this).attr("class");
    var textInput = $("<textarea>")
        .addClass(classes)
        .val(text)
        .attr("id", "description-input");

    $(this).replaceWith(textInput);
    textInput.trigger("focus");
    console.log("this happened");
   
});

$("#description-input").on("blur", "textarea", function () {
    var classes = $(this).attr("class");
    var text = $(this).val().trim();
    var index = $(this).closest(".time-block").index();
    console.log("Here's the data", index,text, classes);
});


var saveItems = function () {
    localStorage.setItem("items", JSON.stringify(items));
};

$(".fa-save").on("click", function () {
    var item = $(this).closest("li").find(".description").val();
    var time = $(this).closest("li").find(".hour").text();
    console.log("save button clicked", item, time);

});
