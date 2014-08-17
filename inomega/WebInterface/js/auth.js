$(document).ready(function () {
    langSelectAuth(lang);
});
// Zuweisung Login Daten
var lang = localStorage.getItem("lang");
var un = localStorage.getItem("username");
var pw = localStorage.getItem("password");
var ip = localStorage.getItem("ip");

var roomnames = new Array();    // Namen der Räume
var roomBuild = new Array();    // Dem jeweiligen Raum zugewiesenen Gebäude
var roomamount = 0;             // Gesamtanzahl der Räume

var depnames = new Array();     // Name der Bereiche
var depId = new Array();        // ID der Bereiche
var depamount = 0;              // Gesamtanzahl der Bereiche

var buildnames = new Array();   // Name der Gebäude
var buildId = new Array();      // ID der Gebäude
var buildDep = new Array();     // Dem jeweiligen Gebäude zugewiesener Bereich
var buildamount = 0;            // Gesamtanzahl der Gebäude

var lampnames = new Array();        // Namen der Leuchten
var lampColor = new Array();        // Farbe der Leuchte
var lampBrightness = new Array();   // Helligkeit der Leuchte
var lampId = new Array();           // ID der Leuchte
var lampState = new Array();        // Zustand der Leuchte (ein-/ausgeschaltet)
var lampamount = 0;                 // Gesamtanzahl der Leuchten

var profileId = new Array()         // ID des Profils
var profileImage = new Array()      // Bild des Profils
var profileNames = new Array();     // Name des Profils
var profileType = new Array();      // Typ des Profils (Standard oder Benutzerdefiniert)
var profileAmount = 0;              // Gesamtanzahl der Profile

var ciName, ciColorPrim, ciColorSec;    // Name, Primär- und Sekundärfarbe der Corporate Identity

var languageName;           // Name der Sprache 
var allLanguagesAmount = 0; // Gesamtanzahl der verfügbaren Sprachen

var oldClickedRoom = 1;     // Zuletzt ausgewählter Raum
var clickedRoom = 0;        // Ausgewählter Raum


