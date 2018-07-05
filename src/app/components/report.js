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
                },
                m(".columns", [
                    m(".column", m(heading)),
                    m(".column", m(tw.map))
                ])
            );
        }
    };

    var heading = {
        view: function () {
            if(tw.models.reports.selected.zone){
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
                        }, tw.models.reports.selected.authority ? tw.models.reports.selected.authority.name : " ")
                    ]),
                    m("p", {
                        class: "report-operator"
                    }, [
                        "_('Betreiber'): ",
                        m("span", {
                            id: "report-operator"
                        }, tw.models.reports.selected.operator ? tw.models.reports.selected.operator.name : " ")
                    ]),
                    m("p", {
                        class: "report-plant"
                    }, [
                        "_('Produktstandorte'): ",
                        m("span", {
                            id: "report-plant"
                        }, tw.models.reports.selected.plants ? tw.models.reports.selected.plants[0].properties.name : " ")
                    ]),
                    m("p", m("span", {
                        class: "zone-data-count"
                    }, tw.models.reports.selected.observations ? tw.models.reports.selected.observations.length : ""), " _('Beobachtungen')")
                ])
            ];
            } else {
                return m("div",{ id: "result-failed", class: "notification is-warning"}, "_('Keine Information für den angegebenen Standort gefunden. Kontaktieren Sie uns, wenn Sie das Gefühl haben, dass dies ein Fehler ist oder erneut suchen')");
            }
        }
    }

})(tw, m);