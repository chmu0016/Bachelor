$(document).ready(function () {
    colorPickerIni();
});
var oldClickedBtnid, oldClickedSliderid, clickedBtnId, clickedSliderId;

function sliderHandling() {
    oldClickedBtnid = $("#btnSlider0").attr("id");
    oldClickedSliderid = $("#" + oldClickedBtnid).prev(".slider").attr("id");
    clickedBtnId = $("#btnSlider0").attr("id");
    clickedSliderId = $("#" + clickedBtnId).prev(".slider").attr("id");

    var clickedValue = $("#" + oldClickedSliderid).slider("value");
    var width = clickedValue * 0.24;

    var sliderName = $("#" + oldClickedSliderid + " .sliderLabel").text();
    $("#colorPickerContent .currentLightNameLabel").slideUp(function () {
        $("#colorPickerContent .currentLightNameLabel").text(sliderName);
        $("#colorPickerContent .currentLightNameLabel").slideDown();
    });
    $(".btnsSlider").click(function (e) {
        clickedBtnId = $(e.target).attr("id");
        clickedSliderId = $("#" + clickedBtnId).prev(".slider").attr("id");

        $("#" + oldClickedBtnid).fadeOut(0);
        $("#" + oldClickedSliderid).fadeOut(0, function () {
            $("#" + oldClickedBtnid + ".btnsSlider").removeClass("btnClicked");
            $("#" + oldClickedSliderid).toggleClass("sliderClicked", false);
            $("#" + oldClickedSliderid).fadeIn(0);
        });
        $("#" + oldClickedBtnid).fadeIn(0);

        $("#" + clickedBtnId).fadeOut(0);
        $("#" + clickedSliderId).fadeOut(0, function () {
            $("#" + clickedBtnId + ".btnsSlider").addClass("btnClicked");
            $("#" + clickedSliderId).toggleClass("sliderClicked", true);
            $("#" + clickedSliderId).fadeIn(0);
            oldClickedBtnid = clickedBtnId;
            oldClickedSliderid = clickedSliderId;
        });
        $("#" + clickedBtnId).fadeIn(0);

        var sliderName = $("#" + clickedSliderId + " .sliderLabel").text();
        $("#colorPickerContent .currentLightNameLabel").slideUp(function () {
            $("#colorPickerContent .currentLightNameLabel").text(sliderName);
            $("#colorPickerContent .currentLightNameLabel").slideDown();
        });
    });
}

