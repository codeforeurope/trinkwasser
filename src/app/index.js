(function(tw, m) {
    //import navigation from "./components/navigation";
    //import main from "./components/main";
    //import info from "./components/info";
    //import about from "./components/about";
    //import contact from "./components/contact";
    //import team from "./components/team";
    m.route.prefix("#");

    tw.Main = {
        view: function(){
            return [ 
                m("section",{id: "main-section", class: "hero is-primary is-medium title-section"}, m(tw.components.main)),
                m("section",{id: "info-section", class: "section"}, m(tw.components.info)),
            ]
        }
    }

    tw.View = {
        oninit: function(vnode){
            function isEmpty(obj) {
                for(var key in obj) {
                    if(obj.hasOwnProperty(key))
                        return false;
                }
                return true;
            }
            //tw.models.products.fetchAll();
            console.log(vnode.attrs);
            console.log(tw.geocoder.selected);
            var coords = vnode.attrs.location.split(',');
            tw.models.reports.fetchOne(isEmpty(tw.geocoder.selected) ? {lat: coords[0], lon: coords[1] }: tw.geocoder.selected );
        },
        view: function(vnode){
            if(vnode.attrs.location){
                console.log(vnode.attrs.location);
            }
            return [ 
                m("nav",{id: "navigation-section", class: "navbar navbar-expand-lg navbar-dark is-primary", role: "navigation", "aria-label": "main navigation"}, m(tw.components.navigation)),
                m("section",{id: "report-section", class: "section"}, tw.models.products.list.map(function(product) {
                    return m(".user-list-item", product.name)
                }))
            ]
        }
    }

    tw.About = {
        view: function(){
            return [ 
                m("nav",{id: "navigation-section", class: "navbar navbar-expand-lg navbar-dark is-primary", role: "navigation", "aria-label": "main navigation"}, m(tw.components.navigation)),
                m("section",{id: "about-section", class: "section"}, m(tw.components.about)),
            ]
        }
    }

    tw.Contact = {
        view: function(){
            return [ 
                m("nav",{id: "navigation-section", class: "navbar navbar-expand-lg navbar-dark is-primary", role: "navigation", "aria-label": "main navigation"}, m(tw.components.navigation)),
                m("section",{id: "contact-section", class: "section"}, m(tw.components.contact)),
            ]
        }
    }

    tw.Team = {
        view: function(){
            return [ 
                m("nav",{id: "navigation-section", class: "navbar navbar-expand-lg navbar-dark is-primary", role: "navigation", "aria-label": "main navigation"}, m(tw.components.navigation)) ,
                m("section",{id: "team-section", class: "section"}, m(tw.components.team)),
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