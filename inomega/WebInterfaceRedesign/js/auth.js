$(document).ready(function () {
    roomAuth();
});
var un = localStorage.getItem("username");
var pw = localStorage.getItem("password");
var ip = ipAdresse;
// ---- SERVER IP -----
// Laptop Zu hause  192.168.178.75
// PC Zu hause      192.168.178.90
// PC Arbeit        192.168.1.148
/*localStorage.clear();*/

var roomnames = new Array();
var roomamount = 0;

var depnames = new Array();
var depamount = 0;

var buildnames = new Array();
var buildamount = 0;

var lampnames = new Array();
var lampamount = 0;

var lampColor = new Array();
var lampBrightness = new Array();
var lampId = new Array();
var lampState = new Array();

var profileId = new Array()
var profileImage = new Array()
var profileNames = new Array();
var profileType = new Array();
var profileAmount = 0;

var ciName, ciColorPrim, ciColorSec;

var oldClickedRoom = 1;
var clickedRoom = 0;



function sliderAuth(clickedRoomAuth) {
    clickedRoom = clickedRoomAuth + 1; // +1 addieren, weil id der Raumobjekte bei 1 anfängt (indize clickedroom bei 0)
    $.ajax({
        type: "GET",
        url: "http://" + un + ":" + pw + "@" + ip + ":8080/inomega/api/rooms/" + clickedRoom + "/lamps?callback=JSONPCallback",
        dataType: 'jsonp',
        jsonp: false,
        jsonpCallback: 'JSONPCallback',
        async: true,
        crossDomain: true,
        username: 'user1',
        password: 'user1',
        success: function (result) {
            /*console.log(result);*/
            lampnames = [];
            lampColor = [];
            lampBrightness = [];
            lampId = [];
            lampState = [];

            lampamount = 0;
            $.each(result, function (key, val) {
                lampnames[lampamount] = val.name;
                lampColor[lampamount] = val.color;
                lampBrightness[lampamount] = val.brightness;
                lampId[lampamount] = val.id;
                lampState[lampamount] = val.state;
                console.log('lampnames : ' + lampnames[lampamount]);
                console.log('color : ' + lampColor[lampamount]);
                console.log('brightness : ' + lampBrightness[lampamount]);
                lampamount++;
                /*console.log("index: " + key + '   ' + " id: " + val.id);*/
                console.lo
            });
            removeSlider();
            addSlider();
            sliderHandling();
            unsubscribe(oldClickedRoom);
            oldClickedRoom = clickedRoom;
            subscribe(clickedRoom);
            profileAuth(clickedRoom);
            if (lampamount > 10) {
                sliderOverflow();
            }
            sliderThumbClick();
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c);
            document.body.innerHTML = a + " " + b + " " + c;
        }
    })
        .fail(function (e) {
            console.log(e.msg);
        });

    function JSONPCallback() {

    }
}

function subscribe(clickedRoomAuth) {
    sendMessage(JSON.stringify({
        "action": "subscribe",
        "room": clickedRoomAuth,
    }));
}

function unsubscribe() {
    sendMessage(JSON.stringify({
        "action": "unsubscribe",
        "room": oldClickedRoom,
    }));
}

function profileAuth(clickedRoomAuth) {
    $.ajax({
        type: "GET",
        url: "http://" + un + ":" + pw + "@" + ip + ":8080/inomega/api/rooms/" + clickedRoomAuth + "/profiles?callback=JSONPCallback",
        dataType: 'jsonp',
        jsonp: false,
        jsonpCallback: 'JSONPCallback',
        async: true,
        crossDomain: true,
        username: 'user1',
        password: 'user1',
        success: function (result) {
            /*console.log(result);*/
            profileNames = [];
            profileId = [];
            profileType = [];
            profileImage = []
            profileAmount = 0;
            $.each(result, function (key, val) {
                profileNames[profileAmount] = val.name;
                profileId[profileAmount] = val.id;
                profileType[profileAmount] = val.type;
                profileAmount++;
                /*console.log("index: " + key + '   ' + " id: " + val.id);*/
            });
            removeProfiles();
            corpIdent();
            addProfiles();

            profileIni();

        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c);
            document.body.innerHTML = a + " " + b + " " + c;
        }
    })
        .fail(function (e) {
            console.log(e.msg);
        });

    function JSONPCallback() {

    }
}