// Leuchten vom Server beziehen und Variablen zuweisen
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
            lampnames = [];
            lampColor = [];
            lampBrightness = [];
            lampId = [];
            lampState = [];
            lampamount = 0;
            // Jede Leuchte in dem Array den jeweiligen Wert zuweisen
            $.each(result, function (key, val) {
                lampnames[lampamount] = val.name;
                lampColor[lampamount] = val.color;
                lampBrightness[lampamount] = val.brightness;
                lampId[lampamount] = val.id;
                lampState[lampamount] = val.state;
                lampamount++;
            });
            removeSlider();                 // Slider des vorherigen Raums löschen
            addSlider();                    // Slider des aktuellen Raums hinzufügen
            sliderHandling();               // Clicklistener der Leuchten aktivieren
            unsubscribe(oldClickedRoom);    // Vom alten Raum abmelden um die Steuerung zu deaktivieren
            oldClickedRoom = clickedRoom;
            subscribe(clickedRoom);         // Im aktuellen Raum anmelden um Leuchten zu steuern
            profileAuth(clickedRoom);       // Profile des aktuellen Raums laden
            // Wenn es mehr als 10 Leuchten sind, wird der Scrollbare content aktiviert
            if (lampamount > 10) {
                sliderOverflow();
            }
            sliderThumbClick(); // Klick auf den Thumb des Sliders aktivieren
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
// Im Raum anmelden
function subscribe(clickedRoomAuth) {
    sendMessage(JSON.stringify({
        "action": "subscribe",
        "room": clickedRoomAuth,
    }));
}
// Vom Raum abmelden
function unsubscribe() {
    sendMessage(JSON.stringify({
        "action": "unsubscribe",
        "room": oldClickedRoom,
    }));
}
// Profile vom Server laden und variablen zuweisen
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
            profileImage = [];
            profileAmount = 0;
            // Jedem Profil den jeweiligen Wert zuweisen
            $.each(result, function (key, val) {
                profileNames[profileAmount] = val.name;
                profileId[profileAmount] = val.id;
                profileType[profileAmount] = val.type;
                profileImage[profileAmount] = val.img;
                profileAmount++;
            });
            removeProfiles();   // Profile des alten Raums löschen
            addProfiles();      // Profile des aktuellen Raums hinzufügen
            profileIni();       // Verwaltung der neuen Profile ermöglichen (Clicklistener etc.)

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
// Profilebereich und bilder in die HTML dynamisch hinzufügen
function addProfiles() {
    $("#colorPickerContent").after('<div id="profileTopLabelContent" class="topLabel"><button id="profileAddBtn"></button> <label for="profileTopLabelContent" class="profileTopLabel">Profile</label> </div> <div id="profileContent"> </div>');
    for (var i = 0; i <= profileAmount; i++) {
        if (i == profileAmount) {

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
        $("#img" + i).css("background-image", profileImage[i]);
    }
}
// Profilbereich löschen z.B. wenn keine Profile in einem Raum, bei Raumwechsel, vorhanden sind
function removeProfiles() {
    $("#profileContent").remove();
}
// Alte Leuchten löschen, bei Raumwechsel um neue Leuchten hinzuzufügen
function removeSlider() {
    $("#sliderContent").empty();
    $("#allLampsWrapper").empty();
}
// Hinzufügen der Leuchten als Slider in der HTML
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
    // Interaktion mit Slider, also ein-/Ausschalten, dimmen
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


// Räume vom Server laden und Variablen zuweisen
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
                roomBuild[roomamount] = val.building;
                roomamount++;
            });
            addRoom();
            allRoomsContent();
            imageSlider();

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
// Räume als HTML-Elemente in den Imageslider laden
function addRoom(roomValue) {
    var roomClicked = roomValue;
    if (roomamount >= 0) {
        $("#currentLightName").after('<div id="allRoomsButton">  </div>');
        $("#colorPickerContent").after('<div id="allRoomsTopLabelContent" class="topLabel"> <button id="colorPickerSwitchBtn"></button> <label for="allRoomsTopLabelContent" class="allRoomsTopLabel">Alle Räume</label></div>   <div id="allRoomsImageContent"></div>');
        for (var i = 0; i < roomamount; i++) {
            if (roomClicked == roomBuild[i]) {

                $("#raumImageContent").append('<div id="imgWrapper' + i + '" class="roomImageWrapper"> </div>');
                $("#imgWrapper" + i).append('<div id="img' + i + '" class="roomImage"> </div>');
                $("#img" + i).append('<label for="img' + i + '" class="roomLabel">' + roomnames[i] + '</label>');
                $("#imgWrapper" + i).append('<div id="toggleOnOff' + i + '" class="toggleOnOff"> </div>');
                $("#imgWrapper" + i).append('<div id="profileBtn' + i + '" class="profileBtnClass"> </div>');

                $("#allRoomsImageContent").append('<div id="imgAcc' + i + '" class="roomImageAccordion roomImage">');
                $("#imgAcc" + i).append('<label for="imgAcc' + i + '" class="labelimgAcc">' + roomnames[i] + '</label>');
            }
        }
    } else {

    }
    raumClicklistener();
}
// Corporate Identity vom Server beziehen und den Eigenschaften in CSS zuweisen
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
            $("#ciWrapper").css("background-color", ciColorPrim);
            $("#sliderAllLamps").css("background-color", ciColorSec);
            $("#btnSliderAllLamps").css("background-color", ciColorSec);
            $(".topLabel").css("background-color", ciColorSec);
            $("#ciName").html(ciName);
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
// Bereiche vom Server beziehen und in Variablen speichern
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
                depId[depamount] = val.id;
                depnames[depamount] = val.name;
                depamount++;
            });
            addDepartments();
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
// Bereiche im Imageslider als HTML-Elemente hinzufügen
function addDepartments() {
    for (var i = 0; i < depamount; i++) {
        $("#bereichImageContent").append('<div id="bereich' + depId[i] + '" class="bereiche"><label for="bereich' + depId[i] + '" class="bereicheLabel">' + depnames[i] + '</label> </div>');
    }
}
// Gebäude vom Server beziehen und in Variablen speichern
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
                buildId[buildamount] = val.id;
                buildDep[buildamount] = val.departments;
                buildamount++;
                console.info(buildamount);

            });
            // addBuildings();
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
// Gebäude im Imageslider als HTML-Elemente hinzufügen
function addBuildings(depValue) {
    var depClicked = depValue;
    for (var i = 0; i < buildamount; i++) {
        if (depClicked == buildDep[i]) {
            $("#gebäudeImageContent").append('<div id="gebäude' + buildId[i] + '" class="gebäude"><label for="gebäude' + buildId[i] + '" class="gebäudeLabel">' + buildnames[i] + '</label> </div>');
        }
    }
    clicklistener();
}
// Sprachen vom Server laden
function langAuth() {
    $.ajax({
        type: "GET",
        url: "http://" + un + ":" + pw + "@" + ip + ":8080/inomega/api/languages?callback=JSONPCallback",
        dataType: 'jsonp',
        jsonp: false,
        jsonpCallback: 'JSONPCallback',
        async: true,
        crossDomain: true,
        username: 'user1',
        password: 'user1',
        success: function (result) {
            $.each(result, function (key, val) {
                languageName[lampamount] = val.languages;
                console.warn(languageName[allLanguagesAmount]);
                allLanguagesAmount++
            });
            getVar();
            departmentAuth();
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
// Ausgewählte Sprache aus dem Login Screen dem Server melden
function langSelectAuth(langname) {
    var lang = langname;
    console.info(lang);
    $.ajax({
        type: "GET",
        url: "http://" + un + ":" + pw + "@" + ip + ":8080/inomega/api/languages/select/" + lang + "?callback=JSONPCallback",
        dataType: 'jsonp',
        jsonp: false,
        jsonpCallback: 'JSONPCallback',
        async: true,
        crossDomain: true,
        username: 'user1',
        password: 'user1',
        success: function (result) {
            console.warn("Language Selected: " + result.language);
            departmentAuth();
            corpIdent();
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