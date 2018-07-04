var tw = tw || { components: {}};
/**
 * Render the "about" route. Show general information about the project 
 */
(function(tw, m) {
    'use strict';
    if(!tw.components) { tw.components =  {}}
    tw.components.about = {
        view: function() {
            return m("div", {class: "container"}, 
                m("div", {class: "content"},[
                    m("h2","_('Wie das Trinkwasser-Tool entstanden ist')"),
                    m("p","_('Trinkwasser gilt als das am besten kontrollierte Lebensmittel in Deutschland. Und trotzdem wissen wir sehr wenig über das Wasser, das bei uns aus dem Hahn kommt. Viele Kommunen veröffentlichen die Untersuchungsergebnisse auf ihren Webseiten. Für den Bürger sind diese Daten abrufbar - aber nicht greifbar. Was bedeutet ein Härtegrad von 9? Sind 200 Milligramm Calcium pro Liter viel oder wenig? Wie mineralreich unser Leitungswasser ist, zeigt sich erst, wenn wir es mit Wasser aus dem Handel vergleichen.')")
                ])
            );
        }
    };
})(tw, m);