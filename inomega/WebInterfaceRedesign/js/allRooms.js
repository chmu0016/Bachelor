$(document).ready(function () {

});

function allRoomsContent() {
    var check = $(allRoomsImageContent).is(":visible");
    var imgCheck = false;
    $("#allRoomsButton").click(function () {
        $("#allRoomsImageContent").fadeToggle(function () {
            check = $(allRoomsImageContent).is(":visible");
        });
    });
    $(".imageAccordion").click(function () {
        imgCheck = true;
    });
    $("body").bind("click", function () {
        if (check == true && imgCheck == false) {
            $("#allRoomsImageContent").fadeOut();
            check = false
        } else {
            imgCheck = false;
        }
    });
}