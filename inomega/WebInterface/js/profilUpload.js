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

    // Klick auf Upload Button
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

                        base64str = getBase64Image(img);

                        img.src = evt.target.result;
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
        // Create an empty canvas element
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        // Copy the image contents to the canvas
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        // Get the data-URL formatted image
        // Firefox supports PNG and JPEG. You could check img.src to
        // guess the original format, but be aware the using "image/jpg"
        // will re-encode the image.
        var dataURL = canvas.toDataURL("image/png");

        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
    // Abbrechen Button
    $("#cancelBtn").unbind('click').click(function () {
        $("#profileUploadContent").fadeOut("fast");
        $("#picker").css("top", "");
        $("#picker").css("left", "");
        $("#picker").css("z-index", "");

    });
    // Speichern Button
    $("#uploadBtn").unbind('click').click(function () {
        $("#profileUploadContent").fadeOut("fast");
        
        $("#picker").css("top", "");
        $("#picker").css("left", "");
        $("#picker").css("z-index", "");

        profilname = $("#profilNameText").val();
        console.info("profilname: " + base64str);

        console.info(base64str);
        var profileJsonObj = {
            "name": profilname,
            "img_type": "png",
            "img": base64str,
            "config": [{
                "lamp": 1234,
                "color": "#FFFFFF",
                "brightness": 34,
                "state": "on",
                }]
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
                console.info(returnedData);
                console.log('Success');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.error('xhr : ' + xhr + " ajaxOptions : " + ajaxOptions + " thrownError : " + thrownError);
            },
        });

        function JSONPCallback() {

        }
    });

}