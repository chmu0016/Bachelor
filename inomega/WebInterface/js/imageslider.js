$(document).ready(function () {
    // Breite des Fensters minus Bereich, Gebäude und Raumbuttonbreite
    var win = $(window).width();
    win = win - 180;
    // Breite des Imagesliders an der Browserfensterbreite anpassen
    $("#raumContent").width(win);
    // Custom Scrollbars in den Contents zuweisen
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

var buildClicked = false;
var roomClicked = false;
var totalImgWidth = 0;

function imageSlider() {

    //////////////////////////// Bereiche ////////////////////////////
    /*  Bereichebutton klick
        Bereiche anzeigen
    */
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
            // nichts machen
        }
    });
    // Bereichecontent ausfahren
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
    // Klick auf ein Bereichsbild und zuweisung der Gebäude
    $(".bereiche").click(function () {
        $("#gebäudeImageContent").empty();
        var bereichId = $(this).attr("id");
        var bereichIdLength = bereichId.length;
        var bereichIdSubstr = bereichId.substring(7, bereichIdLength);
        buildingAuth(bereichIdSubstr);
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
    /*  Gebäudebutton klick
        Gebäude anzeigen
    */
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
    // Gebäudecontent ausfahren
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
    depBtnAction();
}
// Imageslider Räume Clicklistener und Raum ein-/ausschalten
function raumClicklistener() {
    var tmpClickedImg = 0;
    $("#img" + tmpClickedImg).addClass("toggle");
    $("#imgAcc" + tmpClickedImg).addClass("toggle");

    $("#img" + tmpClickedImg + " .roomLabel").css("color", "rgba(255, 255, 255, 1)");
    $("#imgAcc" + tmpClickedImg + " .labelimgAcc").css("color", "rgba(255, 255, 255, 1)");
    sliderAuth(tmpClickedImg);

    // Klick und Auswahl eines Raumes
    $(".roomImage").click(function (e) {
        if ($(this).hasClass('roomImageAccordion')) {
            var clickedImg = $(e.target).index();
        } else {
            var clickedImg = $(this).closest('.roomImageWrapper').index('.roomImageWrapper');
        }
        // Wenn Klick auf einen bereits ausgewählten Raum nichts machen, ansonsten Raum auswählen
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

        }
    });
    // Raum ein- bzw. ausschalten
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
}
// clicklistener für klick auf Gebäudebild
function clicklistener() {
    // Gebäudebild Klick
    $(".gebäude").click(function () {
        deleteRoom();
        buildClicked = !buildClicked;
        $("#raumImageContent").empty();
        var gebäudeId = $(this).attr("id");
        var gebäudeIdLength = gebäudeId.length;
        var gebäudeIdSubstr = gebäudeId.substring(7, gebäudeIdLength);
        addRoomImageslider(gebäudeIdSubstr);
        $(buildBtn).next().animate({
            width: 'toggle'
        }, 1000);
        $("#roomBtn").animate({
            "margin-left": "0px"
        }, 1000, function () {
            roomBtnAction();
        });
    });
}
// Raumimageslider ausfahren
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