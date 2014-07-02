$(document).ready(function () {

});

function profileIni() {
    profileDelete();
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
                "name": "LasttestCHRIS",
                "img_type": "jpg",
                "img": "/img/profiles/profile_default.png",
                "config": "mockup"
            };
            var jsonStrObj = JSON.stringify(profileJsonObj);

            var url = "http://" + un + ":" + pw + "@" + ip + ":8080/inomega/api/rooms/" + clickedRoom + "/profiles/add?callback=JSONPCallback";

            $.ajax({
                type: 'PUT',
                dataType: 'html',
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                url: url,
                jsonpCallback: "JSONPCallback",
                data: jsonStrObj,
                success: function (returnedData) {
                    /*alert(returnedData);*/
                    console.log('Success');
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.error('xhr : ' + xhr + " ajaxOptions : " + ajaxOptions + " thrownError : " + thrownError);
                },
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

function profileDelete() {
    $(".btnDelete").unbind('click').click(function () {
        var profID = $(this).closest("div").attr("id");
        var profIDLength = profID.length;
        var profIDSubstr = profID.substring(7, profIDLength);


        var url=  "http://" + un + ":" + pw + "@" + ip + ":8080/inomega/api/rooms/" + clickedRoom + "/profiles/" + profIDSubstr + "?callback=JSONPCallback";
        $.ajax({
            type: 'DELETE',
            dataType: 'html',
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            url: url,
            jsonpCallback: "JSONPCallback",
            success: function (returnedData) {
/*
                alert(returnedData);
*/
                console.log('Success');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.error('xhr : ' + xhr + " ajaxOptions : " + ajaxOptions + " thrownError : " + thrownError);
            },
        });

        function JSONPCallback() {

        }
        $("#" + profID).remove();
        console.log("Delete Profile: " + profID);
    });
}