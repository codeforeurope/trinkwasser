var tw = tw || { components: {}};
(function(tw, m) {
    'use strict';
    if(!tw.components) { tw.components =  {}};
    tw.components.contact = {
        view: function() {
            return m("div", {class: "container"}, 
                m("div", {class: "content"},[
                    m("h2","_('Kontakt')"),
                    m("h5","_('Wir freuen uns über Feedback:')"),
                    m("p","_('E-Mail:')"," ", m("a", "_('wasser')", m.trust('<!--nospam@blockscanners123987.de-->&#64;'), "_('opendatalab.de')")),
                    m("p","_('Aufgrund der zahlreichen Daten kann es vereinzelt zu fehlerhaften Angaben kommen. Haben Sie einen Fehler entdeckt? Schreiben Sie uns!')"),
                    m("p","_('Oder sind Sie Mitarbeiter einer Kommune und möchten Ihre Daten eintragen? Schicken Sie uns einfach Ihre Daten per E-Mail.')")
                ])
            );
        }
    }
})(tw, m);