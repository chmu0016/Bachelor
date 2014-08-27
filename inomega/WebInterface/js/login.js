$(document).ready(function () {
    login();
});
var langname = "de";
var username = "";
var password = "";
var ciName, ciColorPrim, ciColorSec;
// Sprachauswahl und übermitteln der logindaten
function login() {
    $('a[href="#"]').click(function(e) {
   e.preventDefault();
});
    // Klick auf Sprache
    $(".flaggen").click(function () {
        langname = $(this).attr("id");
        console.warn(langname);
    });
    // Logindaten speichern und im localstorage speichern
    $("#submit").click(function () {
        username = $("#username").val();
        password = $("#passwort").val();
        ipAdresse = "192.168.1.130";
        localStorage.setItem("ip", ipAdresse);
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("lang", langname);

        window.location.replace("index.html");
    });
}