$(document).ready(function () {

});

function allRoomsContent() {
 $("#allRoomsImageContent").mCustomScrollbar({
        theme: "dark",
        scrollButtons: {
            enable: true
        },
        autoHideScrollbar: true,
        axis: "y",
    });
    var check = $(allRoomsImageContent).is(":visible");
    var imgCheck = false;
    $("#allRoomsButton").click(function () {

        $("#allRoomsTopLabelContent").fadeToggle();
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
            $("#allRoomsTopLabelContent").fadeOut();

            check = false
        } else {
            imgCheck = false;
        }
    });
}

function allRoomsScrollbar() {
   
}