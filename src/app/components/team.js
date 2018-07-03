var tw = tw || { components: {}};
/**
 * Render the "team" route. Show information about people involved in this project
 */
(function(tw, m) {
    'use strict';
    if(!tw.components) { tw.components =  {}};
    tw.components.team = {
        view: function() {
            return m("div", {class: "container"}, 
                m("div", {class: "content"},[
                    m("h2","_('Mitwirkende')"),
                    m("h5","_('Redaktionelle Umsetzung')"), m("p",
                    tw.models.people.list.map(function(person) {
                        if(person.department == "redaction"){
                            return m(".columns", [
                                m(".column is-three-fifths", person.name),
                                person.twitter ? m(".column", m("a", {href: "https://twitter.com/" + person.twitter}, m("i", {class: "fa fa-twitter"}))) : m(".column"),
                                person.github ? m(".column", m("a", {href: "https://github.com/" + person.github}, m("i", {class: "fa fa-github"}))) : m(".column")
                            ])
                        }
                    })),
                    m("h5","_('Gestaltung')"), m("p",
                    tw.models.people.list.map(function(person) {
                        if(person.department == "design"){
                            return m(".columns", [
                                m(".column is-three-fifths", person.name),
                                person.twitter ? m(".column", m("a", {href: "https://twitter.com/" + person.twitter}, m("i", {class: "fa fa-twitter"}))) : m(".column"),
                                person.github ? m(".column", m("a", {href: "https://github.com/" + person.github}, m("i", {class: "fa fa-github"}))) : m(".column")
                            ])
                        }
                    })),
                    m("h5","_('Programmierung')"), m("p",
                    tw.models.people.list.map(function(person) {
                        if(person.department == "development"){
                            return m(".columns", [
                                m(".column is-three-fifths", person.name),
                                person.twitter ? m(".column", m("a", {href: "https://twitter.com/" + person.twitter}, m("i", {class: "fa fa-twitter"}))) : m(".column"),
                                person.github ? m(".column", m("a", {href: "https://github.com/" + person.github}, m("i", {class: "fa fa-github"}))) : m(".column")
                            ])
                        }
                    })),
                    m("h5","_('Mitarbeit')"), m("p",
                    tw.models.people.list.map(function(person) {
                        if(person.department == "general"){
                            return m(".columns", [
                                m(".column is-three-fifths", person.name),
                                person.twitter ? m(".column", m("a", {href: "https://twitter.com/" + person.twitter}, m("i", {class: "fa fa-twitter"}))) : m(".column"),
                                person.github ? m(".column", m("a", {href: "https://github.com/" + person.github}, m("i", {class: "fa fa-github"}))) : m(".column")
                            ])
                        }
                    }))
                ])
            );
                    
        }
    }
})(tw, m);