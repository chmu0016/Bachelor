$(document).ready(function () {
    console.log('websocketready');
});
var ip = "192.168.178.75";
// ---- SERVER IP -----
// Laptop Zu hause  192.168.178.75
// PC Zu hause      192.168.178.90
// PC Arbeit        192.168.1.148
var ws = new WebSocket('ws://'+ip+':8080/inomega/websocket');

function startwebsocket() {
    console.log('startwebsocket');

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
       /* console.log(obj);
        console.log(obj.param);
        console.log(obj.value);
        console.log(obj.lamp);*/

        var dataParam = obj.param;
        var dataVal = obj.value;

        if (Boolean(obj.lamp) && (dataParam == "brightness")) {
            console.log("lamp brightness");
            var dataSliderId = "slider" + obj.lamp;
            var thumbWidth = dataVal * 0.23;
            $("#" + dataSliderId).slider("value", dataVal);
            $("#" + dataSliderId + ".ui-widget-content .ui-state-default").css("margin-left", "-" + thumbWidth + "px");
        } else if (Boolean(obj.lamp) && dataParam == "color") {
            console.log("lamp color");
            var dataSliderId = "slider" + obj.lamp;
            $("#" + dataSliderId + ".ui-widget-content .ui-state-default").css("background", dataVal);
        } else if (Boolean(obj.room) && (dataParam == "brightness")) {
            console.log("all brightness");
            var dataRoomId = obj.room;
            var thumbWidth = dataVal * 0.23;
            $(".slider").slider("value", dataVal);
            $(".slider.ui-widget-content .ui-state-default").css("margin-left", "-" + thumbWidth + "px");
        } else if (Boolean(obj.room) && (dataParam == "color")) {
            var dataRoomId = obj.room;
            console.log("ALLCOLORS");
            $(".slider.ui-widget-content .ui-state-default").css("background", dataVal);
        }
    }
}

function sendMessage(temp) {
    ws.send(temp);
}