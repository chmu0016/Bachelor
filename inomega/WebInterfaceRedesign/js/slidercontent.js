$(document).ready(function () {});

function sliderOverflow() {
    var parH = $('#sliderContentParent').outerHeight(true);
    var areaH = $('#sliderContent').outerHeight(true);
    var scrH = parH / (areaH / parH);

    // Slidercontent Draggen von Slider über draggable
    function dragging() {
        var scrPos = $('#scrollbar').position().top;
        $('#sliderContent').css({
            top: -(Math.round(scrPos * (areaH / parH)))
        });
    }
    $('#scrollbar').height(Math.round(scrH));
    $('#scrollbar').draggable({
        axis: 'y',
        containment: 'parent',
        drag: function () {
            dragging()
        }

    });
    // Slidercontetn mit Mausrad
    var checked = false;

    function displaywheel(e) {
        var scrPos = $('#scrollbar').position().top;
        var scrHeight = $('.sliderLabel').outerHeight(true);
        var scrEnd = parH - $('#scrollbar').outerHeight(true);
        if (checked == true) {
            var evt = window.event || e //equalize event object
            var delta = evt.detail ? evt.detail * (-120) : evt.wheelDelta
        }
        if (delta > 0) {
            if (scrPos >= scrHeight) {
                scrPos -= scrHeight;
                $('#scrollbar').css("top", scrPos);
                $('#sliderContent').css({
                    top: -(Math.round(scrPos * (areaH / parH)))
                });
            } else if (scrPos <= scrHeight) {
                scrPos = 0;
                $('#scrollbar').css("top", scrPos);
                $('#sliderContent').css({
                    top: -(Math.round(scrPos * (areaH / parH)))
                });
            }
        } else if (delta < 0) {
            if (scrPos >= scrEnd - scrHeight && scrPos <= scrEnd) {
                scrPos = scrEnd;
                $('#scrollbar').css("top", scrPos);
                $('#sliderContent').css({
                    top: -(Math.round(scrPos * (areaH / parH)))
                });
            } else if (scrPos >= 0) {
                scrPos += scrHeight;
                $('#scrollbar').css("top", scrPos);
                $('#sliderContent').css({
                    top: -(Math.round(scrPos * (areaH / parH)))
                });
            }
        }
    }
    $(".slider").mouseleave(function () {
        checked = false;
        var mousewheelevt = null; //FF doesn't recognize mousewheel as of FF3.x

        if (document.attachEvent) //if IE (and Opera depending on user setting)
            document.attachEvent(null, displaywheel)
        else if (document.addEventListener) //WC3 browsers
            document.addEventListener(null, displaywheel, false)
    });
    $(".slider").mouseenter(function () {
        checked = true;
        var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel"
        if (document.attachEvent) //if IE (and Opera depending on user setting)
            document.attachEvent("on" + mousewheelevt, displaywheel)
        else if (document.addEventListener) //WC3 browsers
            document.addEventListener(mousewheelevt, displaywheel, false)
    });

}

function sliderThumbClick() {
    // Klick auf SliderThumb
    $(".ui-widget-content .ui-state-default").click(function () {
        var sliderofThumb = $(this).closest("div").attr("id");
        var sliderofThumbLength = sliderofThumb.length;
        var sliderofThumbSubstr = sliderofThumb.substring(6, sliderofThumbLength);

        if (sliderofThumb == "sliderAllLamps") {
            if ($("#toggleOnOff" + (clickedRoom - 1)).hasClass("toggled")) {
                sendMessage(JSON.stringify({
                    "action": "set",
                    "room": clickedRoom,
                    "param": "state",
                    "value": "on",
                }));
            } else {
                sendMessage(JSON.stringify({
                    "action": "set",
                    "room": clickedRoom,
                    "param": "state",
                    "value": "off",
                }));

            }
        } else {
            if ($("#" + sliderofThumb).css("background-Color") == "rgb(0, 0, 0)") {
                console.warn("black");
                sendMessage(JSON.stringify({
                    "action": "set",
                    "lamp": sliderofThumbSubstr,
                    "param": "state",
                    "value": "on"
                }));
            } else {
                console.warn("not black: " + $("#" + sliderofThumb).css("background-Color"));
                sendMessage(JSON.stringify({
                    "action": "set",
                    "lamp": sliderofThumbSubstr,
                    "param": "state",
                    "value": "off"
                }));

            }

            /*            sendMessage(JSON.stringify({
                "action": "set",
                "lamp": sliderofThumbSubstr,
                "param": "state",
                "value": "off",
            }));*/
        }
    });
}