function addProfiles() {
    $("#colorPickerContent").after('<div id="profileTopLabelContent"><button id="profileAddBtn"></button> <label for="profileTopLabelContent" class="profileTopLabel">Profile</label> </div> <div id="profileContent"> </div>');
    for (var i = 0; i <= profileAmount; i++) {
        if (i == profileAmount) {

            /*  $("#profileContent").append('<div id="profileAdd" class="profileContentImg roomImage">');
            $("#profile" + i).append('<label for="profileAdd" class="profileLabel">Profil hinzufügen</label>');*/

        } else {

            $("#profileContent").append('<div id="profile' + profileId[i] + '" class="profileContentImg roomImage">');
            $("#profile" + profileId[i]).append('<label for="profile' + profileId[i] + '" class="profileLabel">' + profileNames[i] + '</label>');
            if (profileType[i] == "default") {
                console.info("Default Profile");
            } else {
                $("#profile" + profileId[i] + " .profileLabel").after('<button id="btnDeleteProfile' + profileId[i] + '" class="btnDelete"> - </button>');
            }
            console.log("i: " + i + " PID: " + profileId[i] + " profilname: " + profileNames[i]);
        }

    }
}

function removeProfiles() {
    $("#profileContent").remove();
}

function removeSlider() {
    $("#sliderContent").empty();
    $("#allLampsWrapper").empty();
}

