var tw = tw || { components: {}};
(function(tw, m) {
    'use strict';
    if(!tw.components) { tw.components =  {}};
    tw.components.main = {
        view: function() {
            return m("div",{class: "hero-body" }, m(container));
        }
    }
    var container = {
        view: function() {
            tw.geocoder.setSize("is-large");
            tw.geocoder.setForm(true);
            return m("div", {class: "container"},
                [
                    m("h1", { class: "title" }, "_('Was steckt in meinem Leitungswasser?')"),
                    m("h2", { class: "subtitle" }, "_('main_subtitle')"),
                    m(tw.geocoder)
                ]
            );
        }
    }
})(tw,m);