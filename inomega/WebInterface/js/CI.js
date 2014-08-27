$(document).ready(function () {
    
});
// Corporate Identity vom Server beziehen und den Eigenschaften in CSS zuweisen
function ciLogin() {
    $.ajax({
        type: "GET",
        url: "http://192.168.1.130:8080/inomega/api/ci?callback=JSONPCallback",
        dataType: 'jsonp',
        jsonp: false,
        jsonpCallback: 'JSONPCallback',
        async: true,
        crossDomain: true,
        success: function (result) {
            ciName = result.app_name;
            ciColorPrim = result.color_prim;
            ciColorSec = result.color_sec;
            $("#ciWrapper").css("background-color", ciColorPrim);
            $("#loginTopContent").css("background-color", ciColorSec);
            $("#ciName").html(ciName);
        },
        error: function (a, b, c) {
            console.warn(a + " " + b + " " + c + "ERROR");
        }
    })
        .fail(function (e) {
            console.warn(e.msg + "ERROR");
        });

    function JSONPCallback() {

    }
}