$(document).ready(function () {
    // ---- CLIENT IP -----
    // Laptop Zu hause  192.168.178.75
    // PC Zu hause      changes everytime
    // PC Arbeit        192.168.1.148

    login();
});
var langname = "de";
var username = "";
var password = "";
var ciName, ciColorPrim, ciColorSec;

function login() {
    $(".flaggen").bind("click", function () {
        console.warn($(this).attr("id"));
        langname = $(this).attr("id");

    });
    $("#submit").click(function () {
        username = $("#username").val();
        password = $("#passwort").val();
        ipAdresse = $("#ipAdresseText").val();

        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("ip", ipAdresse);
        localStorage.setItem("lang", langname);

        window.location.replace("index.html");
    });
}
