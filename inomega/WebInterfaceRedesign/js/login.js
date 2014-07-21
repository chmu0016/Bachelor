$(document).ready(function () {
    // ---- CLIENT IP -----
    // Laptop Zu hause  192.168.178.75
    // PC Zu hause      changes everytime
    // PC Arbeit        192.168.1.148

    login();
});
var username = "";
var password = "";

function login() {
    $("#submit").click(function () {
        username = $("#username").val();
        password = $("#passwort").val();
        ipAdresse = $("#ipAdresseText").val();

        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("ipAdresse", ipAdresse);

        window.location.replace("http://" + ipAdresse + "/Bachelor/inomega/WebInterfaceRedesign/index.html");
    });
}