(function (tw, m) {
    m.route.prefix("#");

    tw.Main = {
        view: function () {
            return [
                m("section", {
                    id: "main-section",
                    class: "hero is-primary is-medium title-section"
                }, m(tw.components.main)),
                m("section", {
                    id: "info-section",
                    class: "section"
                }, m(tw.components.info)),
            ]
        }
    }

    tw.View = {
        oninit: function (vnode) {
            tw.models.map.setCenter(vnode.attrs.location);
        },
        view: function () {
            return [
                m("nav", {
                    id: "navigation-section",
                    class: "navbar navbar-expand-lg navbar-dark is-primary",
                    role: "navigation",
                    "aria-label": "main navigation"
                }, m(tw.components.navigation)),
                m("section", {
                    id: "report-section",
                    class: "section"
                }, m(tw.components.report))
            ]
        }
    }

    tw.About = {
        view: function () {
            return [
                m("nav", {
                    id: "navigation-section",
                    class: "navbar navbar-expand-lg navbar-dark is-primary",
                    role: "navigation",
                    "aria-label": "main navigation"
                }, m(tw.components.navigation)),
                m("section", {
                    id: "about-section",
                    class: "section"
                }, m(tw.components.about)),
            ]
        }
    }

    tw.Contact = {
        view: function () {
            return [
                m("nav", {
                    id: "navigation-section",
                    class: "navbar navbar-expand-lg navbar-dark is-primary",
                    role: "navigation",
                    "aria-label": "main navigation"
                }, m(tw.components.navigation)),
                m("section", {
                    id: "contact-section",
                    class: "section"
                }, m(tw.components.contact)),
            ]
        }
    }

    tw.Team = {
        view: function () {
            return [
                m("nav", {
                    id: "navigation-section",
                    class: "navbar navbar-expand-lg navbar-dark is-primary",
                    role: "navigation",
                    "aria-label": "main navigation"
                }, m(tw.components.navigation)),
                m("section", {
                    id: "team-section",
                    class: "section"
                }, m(tw.components.team)),
            ]
        }
    }

    m.route(document.body, "/home", {
        "/home": tw.Main,
        "/view": tw.View,
        "/about": tw.About,
        "/contact": tw.Contact,
        "/team": tw.Team,
        "/quality/:location": tw.View,
        "/report/:location": tw.View
    });
})(tw, m);