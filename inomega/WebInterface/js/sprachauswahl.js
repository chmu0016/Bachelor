$(document).ready(function () {
    langAuth();
});
var languageName; // Name der Sprache 
var allLanguagesAmount = 0; // Gesamtanzahl der verfügbaren Sprachen

// Sprachen vom Server laden
function langAuth() {
    $.ajax({
        type: "GET",
        url: "http://192.168.178.49:8080/inomega/api/languages?callback=JSONPCallback",
        dataType: 'jsonp',
        jsonp: false,
        jsonpCallback: 'JSONPCallback',
        async: true,
        crossDomain: true,
        username: 'user1',
        password: 'user1',
        success: function (result) {
            $.each(result, function (key, val) {
                languageName[allLanguagesAmount] = val.languages;
                allLanguagesAmount++
            });
            addLang(); // Hinzufügen der Sprachen in HTML
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
        .fail(function (e) {
            console.log(e.msg + "ERROR");
        });

    function JSONPCallback() {
    }
}
// Hinzufügen der Sprachen in HTML
function addLang() {
    for (var i = 0; i < allLanguagesAmount; i++) {
        $("#sprachContent").last('<div id="' + languageName[i] + '" class="flaggen">' + languageName[i] + '</div>');
    }

}