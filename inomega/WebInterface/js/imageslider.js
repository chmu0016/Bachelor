$(document).ready(function () {});

function imageSlider() {
    // Breite eines einzelnes Bildes
    var singleImgWidth = $("#img0").outerWidth();

    // Gesamtbreite aller Bilder im Slider
    var totalW = 0;
    $("#sliderWidth").children().each(function () {
        totalW = totalW + $(this).width();
    });

    // Div-Container auf die gesamtbreite der Bilder setzen
    document.getElementById("sliderWidth").style.width = totalW + "px";
    // Breite des Sichtbaren Sliders
    var imgWidth = $("#imageSlider").width();
    var scrollPixel = 0;
    $("#rightBtn").click(function () {
        if (scrollPixel * 2 < totalW) {
            scrollPixel += singleImgWidth;
            $("#imageSlider").animate({
                scrollLeft: scrollPixel
            }, 200);
        } else {}
    });

    $("#leftBtn").click(function () {
        if (scrollPixel > 0) {
            scrollPixel -= singleImgWidth;
            $("#imageSlider").animate({
                scrollLeft: scrollPixel
            }, 200);
        } else {
            scrollPixel = 0;
        }
    });

    var checked = false;

    function displaywheel(e) {
        if (checked == true) {
            var evt = window.event || e //equalize event object
            var delta = evt.detail ? evt.detail * (-120) : evt.wheelDelta /*check for detail first so Opera uses that instead of wheelDelta             */
        }
        if (delta > 0) {
            if (scrollPixel * 2 < totalW) {
                scrollPixel += singleImgWidth;
                $("#imageSlider").animate({
                    scrollLeft: scrollPixel
                }, 200);
            } else {
                /*scrollPixel = (imgWidth - singleImgWidth);
                    console.log("else" + scrollPixel);*/
            }
        } else if (delta < 0) {
            if (scrollPixel > 0) {
                scrollPixel -= singleImgWidth;
                $("#imageSlider").animate({
                    scrollLeft: scrollPixel
                }, 200);
            } else {
                scrollPixel = 0;
            }
        }
        /*console.log(delta) //delta returns +120 when wheel is scrolled up, -120 when down*/
    }

    $("#imageSlider").mouseenter(function () {
        checked = true;
        var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x

        if (document.attachEvent) //if IE (and Opera depending on user setting)
            document.attachEvent("on" + mousewheelevt, displaywheel)
        else if (document.addEventListener) //WC3 browsers
            document.addEventListener(mousewheelevt, displaywheel, false)
    });

    $("#imageSlider").mouseleave(function () {
        checked = false;
        var mousewheelevt = null; //FF doesn't recognize mousewheel as of FF3.x

        if (document.attachEvent) //if IE (and Opera depending on user setting)
            document.attachEvent(null, displaywheel)
        else if (document.addEventListener) //WC3 browsers
            document.addEventListener(null, displaywheel, false)
    });

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
        console.log(e.target);
        if ($(this).hasClass('roomImageAccordion')) {
            var clickedImg = $(e.target).index();
        } else {
            var clickedImg = $(this).closest('.roomImageWrapper').index('.roomImageWrapper');
        }
        var pos = $("#img" + clickedImg).position().left;
        var visibleContent = (imgWidth - singleImgWidth);
        if (scrollPixel > visibleContent) {
            scrollPixel = visibleContent - singleImgWidth;
        } else if (scrollPixel < 0) {
            scrollPixel = 0;
        }
        /* console.log("POSITION:" + pos);
        console.log("breite sichtbar:" + visibleContent);
        console.log("scrollpixel:" + scrollPixel);
        console.log("--------------------------------------------------------------------------------------------------------------------");*/
        if (pos > visibleContent) {

            scrollPixel = scrollPixel + (pos - visibleContent);
            /*            console.log("POSITION:" + pos);
            console.log("breite sichtbar:" + visibleContent);
            console.log("scrollpixel:" + scrollPixel);
            console.log("--------------------------------------------------------------------------------------------------------------");*/
            $("#imageSlider").animate({
                scrollLeft: scrollPixel
            }, 200);
        }
        if (pos < 0) {
            scrollPixel = scrollPixel + pos;
            /*            console.log("POSITION:" + pos);
            console.log("breite sichtbar:" + visibleContent);
            console.log("scrollpixel:" + scrollPixel);
            console.log("----------------------------------------------------------------------------------------------------------");*/
            $("#imageSlider").animate({
                scrollLeft: scrollPixel
            }, 200);
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

    /*    $(".toggleOnOff").click(function () {
        $(".toggleOnOff").toggleClass("toggled");
        if (state == "off") {
            sendMessage(JSON.stringify({
                "action": "set",
                "room": clickedRoom,
                "param": "state",
                "value": "on",
            }));
            state = "on";
        } else {
            sendMessage(JSON.stringify({
                "action": "set",
                "room": clickedRoom,
                "param": "state",
                "value": "off",
            }));
            state = "off";
        }

    });*/
    $(".toggleOnOff").click(function () {
        console.info("get");
        /*        $(".toggleOnOff").toggleClass("toggled");
        sendMessage(JSON.stringify({
            "action": "get",
            "lamp": clickedRoom,
            "param": "color",
        }));*/
        $(".toggleOnOff").toggleClass("toggled");
        sendMessage(JSON.stringify({
            "action": "set",
            "room": clickedRoom,
            "param": "state",
            "value": 1,
        }));
    });

}