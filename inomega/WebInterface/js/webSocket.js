$(document).ready(function () {
    console.log('websocketready');
    startwebsocket();


});
var ip = localStorage.getItem("ip");
// ---- SERVER IP -----
// Laptop Zu hause  192.168.178.75
// PC Zu hause      changes everytime
// PC Arbeit        192.168.1.148
var ws = new WebSocket('ws://' + ip + ':8080/inomega/websocket');



function startwebsocket() {

    console.log('startwebsocket: ' + ipAdresse);

    ws.onopen = function () {
        console.log("Websocket Ready!!");
        //            sendMessage();
    }
    ws.onclose = function () {
        console.log("Websocket Closed!!");
    }
    ws.onerror = function () {
        console.log("Websocket Error!!");
        var output = document.getElementById('output');
        output.innerHTML = "Websocket Error!!";
    }
    ws.onmessage = function (data) {
        var obj = jQuery.parseJSON(data.data);
        /*    console.log(obj.param);
        console.log(obj.value);
        console.log(obj.lamp);*/
        /*
        console.warn(obj.code);
*/
        if (obj.code == 'ok') {
            console.info("Server -> Client:" + data.data);

            var dataParam = obj.param;
            var dataVal = obj.value;

            if (Boolean(obj.lamp) && (dataParam == "brightness")) {
                var dataSliderId = "slider" + obj.lamp;
                var thumbWidth = dataVal * 0.23;
                $("#" + dataSliderId).slider("value", dataVal);
                $("#" + dataSliderId + ".ui-widget-content .ui-state-default").css("margin-left", "-" + thumbWidth + "px");

            } else if (Boolean(obj.lamp) && dataParam == "color") {
                var dataSliderId = "slider" + obj.lamp;
                $("#" + dataSliderId + ".ui-widget-content .ui-state-default").css("background", dataVal);
            } else if (Boolean(obj.room) && (dataParam == "brightness")) {
                var dataRoomId = obj.room;
                var thumbWidth = dataVal * 0.23;
                $(".slider").slider("value", dataVal);
                $(".slider.ui-widget-content .ui-state-default").css("margin-left", "-" + thumbWidth + "px");
            } else if (Boolean(obj.room) && (dataParam == "color")) {
                var dataRoomId = obj.room;
                $(".slider.ui-widget-content .ui-state-default").css("background", dataVal);
            } else if (Boolean(obj.lamp) && (dataParam == "state")) {
                console.log("STATE LAMP");
                var dataSliderId = "slider" + obj.lamp;
                if (dataVal == "off") {
                    $("#" + dataSliderId).css("background", "black");
                } else {
                    $("#" + dataSliderId).css("background", "rgb(180, 180, 180)");
                }
            } else if (Boolean(obj.room) && (dataParam == "state")) {
                console.log("STATE ROOM");
                var dataRoomId = obj.room;
                if (dataVal == "off") {
                    $(".slider").not("#sliderAllLamps").css("background", "black");
                    $("#toggleOnOff" + dataRoomId - 1).addClass("toggled");
                } else {
                    $("#toggleOnOff" + dataRoomId - 1).removeClass("toggled");
                    $(".slider").not("#sliderAllLamps").css("background", "rgb(180, 180, 180)");
                }
            }
        } else if (obj.code == 'error') {
            console.error("Server -> Client:" + data.data);
        } else {
            console.info("Server -> Client:" + data.data);

            var dataParam = obj.param;
            var dataVal = obj.value;

            if (Boolean(obj.lamp) && (dataParam == "brightness")) {
                var dataSliderId = "slider" + obj.lamp;
                var thumbWidth = dataVal * 0.23;
                $("#" + dataSliderId).slider("value", dataVal);
                $("#" + dataSliderId + ".ui-widget-content .ui-state-default").css("margin-left", "-" + thumbWidth + "px");

            } else if (Boolean(obj.lamp) && dataParam == "color") {
                var dataSliderId = "slider" + obj.lamp;
                $("#" + dataSliderId + ".ui-widget-content .ui-state-default").css("background", dataVal);
            } else if (Boolean(obj.room) && (dataParam == "brightness")) {
                var dataRoomId = obj.room;
                var thumbWidth = dataVal * 0.23;
                $(".slider").slider("value", dataVal);
                $(".slider.ui-widget-content .ui-state-default").css("margin-left", "-" + thumbWidth + "px");
            } else if (Boolean(obj.room) && (dataParam == "color")) {
                var dataRoomId = obj.room;
                $(".slider.ui-widget-content .ui-state-default").css("background", dataVal);
            } else if (Boolean(obj.lamp) && (dataParam == "state")) {
                console.log("STATE LAMP");
                var dataSliderId = "slider" + obj.lamp;
                if (dataVal == "off") {
                    $("#" + dataSliderId).css("background", "black");
                } else {
                    $("#" + dataSliderId).css("background", "rgb(180, 180, 180)");
                }
            } else if (Boolean(obj.room) && (dataParam == "state")) {
                console.log("STATE ROOM");
                var dataRoomId = obj.room;
                if (dataVal == "off") {
                    $(".slider").not("#sliderAllLamps").css("background", "black");
                    $("#toggleOnOff" + dataRoomId - 1).addClass("toggled");
                } else {
                    $("#toggleOnOff" + dataRoomId - 1).removeClass("toggled");
                    $(".slider").not("#sliderAllLamps").css("background", "rgb(180, 180, 180)");
                }
            }
        }
    }
}

function sendMessage(temp) {
    ws.send(temp);
    console.info("Client -> Server:" + temp);
}