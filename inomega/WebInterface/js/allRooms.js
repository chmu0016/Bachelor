$(document).ready(function () {

});

function allRoomsContent() {
    var check = $(roomsAccordion).is(":visible");
    var imgCheck = false;
    $("#allRoomsButton").click(function () {
        $("#roomsAccordion").slideToggle(function () {
            check = $(roomsAccordion).is(":visible");
        });
    });
    $(".imageAccordion").click(function () {
        imgCheck = true;
    });
    $("body").bind("click", function () {
        if (check == true && imgCheck == false) {
            $("#roomsAccordion").slideUp();
            check = false
        } else {
            imgCheck = false;
        }
    });
}