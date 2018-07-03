var tw = tw || { components: {}};
/**
 * Render the navbar. Should not be visible on the main page, but needs to be shown
 * on all other pages
 */
(function(tw, m) {
    'use strict';
    if(!tw.components) { tw.components =  {}};
    tw.components.navigation = {
        view: function() {
            return m(navbar);
        }
    }
    var navbar = {
        view: function() {
            return [
                m(brand),
                m(menu)
            ];
        }
    }

    var brand = {
        view: function() {
            return m("div", { class: "navbar-brand" }, 
                [
                    m("span", {class: "navbar-item"}, 
                        m("img",{ src: "../img/white-logo.png", alt: "_('Code For Europe Logo')" })
                    ),
                    m("span", {class: "navbar-item"}, "_('Was steckt in meinem Leitungswasser?')"),
                    m(toggler)
                ]
            )
        }
    }

    var toggler = {
        view: function() {
            return m("a", { role: "button", class: "navbar-burger", "aria-label": "menu", "aria-expanded": "false" }, 
                [
                    m("span", {"aria-hidden": "true"}),
                    m("span", {"aria-hidden": "true"}),
                    m("span", {"aria-hidden": "true"})
                ]
            )
        }
    }

    var menu = {
        view: function() {
            return m("div", { class: "navbar-menu is-hidden-mobile" }, [
                m(search),
                m(buttons)
            ]);
            
        }
    }

    var search = {
        view: function() {
            tw.geocoder.setSize("");
            return m("div", { class: "navbar-start" },
                m("div", { class: "navbar-item" },
                    m(tw.geocoder)
                )
            );
        }
    }

    var buttons = {
        view: function() {
            return m("div", { class: "navbar-end"},[
                m("a", {title: "_('Home')", class: "navbar-item home-button", href: "#/home"}, 
                    m("i", {class: "fa fa-home"})
                ),
                m("a", {title: "_('Über das Projekt')",class: "navbar-item home-button", href: "#/about"}, 
                    m("i", {class: "fa fa-question"})
                ),
                m("a", {title: "_('Kontakt')",class: "navbar-item home-button", href: "#/contact"}, 
                    m("i", {class: "fa fa-envelope"})
                ),
                m("a", {title: "_('Mitwirkende')",class: "navbar-item home-button", href: "#/team"}, 
                    m("i", {class: "fa fa-user"})
                ),
                m("a", {title: "_('Github')",class: "navbar-item home-button", href: "https://github.com/codeforeurope/transparent-water"}, 
                    m("i", {class: "fa fa-github"})
                ),
                m("a", {title: "_('API')",class: "navbar-item home-button", href: "/docs"}, 
                    m("i", {class: "fa fa-wrench"})
                )
            ]);
        }
    }
})(tw,m);