function colorPickerIni() {

    // create canvas and context objects
    var canvas = document.getElementById('picker');
    var ctx = canvas.getContext('2d');

    // drawing active image
    var image = new Image();
    image.onload = function () {
        canvas.width = (image.width);
        canvas.height = (image.height);
        ctx.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
        $("#pickerBorder").css("width", (image.width) + "px");
        $("#pickerBorder").css("height", (image.height) + "px");
    }

    var imageSrc = 'img/colorwheel3.png';

    image.src = imageSrc;
    $('#picker').on("mousemove", function (e) { // mouse move handler
        // get coordinates of current position
        var canvasOffset = $(canvas).offset();
        var canvasX = Math.floor(e.pageX - canvasOffset.left);
        var canvasY = Math.floor(e.pageY - canvasOffset.top);

        // get current pixel
        var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
        var pixel = imageData.data;
        var hexString1 = pixel[0].toString(16);
        var hexString2 = pixel[1].toString(16);
        var hexString3 = pixel[2].toString(16);
        /*
        console.log("hex1:" + hexString1 + " hex2:" + hexString2 + " hex3:" + hexString3);
*/
        if (hexString1.length < 2) {
            hexString1 = '0' + hexString1;
        }
        if (hexString2.length < 2) {
            hexString2 = '0' + hexString2;
        }
        if (hexString3.length < 2) {
            hexString3 = '0' + hexString3;
        }
        var hexstring = '#' + hexString1 + hexString2 + hexString3

        // update preview color
        var pixelColor = hexstring;
        $('#preview').css('background-color', pixelColor);
    });


    $('#picker').on("click", function (e) {
        // get coordinates of current position
        var canvasOffset = $(canvas).offset();
        var canvasX = Math.floor(e.pageX - canvasOffset.left);
        var canvasY = Math.floor(e.pageY - canvasOffset.top);

        // get current pixel
        var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
        var pixel = imageData.data;
        var hexString1 = pixel[0].toString(16);
        var hexString2 = pixel[1].toString(16);
        var hexString3 = pixel[2].toString(16);

        if (hexString1.length < 2) {
            hexString1 = '0' + hexString1;
        }
        if (hexString2.length < 2) {
            hexString2 = '0' + hexString2;
        }
        if (hexString3.length < 2) {
            hexString3 = '0' + hexString3;
        }
        var hexstring = '#' + hexString1 + hexString2 + hexString3
        var pickedPixelColor = hexstring;

        changeColor(pickedPixelColor, 16);
    });
    // vordefinierte Colors
    $("#allColorsContent .allColors").click(function (e) {
        setPixelColor = $(e.target).closest("div").css("background-color");
        var firstPickedColor = $("#pColor1").css("background-color");
        var hexstringSet = "",
            hexstringFirst = "";
        colorPartsSet = setPixelColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        delete(colorPartsSet[0]); // = rgb(R, G, B), wird nicht gebraucht
        for (var i = 1; i <= 3; ++i) {
            colorPartsSet[i] = parseInt(colorPartsSet[i]).toString(16);
            if (colorPartsSet[i].length == 1) colorPartsSet[i] = '0' + colorPartsSet[i];
        }
        hexstringSet = '#' + colorPartsSet.join('');
        if (firstPickedColor == "rgba(0, 0, 0, 0)") {} else {

            colorPartsFirst = firstPickedColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            delete(colorPartsFirst[0]); // = rgb(R, G, B), wird nicht gebraucht
            for (var i = 1; i <= 3; ++i) {
                colorPartsFirst[i] = parseInt(colorPartsFirst[i]).toString(16);
                if (colorPartsFirst[i].length == 1) colorPartsFirst[i] = '0' + colorPartsFirst[i];
            }
            hexstringFirst = '#' + colorPartsFirst.join('');
        }
        if (hexstringSet != hexstringFirst) {
            changeColor(hexstringSet, 16);
            $("#" + clickedSliderId + ".ui-widget-content .ui-state-default").css("background", hexstringSet);
        } else {}
    });
    // Farbhistorie
    $(".pickedColors").click(function (e) {
        setPixelColor = $(e.target).closest("div").css("background-color");
        if (setPixelColor == "rgba(0, 0, 0, 0)") {} else {
            colorParts = setPixelColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            console.log(colorParts[0] + " " + colorParts[1] + " " + colorParts[2] + " " + colorParts[3]);
            delete(colorParts[0]); // = rgb(R, G, B), wird nicht gebraucht
            for (var i = 1; i <= 3; ++i) {
                colorParts[i] = parseInt(colorParts[i]).toString(16);
                if (colorParts[i].length == 1) colorParts[i] = '0' + colorParts[i];
            }
            var hexstring = '#' + colorParts.join('');
            console.log("HEXSTRING: " + hexstring);

            var pickedPixelColor = hexstring;
            var strId = $(e.target).attr("id");
            strId = strId.charAt(6) + strId.charAt(7);
            $(e.target).closest("div").css("background-color", "rgba(0,0,0,0)");
            if (setPixelColor != "rgba(0, 0, 0, 0)") {
                changeColor(hexstring, strId);
                $("#" + clickedSliderId + ".ui-widget-content .ui-state-default").css("background", hexstring);
            } else {}
        }
    });


    // Button zum switchen des colorpickers
    $("#switch").unbind().bind("click", function () {
        var img = new Image();
        var contentH = $("#colorPickerContent").outerHeight();
        $("#pickerBorder").toggleClass("border");
        $("#switch").fadeOut(100, function () {
            if ($("#switch").attr("src") == "img/icons/BildSwitch.svg") {
                $("#switch").attr("src", "img/colorwheel3_small.png").load();
                /*                $("#colorPickerContent").animate({
                    "height": contentH + 10 + "px"
                }, "fast", function () {
                    $("#btnImgUpload").fadeIn();
                });*/
                $("#btnImgUpload").fadeIn();
                $("#btnImgMax").fadeIn();
            } else {
                $("#switch").attr("src", "img/icons/BildSwitch.svg").load();
                $("#btnImgUpload").fadeOut();
                $("#btnImgMax").fadeOut();
            }
        });
        $("#switch").fadeIn(100);

        $("#btnImgUpload").unbind().bind("click", function () {
            $("#filesToUpload").trigger('click');
        });
        // Maximieren des Bildes
        $("#btnImgMax").unbind().bind("click", function () {
            var canvas = document.getElementById('picker');
            var ctx = canvas.getContext('2d');
            var scrW = $(window).width();
            var scrH =$(window).height();
            var pickedWidth = $("#btnImgUpload").offset().left;
            var bodyLeft = $("#sliderContentWrapper").offset().left;
            var distance = pickedWidth - bodyLeft;
            console.info("Page W: " + scrW + " H: " + scrH );
            var width = img.width/distance;
            canvas.width = img.width/width;
            canvas.height = img.height/width;
            console.info("Img W: " + canvas.width + " H: " + canvas.height);
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, (img.width/width), (img.height/width));
            $("#pickerWrapper").animate({
                "margin-top": 50 + "%",
                "top": -(screen.height / 2) + "px",
                "right": (scrW - distance) + "px",
                "left": -500 + "px",
            }, "fast");
        });

        $(document).keyup(function (e) {
            var width = img.width / 300;
            canvas.width = img.width / width;
            canvas.height = img.height / width;
/*
            console.warn("Canvas h: "+ canvas.height + "  w: " + canvas.width);
*/
            ctx.drawImage(img, 0, 0, (img.width / width), (img.height / width));
            if (e.keyCode == 27) {
                $("#pickerWrapper").animate({
                    "margin-top": 0 + "%",

                    "top": 0 + "px",
                    "left": 0 + "px",
                }, "fast", function () {

                });



            }
        });

        //  Bild in das Uploadfeld hineinziehen
        var holder = document.getElementById('picker');
        if ($("#pickerBorder").hasClass("border")) {

            $("#picker").fadeOut(function () {
                imageSrc = "img/upload.png"
                image.src = imageSrc;
            });
            $("#picker").fadeIn();

            holder.ondragover = function () {
                $("#pickerBorder").removeClass("border");
                $("#pickerBorder").addClass("hover");
                console.log("ondragover");
                return false;
            };
            holder.ondragleave = function () {
                $("#pickerBorder").removeClass("hover");
                $("#pickerBorder").addClass("border");
                console.log("ondragleave");
                return false;
            };
            holder.ondrop = function (e) {
                $("#pickerBorder").removeClass("hover");
                $("#pickerBorder").addClass("border");
                console.log("ondrop");

                e.preventDefault();

                var file = e.dataTransfer.files[0],
                    reader = new FileReader();
                reader.onload = function (event) {
                    var canvas = document.getElementById('picker');
                    var ctx = canvas.getContext('2d');

                    var img = new Image();
                    img.src = event.target.result;
                    img.onload = function () {
                        var width = img.width / 300;
                        canvas.width = (img.width / width);
                        canvas.height = (img.height / width);
                        ctx.drawImage(img, 0, 0, (img.width / width), (img.height / width));
                        console.info("Width: " + (img.width / width) + "   " + (img.height / width));
                        $("#pickerBorder").css("width", (img.width / width) + "px");
                        $("#pickerBorder").css("height", (img.height / width) + "px");
                    }
                };
                reader.readAsDataURL(file);

                return false;
            };
        } else {
            $("#picker").fadeOut(function () {
                imageSrc = "img/colorwheel3.png"
                image.src = imageSrc;
            });
            $("#picker").fadeIn();


            holder.ondragover = function () {}

        }


        // Klick auf Upload Button
        document.getElementById('filesToUpload').addEventListener('change', fileSelect, false);

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
                            var canvas = document.getElementById('picker');
                            var ctx = canvas.getContext('2d');


                            img.src = evt.target.result;
                            img.onload = function () {
                                /*  var parent = $("#pickedColorsContent").offsetTop();
                            var child = $("canvas").offsetTop();
                            console.info("PARENT: " + parent + " " + "CHILD: " + child);*/
                                var width = img.width / 300;
                                canvas.width = (img.width / width);
                                canvas.height = (img.height / width);
                                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, (img.width / width), (img.height / width));

                                $("#pickerBorder").css("width", (img.width / width) + "px");
                                $("#pickerBorder").css("height", (img.height / width) + "px");
                            }
                        };
                    }(file));
                    reader.readAsDataURL(file);

                }
            } else {
                alert('The File APIs are not fully supported in this browser.');
            }
        }
    });


}

