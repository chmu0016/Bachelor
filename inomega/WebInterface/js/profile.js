$(document).ready(function () {

});

function profileIni() {
    var profileCheck = false;
    var oldProfile, roomProfileIndex, roomProfileIndexLength, roomProfileIndexSubstr;
    oldProfile = $(".profileContentImg:first-child").attr("id");
    $("#" + oldProfile).addClass("toggle");

    $(".profileBtnClass").unbind('click').click(function () {
        // Profil aktivieren
        $(".profileContentImg").unbind('click').click(function (e) {
            roomProfileIndex = $(this).attr("id");
            roomProfileIndexLength = roomProfileIndex.length;
            roomProfileIndexSubstr = roomProfileIndex.substring(7, roomProfileIndexLength);

            sendMessage(JSON.stringify({
                "action": "set",
                "room": clickedRoom,
                "param": "profile",
                "value": roomProfileIndexSubstr,
            }));
            $("#" + oldProfile).removeClass("toggle");
            $("#" + oldProfile + " .profileLabel").css("color", "rgba(255, 255, 255, .6)");
            oldProfile = roomProfileIndex;
            $("#" + roomProfileIndex).addClass("toggle");
            $("#" + roomProfileIndex + " .profileLabel").css("color", "rgba(255, 255, 255, 1)");
        });
        // Profil hinzufügen
        $("#profileAddBtn").unbind('click').click(function () {
            var profileJsonObj = {
                "name": "Testprofil",
                "img_type": "jpg",
                "img": "/img/profiles/deafault.jpeg",
                "config": "mockup",
            };
            var jsonStrObj = JSON.stringify(profileJsonObj);
            $.ajax({
                type: "PUT",
                url: "http://" + un + ":" + pw + "@" + ip + ":8080/inomega/api/rooms/" + clickedRoom + "/profiles/add",
                dataType: 'json',
                jsonp: false,
                jsonpCallback: 'JSONPCallback',
                async: true,
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                username: 'user1',
                password: 'user1',
                data: jsonStrObj,
                success: function (result) {
                    console.log("DONE");


                    removeProfiles();
                    if (result == "") {
                        console.log("RESULT null");
                    } else {
                        addProfiles();
                    }

                    startwebsocket();
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
        });
        // Profil aktualisieren
        /*var jsonobj = {
            "name": "Lasttest",
            "img_type": "jpg",
            "img": "/img/profiles/profile_default.png",
            "config": [{
                "id ": 123,
                "color ": "#cb00a1 ",
                "brightness ": "25 ",
                "state ": "on "
            }, {
            "id ": 456,
            "color ": "#cb00a1 ",
            "brightness ": "25 ",
            "state ": "on "
            }],
       };*/
        $("#profileContent").slideToggle();
    });

}