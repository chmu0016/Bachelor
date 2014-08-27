$(document).ready(function () {
    langAuth();
});
var languageName = new Array(); // Name der Sprache 
var allLanguagesAmount = 0; // Gesamtanzahl der verfügbaren Sprachen

// Sprachen vom Server laden
function langAuth() {
    $.ajax({
        type: "GET",
        url: "http://192.168.1.130:8080/inomega/api/languages?callback=JSONPCallback",
        dataType: 'jsonp',
        jsonp: false,
        jsonpCallback: 'JSONPCallback',
        async: true,
        crossDomain: true,
        username: 'user1',
        password: 'user1',
        success: function (result) {
            languageName[allLanguagesAmount] = "";
            for (var i = 0; i < result.languages.length; i++) {
                if (result.languages[i] != ",") {
                    languageName[allLanguagesAmount] += result.languages[i];
                } else {
                    allLanguagesAmount++;
                    languageName[allLanguagesAmount] = "";
                }
            }
            console.warn(allLanguagesAmount);
            addLang(); // Hinzufügen der Sprachen in HTML
            ciLogin(); // laden des CI
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
        }
    })
        .fail(function (e) {
            console.log(e.msg + "ERROR");
        });

    function JSONPCallback() {}
}
// Hinzufügen der Sprachen in HTML
function addLang() {
    for (var i = 0; i <= allLanguagesAmount; i++) {
        $("#sprachContent").append('<a class="flaggen" href="#" tabindex="0"><div id="' + languageName[i] + '" class="flaggen">' + languageName[i] + '</div></a>');
    }

}