function changeColor(picked, index) {
    var thumbColor = picked;
    var setPixelColor;
    var i = index;
    var clickedSliderIdLength = clickedSliderId.length;
    var clickedSliderIdSubstr = clickedSliderId.substring(6, clickedSliderIdLength);
    console.warn("slider: " + clickedSliderIdSubstr);
    if (clickedSliderIdSubstr == "AllLamps") {

        sendMessage(JSON.stringify({
            "action": "set",
            "room": clickedRoom,
            "param": "color",
            "value": thumbColor,
        }));
        $(".slider.ui-widget-content .ui-state-default").css("background", thumbColor);
    } else {

        sendMessage(JSON.stringify({
            "action": "set",
            "lamp": clickedSliderIdSubstr,
            "param": "color",
            "value": thumbColor,
        }));
        $("#" + clickedSliderId + ".ui-widget-content .ui-state-default").css("background", thumbColor);
    }

    for (i; i > 1; i--) {
        setPixelColor = $('#pColor' + (i - 1)).css('background-color');
        $('#pColor' + i).css('backgroundColor', setPixelColor);
        if (setPixelColor == "rgba(0, 0, 0, 0)") {

        } else if (setPixelColor == ($('#pColor' + i).css('background-color'))) {} else {
            $('#pColor' + i).css('backgroundColor', setPixelColor);
        }
        /*console.log("Color: " + i + " = " + setPixelColor);*/
    }
    $('#pColor1').css('backgroundColor', thumbColor);
}