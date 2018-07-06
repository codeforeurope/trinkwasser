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

    tw.models.norms = {
        list: [],
        fetchAll: function () {
            return m.request({
                    method: "GET",
                    url: tw.config.api_endpoint + "/norms",
                    data: {
                        lang: tw.language.get()
                    }
                })
                .then(function (response) {
                    tw.models.norms.list = response;
                })
        }
    }

})(tw, m);