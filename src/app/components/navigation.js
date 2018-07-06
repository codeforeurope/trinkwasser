var tw = tw || {
    components: {}
};
/**
 * Render the navbar. Should not be visible on the main page, but needs to be shown
 * on all other pages
 */
(function (tw, m) {
    'use strict';
    if (!tw.components) {
        tw.components = {}
    };
    tw.components.navigation = {
        oninit: function () {
            tw.geocoder.setSize("");
        },
        view: function () {
            return m(navbar);
        }
    }
    var navbar = {
        collapsed: true,
        view: function (vnode) {
            return [
                m("div", {
                    class: "navbar-brand"
                }, [
                    m("span", {
                            class: "navbar-item"
                        },
                        m("img", {
                            src: "../img/white-logo.png",
                            alt: "_('Code For Europe Logo')"
                        })
                    ),
                    m("span", {
                        class: "navbar-item"
                    }, "_('Was steckt in meinem Leitungswasser?')"),
                    m("a", {
                        role: "button",
                        class: vnode.state.collapsed ? "navbar-burger" : "navbar-burger is-active",
                        "aria-label": "menu",
                        "aria-expanded": "false",
                        onclick: function () {
                            vnode.state.collapsed = !vnode.state.collapsed;
                        }
                    }, [
                        m("span", {
                            "aria-hidden": "true"
                        }),
                        m("span", {
                            "aria-hidden": "true"
                        }),
                        m("span", {
                            "aria-hidden": "true"
                        })
                    ])
                ]),
                m("div", {
                    class: vnode.state.collapsed ? "navbar-menu" : "navbar-menu is-active is-paddingless",
                }, [
                    m("div", {
                            class: "navbar-start"
                        },
                        m("div", {
                            class: "navbar-item"
                        }, m(tw.geocoder))
                    ),
                    m("div", {
                        class: "navbar-end"
                    }, [
                        m("a", {
                                title: "_('Home')",
                                class: "navbar-item home-button",
                                href: "#/home"
                            }, vnode.state.collapsed ?
                            m("i", {
                                class: "fa fa-home"
                            }) :
                            m("span", "_('Home')")
                        ),
                        m("a", {
                                title: "_('Über das Projekt')",
                                class: "navbar-item home-button",
                                href: "#/about"
                            }, vnode.state.collapsed ?
                            m("i", {
                                class: "fa fa-question"
                            }) :
                            m("span", "_('Über das Projekt')")
                        ),
                        m("a", {
                                title: "_('Kontakt')",
                                class: "navbar-item home-button",
                                href: "#/contact"
                            }, vnode.state.collapsed ?
                            m("i", {
                                class: "fa fa-envelope"
                            }) :
                            m("span", "_('Kontakt')")
                        ),
                        m("a", {
                                title: "_('Mitwirkende')",
                                class: "navbar-item home-button",
                                href: "#/team"
                            }, vnode.state.collapsed ?
                            m("i", {
                                class: "fa fa-user"
                            }) :
                            m("span", "_('Mitwirkende')")
                        ),
                        m("a", {
                                title: "_('Github')",
                                class: "navbar-item home-button",
                                href: "https://github.com/codeforeurope/transparent-water"
                            }, vnode.state.collapsed ?
                            m("i", {
                                class: "fa fa-github"
                            }) :
                            m("span", "_('Github')")
                        ),
                        m("a", {
                                title: "_('API')",
                                class: "navbar-item home-button",
                                href: "/docs"
                            }, vnode.state.collapsed ?
                            m("i", {
                                class: "fa fa-wrench"
                            }) :
                            m("span", "_('API')")
                        )
                    ])
                ])
            ];
        }
    }
})(tw, m);