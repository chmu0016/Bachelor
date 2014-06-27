$(document).ready(function () {
var ip = "192.168.178.55";
// ---- CLIENT IP -----
// Laptop Zu hause  192.168.178.75
// PC Zu hause      changes everytime
// PC Arbeit        192.168.1.148
    $("#submit").click(function () {
        username = $("#username").val();
        password = $("#passwort").val();

        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        window.location.replace("http://" + ip + "/inomega/WebInterface/index.html");
    });
});

var username, password;