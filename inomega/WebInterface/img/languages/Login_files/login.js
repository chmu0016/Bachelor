$(document).ready(function () {
    // ---- CLIENT IP -----
    // Laptop Zu hause  192.168.178.75
    // PC Zu hause      changes everytime
    // PC Arbeit        192.168.1.148

    login();
    $("#sprachmenu").menu();

    $(".flaggen").bind("click", function () {
        console.warn($(this).attr("id"));
        langname = $(this).attr("id");

    })
});
var langname;
var username = "";
var password = "";

function login() {
    $("#submit").click(function () {
    langSelectAuth(langname);
        username = $("#username").val();
        password = $("#passwort").val();
        ipAdresse = $("#ipAdresseText").val();

        window.location.replace("http://" + ipAdresse + "/inomega/WebInterface/index.html");
    });
}