function addSlider() {
    var allLampsBool = false;
    for (var i = 0; i < lampamount; i++) {
        if (i == 0) {
            $("#allLampsWrapper").append('<div id="sliderAllLamps" class="slider"><label for="sliderAllLamps" class="sliderLabel">Alle Leuchten</label> </div>');
            $("#allLampsWrapper").append('<div id="btnSliderAllLamps" class="btnsSlider"></div>');
            $("#sliderContent").append('<div id="slider' + lampId[i] + '" class="slider sliderClicked">');
            $("#sliderContent").append('<div id="btnSlider' + i + '" class="btnsSlider btnClicked"></div>');
            $("#slider" + lampId[i]).append('<label for="slider' + lampId[i] + '" class="sliderLabel">' + lampnames[i] + '</label>');
        } else {
            $("#sliderContent").append('<div id="slider' + lampId[i] + '" class="slider">');
            $("#sliderContent").append('<div id="btnSlider' + i + '" class="btnsSlider"></div>');
            $("#slider" + lampId[i]).append('<label for="slider' + lampId[i] + '" class="sliderLabel">' + lampnames[i] + '</label>');
        }
    }
    /*console.log("--------------------------------------------------------------------------------------");*/
    var slider, sliderVal, widthVal, sliderState;
    sliderState = "off";
    $(".slider").slider({
        min: 0,
        max: 100,
        /*animate: true,*/
        slide: function (e, ui) {
            slider = $(e.target).attr("id");
            sliderVal = ui.value;
            widthVal = sliderVal * 0.23;
            var sliderIdLength = slider.length;
            var sliderIdSubstr = slider.substring(6, sliderIdLength);
            if (slider == "sliderAllLamps") {
                $(".slider").slider("value", ui.value);
                $("#sliderAllLamps.ui-widget-content .ui-state-default").css("margin-left", "-" + widthVal + "px");
                $(".slider.ui-widget-content .ui-state-default").css("margin-left", "-" + widthVal + "px");

                if (sliderVal > 1 && sliderState == "off") {
                    sliderState = "on";
                    sendMessage(JSON.stringify({
                        "action": "set",
                        "room": clickedRoom,
                        "param": "state",
                        "value": sliderState,
                    }));

                } else if (sliderVal > 1 && sliderState == "on") {} else {
                    sliderState = "off";
                    sendMessage(JSON.stringify({
                        "action": "set",
                        "room": clickedRoom,
                        "param": "state",
                        "value": sliderState,
                    }));
                }

                sendMessage(JSON.stringify({
                    "action": "set",
                    "room": clickedRoom,
                    "param": "brightness",
                    "value": sliderVal,
                }));

            } else if (slider == clickedSliderId) {
                if (sliderVal > 1 && sliderState == "off") {
                    sliderState = "on";
                    sendMessage(JSON.stringify({
                        "action": "set",
                        "lamp": sliderIdSubstr,
                        "param": "state",
                        "value": sliderState,
                    }));

                } else if (sliderVal > 1 && sliderState == "on") {} else {
                    sliderState = "off";
                    sendMessage(JSON.stringify({
                        "action": "set",
                        "lamp": sliderIdSubstr,
                        "param": "state",
                        "value": sliderState,
                    }));
                }

                $("#" + clickedSliderId + ".ui-widget-content .ui-state-default").css("margin-left", "-" + widthVal + "px");
                sendMessage(JSON.stringify({
                    "action": "set",
                    "lamp": sliderIdSubstr,
                    "param": "brightness",
                    "value": sliderVal,
                }));

            } else {
                if (sliderVal > 1 && sliderState == "off") {
                    sliderState = "on";
                    sendMessage(JSON.stringify({
                        "action": "set",
                        "lamp": sliderIdSubstr,
                        "param": "state",
                        "value": sliderState,
                    }));

                } else if (sliderVal > 1 && sliderState == "on") {} else {
                    sliderState = "off";
                    sendMessage(JSON.stringify({
                        "action": "set",
                        "lamp": sliderIdSubstr,
                        "param": "state",
                        "value": sliderState,
                    }));
                }

                $("#" + slider + ".ui-widget-content .ui-state-default").css("margin-left", "-" + widthVal + "px");
                sendMessage(JSON.stringify({
                    "action": "set",
                    "lamp": sliderIdSubstr,
                    "param": "brightness",
                    "value": sliderVal,
                }));
            }
        }
    });
    // Wert den Slidern zuweisen und die Farben auf den Thumb setzen
    var foreachCounter = 0;
    $(".slider").each(function () {
        var sliderTmp = $(this).attr("id");

        if (sliderTmp == "sliderAllLamps") {
            $("#" + sliderTmp).slider("value", 0);
            var thumbWidht = $("#" + sliderTmp).slider('value') * 0.23;
            $("#" + sliderTmp + ".ui-widget-content .ui-state-default").css("margin-left", "-" + thumbWidht + "px");
        } else {
            $("#" + sliderTmp + ".ui-widget-content .ui-state-default").css("background", lampColor[foreachCounter]);
            $("#" + sliderTmp).slider("value", lampBrightness[foreachCounter]);
            var thumbWidht = $("#" + sliderTmp).slider('value') * 0.23;
            $("#" + sliderTmp + ".ui-widget-content .ui-state-default").css("margin-left", "-" + thumbWidht + "px");
            foreachCounter++;
        }
    });

    for (var i = 0; i < lampamount; i++) {}
}



