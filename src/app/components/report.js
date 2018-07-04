var tw = tw || { components: {} };
/**
 * Render the "report" route. Show report details and map
 */
(function (tw, m) {
    'use strict';
    if (!tw.components) { tw.components = {} }
    tw.components.report = {
        view: function () {
            return m("div", { class: "container" },
                m(".columns", [
                    m(".column", m(heading)),
                    m(".column", m(tw.map))
                ])
            );
        }
    };

    var heading = {
        view: function () {
            return [
                m("div", { class: "title is-3" }, [
                    "_('Information zu') ",
                    m("em", { id: "current-location" }, tw.models.reports.selected.zone ? tw.models.reports.selected.zone.properties.name : " ")
                ]),
                m("div", { id: "report-details" }, [
                    m("p", [
                        "_('Rapport'): ",
                        m("em", { class: "zone-id" }, tw.models.reports.selected.name),
                        " - ",
                        m("em", { class: "zone-data-year" }, tw.models.reports.selected.year)
                    ]),
                    m("p", { class: "report-authority" }, [
                        "_('Autorität'): ",
                        m("span", { id: "report-authority" }, tw.models.reports.selected.authority ? tw.models.reports.selected.authority.name : " ")
                    ]),
                    m("p", { class: "report-operator" }, [
                        "_('Betreiber'): ",
                        m("span", { id: "report-operator" }, tw.models.reports.selected.operator ? tw.models.reports.selected.operator.name : " ")
                    ]),
                    m("p", { class: "report-plant" }, [
                        "_('Produktstandorte'): ",
                        m("span", { id: "report-plant" }, tw.models.reports.selected.plants ? tw.models.reports.selected.plants[0].properties.name : " ")
                    ]),
                    m("p", m("span", { class: "zone-data-count" }, tw.models.reports.selected.observations ? tw.models.reports.selected.observations.length : ""), " _('Beobachtungen')")
                ])
            ];
        }
    }

})(tw, m);