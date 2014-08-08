$(document).ready(function () {
    $("#bereichContent").mCustomScrollbar({
        theme: "light",
        scrollButtons: {
            enable: true
        },
        autoHideScrollbar: true,
        axis: "x",
    });
    $("#gebäudeContent").mCustomScrollbar({
        theme: "light",
        scrollButtons: {
            enable: true
        },
        autoHideScrollbar: true,
        axis: "x",
    });
    $("#raumContent").mCustomScrollbar({
        theme: "light",
        scrollButtons: {
            enable: true
        },
        autoHideScrollbar: true,
        axis: "x",
    });
});

function imageSlider() {
    var buildClicked = false;
    var roomClicked = false;
    var totalImgWidth = 0;

    //////////////////////////// Bereiche ////////////////////////////
    // Bereichebutton
    $("#depBtn").bind("click", function () {
        if (buildClicked == true) {
            buildClicked = !buildClicked;
            $(buildBtn).next().animate({
                width: 'toggle'
            }, 500);
            $("#buildBtn").animate({
                "margin-left": "0px"
            }, 500);
            $("#roomBtn").animate({
                "margin-left": "0px"
            }, 500, function () {
                depBtnAction();
            });

        } else if (roomClicked == true) {
            roomClicked = !roomClicked;
            $(roomBtn).next().animate({
                width: 'toggle'
            }, 500);
            $("#roomBtn").animate({
                "margin-left": "0px"
            }, 500, function () {
                depBtnAction();
            });
        } else {
            // nothing to do
        }
    });

    function depBtnAction() {
        totalImgWidth = 0;
        $("#bereichImageContent").children().each(function () {
            totalImgWidth = totalImgWidth + $(this).width();
        });
        totalImgWidth = totalImgWidth + $("#bereichImageContent").children().length;
        $("#bereichImageContent").width(totalImgWidth);
        $("#buildBtn").animate({
            "margin-left": totalImgWidth + "px"
        }, 1000);
        $(depBtn).next().animate({
            width: 'toggle'
        }, 1000);
    }
    // Bereichebild Klick
    $(".bereiche").click(function () {
        $(depBtn).next().animate({
            width: 'toggle'
        }, 1000);

        $("#buildBtn").animate({
            "margin-left": "0px"
        }, 1000, function () {
            buildBtnAction();
        });

    });

    //////////////////////////// Gebäude ////////////////////////////
    // Gebäudebutton
    $("#buildBtn").click(function () {
        if (roomClicked == true) {
            roomClicked = !roomClicked;
            $(roomBtn).next().animate({
                width: 'toggle'
            }, 1000, function () {
                buildBtnAction();
            });

        }
    });

    function buildBtnAction() {
        totalImgWidth = 0;
        buildClicked = !buildClicked;
        $("#gebäudeImageContent").children().each(function () {
            totalImgWidth = totalImgWidth + $(this).width();
        });
        totalImgWidth = totalImgWidth + $("#gebäudeImageContent").children().length;
        $("#gebäudeImageContent").width(totalImgWidth);
        if (buildClicked == true) {
            $("#roomBtn").animate({
                "margin-left": totalImgWidth + "px"
            }, 1000);
        } else {
            $("#roomBtn").animate({
                "margin-left": "0px"
            }, 1000);
        }
        $(buildBtn).next().animate({
            width: 'toggle'
        }, 1000);
    }
    // Gebäudebild Klick
    $(".gebäude").click(function () {
        buildClicked = !buildClicked;
        $(buildBtn).next().animate({
            width: 'toggle'
        }, 1000);
        $("#roomBtn").animate({
            "margin-left": "0px"
        }, 1000, function () {
            roomBtnAction();
        });

    });

    //////////////////////////// Räume anzeigen ////////////////////////////
    // Raumbutton
    $("#roomBtn").click(function () {});

    function roomBtnAction() {
        totalImgWidth = 0;
        roomClicked = !roomClicked;
        // Breite aller Kind-Elemente zusammenaddieren um die Breite des Imagesliders festzulegen
        $("#raumImageContent").children().each(function () {
            totalImgWidth = totalImgWidth + $(this).width();
        });
        totalImgWidth = totalImgWidth + $("#raumImageContent").children().length;
        $("#raumImageContent").width(totalImgWidth);

        $(roomBtn).next().animate({
            width: 'toggle'
        }, 1000);
    }

    var checked = false;


    // Auswählen eines Raumes
    var tmpClickedImg = 0;
    $("#img" + tmpClickedImg).addClass("toggle");
    $("#imgAcc" + tmpClickedImg).addClass("toggle");

    $("#img" + tmpClickedImg + " .roomLabel").css("color", "rgba(255, 255, 255, 1)");
    $("#imgAcc" + tmpClickedImg + " .labelimgAcc").css("color", "rgba(255, 255, 255, 1)");
    sliderAuth(tmpClickedImg);
    /*
    profileAuth(tmpClickedImg);
*/

    $(".roomImage").click(function (e) {
        if ($(this).hasClass('roomImageAccordion')) {
            var clickedImg = $(e.target).index();
        } else {
            var clickedImg = $(this).closest('.roomImageWrapper').index('.roomImageWrapper');
        }

        if (clickedImg == tmpClickedImg) {
            // nichts machen                    
        } else {
            $("#img" + tmpClickedImg).removeClass("toggle");
            $("#imgAcc" + tmpClickedImg).removeClass("toggle");
            $("#img" + tmpClickedImg + " .roomLabel").css("color", "rgba(255, 255, 255, .6)");
            $("#imgAcc" + tmpClickedImg + " .labelimgAcc").css("color", "rgba(255, 255, 255, .6)");

            $("#img" + clickedImg).addClass("toggle");
            $("#imgAcc" + clickedImg).addClass("toggle");
            $("#img" + clickedImg + " .roomLabel").css("color", "rgba(255, 255, 255, 1)");
            $("#imgAcc" + clickedImg + " .labelimgAcc").css("color", "rgba(255, 255, 255, 1)");
            tmpClickedImg = clickedImg;
            sliderAuth(tmpClickedImg);
            /*
            profileAuth(tmpClickedImg);
*/
        }
    });

    $(".toggleOnOff").click(function () {

        var roomId = $(this).prev("div").attr("id");
        var roomIdLength = roomId.length;
        var roomIdSubstr = roomId.substring(3, roomIdLength);
        roomIdSubstr++;

        $(this).toggleClass("toggled");
        if ($(this).hasClass("toggled")) {
            sendMessage(JSON.stringify({
                "action": "set",
                "room": roomIdSubstr,
                "param": "state",
                "value": "off",
            }));

        } else {
            sendMessage(JSON.stringify({
                "action": "set",
                "room": roomIdSubstr,
                "param": "state",
                "value": "on",
            }));

        }

    });
    depBtnAction();
}

// evtl. für buttons mittig zu positionieren für jedes Bild
function labelPositioning() {
    var labelWidth = new Array();

    for (var i = 0; i < roomamount; i++) {
        labelWidth[i] = $("#img" + i + " .roomLabel").css("width");
        console.warn(labelWidth[i]);
        $("#img" + i + " .roomLabel").css("margin-right", -labelWidth[i]);
    }
}