function roomAuth() {
    $.ajax({
        type: "GET",
        url: "http://" + un + ":" + pw + "@" + ip + ":8080/inomega/api/rooms?callback=JSONPCallback",
        dataType: 'jsonp',
        jsonp: false,
        jsonpCallback: 'JSONPCallback',
        async: true,
        crossDomain: true,
        username: 'user1',
        password: 'user1',
        success: function (result) {
            $.each(result, function (key, val) {
                roomnames[roomamount] = val.name;
                roomamount++;
            });
            addRoom();
            imageSlider();
            allRoomsContent();
            allRoomsScrollbar();

        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
        .fail(function (e) {
            console.log(e.msg + "ERROR");
        });

    function JSONPCallback() {
        /* alert("callback");*/
    }
}

function addRoom() {
    if (roomamount >= 0) {
        $("#currentLightName").after('<div id="allRoomsButton">  </div>');
        $("#colorPickerContent").after('<div id="allRoomsTopLabelContent"> <button id="colorPickerSwitchBtn"></button> <label for="allRoomsTopLabelContent" class="allRoomsTopLabel">Alle Räume</label></div>   <div id="allRoomsImageContent"></div>');


        for (var i = 0; i < roomamount; i++) {
            $("#raumImageContent").append('<div id="imgWrapper' + i + '" class="roomImageWrapper"> </div>');
            $("#imgWrapper" + i).append('<div id="img' + i + '" class="roomImage"> </div>');
            $("#img" + i).append('<label for="img' + i + '" class="roomLabel">' + roomnames[i] + '</label>');
            $("#imgWrapper" + i).append('<div id="toggleOnOff' + i + '" class="toggleOnOff"> </div>');
            $("#imgWrapper" + i).append('<div id="profileBtn' + i + '" class="profileBtnClass"> </div>');

            $("#allRoomsImageContent").append('<div id="imgAcc' + i + '" class="roomImageAccordion roomImage">');
            $("#imgAcc" + i).append('<label for="imgAcc' + i + '" class="labelimgAcc">' + roomnames[i] + '</label>');
        }
    } else {

    }
}

function corpIdent() {
    $.ajax({
        type: "GET",
        url: "http://" + un + ":" + pw + "@" + ip + ":8080/inomega/api/ci?callback=JSONPCallback",
        dataType: 'jsonp',
        jsonp: false,
        jsonpCallback: 'JSONPCallback',
        async: true,
        crossDomain: true,
        username: 'user1',
        password: 'user1',
        success: function (result) {
            ciName = result.app_name;
            ciColorPrim = result.color_prim;
            ciColorSec = result.color_sec;

            console.warn("CI: " + ciName + " " + ciColorPrim + " " + ciColorSec);

        },
        error: function (a, b, c) {
            console.warn(a + " " + b + " " + c + "ERROR");
        }
    })
        .fail(function (e) {
            console.warn(e.msg + "ERROR");
        });

    function JSONPCallback() {
        /*
         alert("callback");
*/
    }

}

function departmentAuth() {
    $.ajax({
        type: "GET",
        url: "http://" + un + ":" + pw + "@" + ip + ":8080/inomega/api/departments?callback=JSONPCallback",
        dataType: 'jsonp',
        jsonp: false,
        jsonpCallback: 'JSONPCallback',
        async: true,
        crossDomain: true,
        username: 'user1',
        password: 'user1',
        success: function (result) {
            $.each(result, function (key, val) {
                depnames[depamount] = val.name;
                console.log("DEPAUTH: " + depnames[depamount]);
                depamount++;

            });
            buildingAuth();
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
        .fail(function (e) {
            console.log(e.msg + "ERROR");
        });

    function JSONPCallback() {
        /* alert("callback");*/
    }
}

function buildingAuth() {
    $.ajax({
        type: "GET",
        url: "http://" + un + ":" + pw + "@" + ip + ":8080/inomega/api/buildings?callback=JSONPCallback",
        dataType: 'jsonp',
        jsonp: false,
        jsonpCallback: 'JSONPCallback',
        async: true,
        crossDomain: true,
        username: 'user1',
        password: 'user1',
        success: function (result) {
            $.each(result, function (key, val) {
                buildnames[buildamount] = val.name;
                console.log("BUILD AUTH: " + buildnames[buildamount]);
                buildamount++;

            });
            roomAuth();
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
        .fail(function (e) {
            console.log(e.msg + "ERROR");
        });

    function JSONPCallback() {
        /* alert("callback");*/
    }
}