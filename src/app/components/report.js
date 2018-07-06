var tw = tw || {
    components: {}
};
/**
 * Render the "report" route. Show report details and map
 */
(function (tw, m) {
    'use strict';
    if (!tw.components) {
        tw.components = {}
    }
    tw.components.report = {
        oninit: tw.models.reports.fetchOne,
        view: function () {
            return m("div", {
                class: "container"
            }, [
                m(".columns", [
                    m(".column", m(".content", m(heading))),
                    m(".column", m(tw.map))
                ]),
                m(".columns", [
                    m(".column", m(".content", m(table)))
                ])
            ]);
        }
    };

    var heading = {
        view: function () {
            if (tw.models.reports.selected.zone) {
                return [
                    m("div", {
                        class: "title is-3"
                    }, [
                        "_('Information zu') ",
                        m("em", {
                            id: "current-location",
                            class: "capitalize"
                        }, tw.models.reports.selected.zone ? tw.models.reports.selected.zone.properties.name.toProperCase() : " ")
                    ]),
                    m("div", {
                        id: "report-details"
                    }, [
                        m("p", [
                            "_('Rapport'): ",
                            m("em", {
                                class: "zone-id"
                            }, tw.models.reports.selected.name),
                            " - ",
                            m("em", {
                                class: "zone-data-year"
                            }, tw.models.reports.selected.year)
                        ]),
                        m("p", {
                            class: "report-authority"
                        }, [
                            "_('Autorität'): ",
                            m("span", {
                                id: "report-authority"
                            }, tw.models.reports.selected.authority ? m("a", {
                                href: tw.models.reports.selected.authority.url
                            }, tw.models.reports.selected.authority.name) : " ")
                        ]),
                        m("p", {
                            class: "report-operator"
                        }, [
                            "_('Betreiber'): ",
                            m("span", {
                                id: "report-operator"
                            }, tw.models.reports.selected.operator ? m("a", {
                                href: tw.models.reports.selected.operator.url
                            }, tw.models.reports.selected.operator.name) : " ")
                        ]),
                        m("p", {
                            class: "report-plant"
                        }, [
                            "_('Produktstandorte'): ",
                            m("span", {
                                id: "report-plant"
                            }, m("i", tw.models.reports.selected.plants ? tw.models.reports.selected.plants.map(function (plant) {
                                return plant.properties.name;
                            }).join(", ") : " "))
                        ]),
                        m("p", m("span", {
                            class: "zone-data-count"
                        }, tw.models.reports.selected.observations ? tw.models.reports.selected.observations.length : ""), " _('Beobachtungen')")
                    ])
                ];
            } else {
                return m("div", {
                    id: "result-failed",
                    class: "notification is-warning"
                }, "_('Keine Information für den angegebenen Standort gefunden. Kontaktieren Sie uns, wenn Sie das Gefühl haben, dass dies ein Fehler ist oder erneut suchen')");
            }
        }
    }

    var observationComponent = {
        collapsed: true,
        view: function(vnode){
            var item = vnode.attrs.item;
            return m("div", {
                class: ".card"
            }, [
                m("header", {
                    class: "card-header",
                    onclick: function(){
                        vnode.state.collapsed = !vnode.state.collapsed;
                    }
                }, [
                    m("p", {
                        class: "card-header-title"
                    }, item.code + " " + item.value + " " + item.uom.label),
                    m("a", {
                        class: "card-header-icon",
                    }, m("span", {
                        class: "icon"
                    }, m("i", {
                        class: vnode.state.collapsed ? "fa caret fa-angle-left": "fa caret fa-angle-down"
                    }, "")))
                ]),
                m("div", {class: "card-content", style: vnode.state.collapsed ? "display:none": ""}, 
                    m("p", item.description ? item.description: "_('Keine Information verfügbar')")
                )
            ])
        }
    };
    var table = {
        view: function () {
            if (tw.models.reports.selected.observations) {
                return m("div", {
                        id: "table-observations"
                    },
                    tw.models.reports.selected.observations.map(function (observation) {
                        return m(observationComponent, {item: observation});
                    })
                )
            }
        }
    }

})(tw, m);