var tw = tw || {
    models: {}
};
/**
 * Get a report valid at a given latitude/longitude
 */
(function (tw, m) {
    'use strict';
    if (!tw.models) {
        tw.models = {}
    };

    tw.models.reports = {
        selected: {},
        fetchOne: function () {
            console.log("report fetchOne");
            return m.request({
                    method: "GET",
                    url: tw.config.api_endpoint + "/report",
                    data: {
                        lang: tw.language.get(),
                        lat: tw.models.map.center.lat,
                        lon: tw.models.map.center.lon,
                        geometry: true
                    }
                })
                .then(function (response) {
                    tw.models.reports.selected = response;
                    tw.map.update();
                })
        }
    }

})(tw, m);