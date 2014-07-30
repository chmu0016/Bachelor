$(document).ready(function () {
    $("#bereichContent").mCustomScrollbar({
          theme: "light",
        scrollButtons:{
          enable:true
        },
        autoHideScrollbar: true,
        axis: "x",
    });
    $("#gebäudeContent").mCustomScrollbar({
          theme: "light",
        scrollButtons:{
          enable:true
        },
        autoHideScrollbar: true,
        axis: "x",
    });
    $("#raumContent").mCustomScrollbar({
        theme: "light",
        scrollButtons:{
          enable:true
        },
        autoHideScrollbar: true,
        axis: "x",
    });
});

function imageSlider() {
    var clicked = false;
    var totalImgWidth = 0;
    $("#depBtn").bind("click", function () {
        totalImgWidth = 0;
        clicked = !clicked;
        $("#bereichImageContent").children().each(function () {
            totalImgWidth = totalImgWidth + $(this).width();
        });
        totalImgWidth = totalImgWidth + $("#bereichImageContent").children().length;
        $("#bereichImageContent").width(totalImgWidth);
        if (clicked == true) {
            document.getElementById('buildBtn').disabled = true;
            document.getElementById('roomBtn').disabled = true;
            $("#buildBtn").animate({
                "margin-left": "1020px"
            }, 1000);
        } else {
            document.getElementById('buildBtn').disabled = false;
            document.getElementById('roomBtn').disabled = false;
            $("#buildBtn").animate({
                "margin-left": "0px"
            }, 1000);
        }
        $(this).next().animate({
            width: 'toggle'
        }, 1000);
    });

    // Gebäude anzeigen
    $("#buildBtn").click(function () {
        totalImgWidth = 0;
        clicked = !clicked;
        $("#gebäudeImageContent").children().each(function () {
            totalImgWidth = totalImgWidth + $(this).width();
        });
        totalImgWidth = totalImgWidth + $("#gebäudeImageContent").children().length;
        $("#gebäudeImageContent").width(totalImgWidth);
        if (clicked == true) {
            document.getElementById('depBtn').disabled = true;
            document.getElementById('roomBtn').disabled = true;

            $("#roomBtn").animate({
                "margin-left": "1020px"
            }, 1000);
        } else {
            document.getElementById('depBtn').disabled = false;
            document.getElementById('roomBtn').disabled = false;

            $("#roomBtn").animate({
                "margin-left": "0px"
            }, 1000);
        }
        $(this).next().animate({
            width: 'toggle'
        }, 1000);
    });

    // Raumnübersicht anzeigen
    $("#roomBtn").click(function () {
        totalImgWidth = 0;
        clicked = !clicked;
        // Breite aller Kind-Elemente zusammenaddieren um die Breite des Imagesliders festzulegen
        $("#raumImageContent").children().each(function () {
            totalImgWidth = totalImgWidth + $(this).width();
        });
        totalImgWidth = totalImgWidth + $("#raumImageContent").children().length;
        $("#raumImageContent").width(totalImgWidth);
        // Wenn angeklickt, beide anderen Buttons deaktivieren
        if (clicked == true) {
            document.getElementById('depBtn').disabled = true;
            document.getElementById('buildBtn').disabled = true;
        } else {
            document.getElementById('depBtn').disabled = false;
            document.getElementById('buildBtn').disabled = false;
        }

        $(this).next().animate({
            width: 'toggle'
        }, 1000);
    });




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