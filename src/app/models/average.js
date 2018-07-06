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

    tw.models.average = {
        list: [],
        fetchAll: function () {
            return m.request({
                    method: "GET",
                    url: tw.config.api_endpoint + "/observations/average",
                    data: {
                        lang: tw.language.get()
                    }
                })
                .then(function (response) {
                    tw.models.average.list = response;
                })
        }
    }

})(tw, m);