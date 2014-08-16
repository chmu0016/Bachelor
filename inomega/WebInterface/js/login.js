$(document).ready(function () {
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
        ipAdresse = "192.168.178.26";

        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("ip", ipAdresse);
        localStorage.setItem("lang", langname);

        window.location.replace("index.html");
    });
}
