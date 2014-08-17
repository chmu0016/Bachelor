$(document).ready(function () {
    profilUpload();
});

function profilUpload() {
    var img = new Image();
    var base64str, profilname;

    $("#profilBildUploadBtn").click(function () {
        console.warn("Click profilbild");
        $("#profileToUpload").trigger('click');
    });

    // Klick auf Profilbildupload Button
    document.getElementById('profileToUpload').addEventListener('change', fileSelect, false);

    function fileSelect(evt) {
        if (window.File && window.FileReader && window.FileList && window.Blob) {

            var files = evt.target.files;

            var result = '';
            var file;
            for (var i = 0; file = files[i]; i++) {
                // if the file is not an image, continue
                if (!file.type.match('image.*')) {
                    continue;
                }

                reader = new FileReader();
                reader.onload = (function (tFile) {
                    return function (evt) {
                        var canvas = document.getElementById('uploadContent');
                        var ctx = canvas.getContext('2d');


                        img.src = evt.target.result;
                        base64str = getBase64Image(img);
                        img.onload = function () {
                            /*  var parent = $("#pickedColorsContent").offsetTop();
                            var child = $("canvas").offsetTop();
                            console.info("PARENT: " + parent + " " + "CHILD: " + child);*/
                            if (img.width > img.height) {
                                var width = img.width / 300;
                                canvas.width = (img.width / width);
                                canvas.height = (img.height / width);
                                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, (img.width / width), (img.height / width));
                            } else {
                                var height = img.height / 150;
                                canvas.width = (img.width / height);
                                canvas.height = (img.height / height);
                                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, (img.width / height), (img.height / height));

                            }
                        }
                    };
                }(file));
                reader.readAsDataURL(file);

            }
        } else {
            alert('The File APIs are not fully supported in this browser.');
        }
    } // fileselect()

    function getBase64Image(img) {
        // Initialisierung Canvas und Context Objekte
        var canvasUpload = document.createElement("canvas");
        canvasUpload.width = img.width;
        canvasUpload.height = img.height;

        var ctx = canvasUpload.getContext("2d");
        ctx.drawImage(img, 0, 0);

        /*  Get the data-URL formatted image , irefox supports PNG and JPEG.
            You could check img.src to guess the original format, 
            but be aware the using "image/jpg" will re-encode the image. */
        var dataURL = canvasUpload.toDataURL("image/png");

        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
    // Klick auf Abbrechen Button
    $("#cancelBtn").unbind('click').click(function () {
        document.getElementsByName('profileBtnClass').disabled = true;
        $("#profileTopLabelContent").fadeIn("fast");
        $("#profileContent").fadeIn("fast", function () {

            $("#profileHinzTopLabelContent").fadeOut("fast");
            $("#profileUploadContent").fadeOut("fast");

            $("#picker").css("top", "");
            $("#picker").css("left", "");
            $("#picker").css("z-index", "");

            $("#pickerBorder").css("top", "");
            $("#pickerBorder").css("left", "");
            $("#pickerBorder").css("z-index", "");
        });


    });
    /*  Klick auf Speichern Button
        Neues Profil auf den Server laden */
    $("#uploadBtn").unbind('click').click(function () {
        document.getElementsByName('profileBtnClass').disabled = false;
        $("#profileContent").fadeOut("fast");
        $("#profileContent").fadeOut("fast", function () {

            $("#profileHinzTopLabelContent").fadeOut("fast");
            $("#profileUploadContent").fadeOut("fast");

            $("#picker").css("top", "");
            $("#picker").css("left", "");
            $("#picker").css("z-index", "");

            $("#pickerBorder").css("top", "");
            $("#pickerBorder").css("left", "");
            $("#pickerBorder").css("z-index", "");
        });

        profilname = $("#profilNameText").val();

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

                    lampamount++;
                });

                uploadConfig();
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

        function uploadConfig() {


            var uplConfig = [];
            for (var i = 0; i < lampamount; i++) {

                uplConfig.push({
                    "lamp": lampId[i],
                    "color": lampColor[i],
                    "brightness": lampBrightness[i],
                    "state": lampState[i],
                });

                console.info("up: " + JSON.stringify(uplConfig));

            }
            var profileJsonObj = {
                "name": profilname,
                "img_type": "png",
                "img": base64str,
                "config": uplConfig
            };
            var jsonStrObj = JSON.stringify(profileJsonObj);
            var url = "http://" + un + ":" + pw + "@" + ip + ":8080/inomega/api/rooms/" + (clickedRoom) + "/profiles/add?callback=JSONPCallback";

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
                    console.info(returnedData);
                    console.log('Success');
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.error('xhr : ' + xhr + " ajaxOptions : " + ajaxOptions + " thrownError : " + thrownError);
                },
            });

            function JSONPCallback() {

            }
        }
    });

}