$(document).ready(function () {

});
function allRoomsContent(){
// Definition der Scrollbar wenn mehr Räume als dargestellt werden können, geladen werden
 $("#allRoomsImageContent").mCustomScrollbar({
        theme: "dark",
        scrollButtons: {
            enable: true
        },
        autoHideScrollbar: true,
        axis: "y",
    });
    var check = $(allRoomsImageContent).is(":visible"); // Variable check um zu prüfen, ob Alle Räume Content sichtbar ist
    var imgCheck = false;                               // Variable imgCheck um zu prüfen, ob ein Raum im Alle Räume Content ausgewählt wurde
    // Clicklistener für Alle Räume Button
    // Ein-/Ausblenden  des Alle Räume content 
    $("#allRoomsButton").click(function () {
        $("#allRoomsTopLabelContent").fadeToggle();
        $("#allRoomsImageContent").fadeToggle(function () {
            check = $(allRoomsImageContent).is(":visible");
        });
    });
    // Klick auf einen Raum im Alle Räume Content und imgCheck auf true setzen
    $(".imageAccordion").click(function () {
        imgCheck = true;
    });
    // Wenn man außerhalb des Alle Räume Content klickt, diesen ausblenden
    $("body").bind("click", function () {
        // Wenn Alle Räume Content sichtbar und man keinen Raum ausgewählt hat, Content ausblenden und Variable Check auf false setzen
        // Ansonsten imgCheck auf false setzen
        if (check == true && imgCheck == false) {
            $("#allRoomsImageContent").fadeOut();
            $("#allRoomsTopLabelContent").fadeOut();
            check = false
        } else {
            imgCheck = false;
        }
    });
}