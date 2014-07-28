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

        // Profil hinzufügen klicken
        $("#profileAddBtn").unbind('click').click(function () {
            $("#profileUploadContent").fadeIn("fast", function () {
                $("#profileContent").fadeOut("fast");

                $("#picker").css("top", "-80px");
                $("#picker").css("left", "5px");
                $("#picker").css("z-index", 2);

            });


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
        $("#profileContent").fadeToggle("fast");
    });
    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            if ($("#profileContent").is(":visible")) {
                $("#profileContent").fadeOut("fast");
            } else if ($("#profileUploadContent").is(":visible")) {
                $("#profileContent").fadeIn("fast", function () {

                    $("#profileUploadContent").fadeOut("fast");

                    $("#picker").css("top", "");
                    $("#picker").css("left", "");
                    $("#picker").css("z-index", "");
                });

            }
        }
    });

}

function profileDelete() {
    $(".btnDelete").unbind('click').click(function () {
        var profID = $(this).closest("div").attr("id");
        var profIDLength = profID.length;
        var profIDSubstr = profID.substring(7, profIDLength);


        var url = "http://" + un + ":" + pw + "@" + ip + ":8080/inomega/api/rooms/" + clickedRoom + "/profiles/" + profIDSubstr + "?callback=JSONPCallback";
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

                console.info(returnedData);

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