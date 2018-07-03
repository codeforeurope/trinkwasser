var tw = tw || { models: {}};
(function(tw, m) {
    'use strict';
    if(!tw.models) { tw.models =  {}};

    /**
     * Get the List of products (bottled water)
     */
    tw.models.reports = {
        fetchOne: function(geocoderResult) {
            m.request({
                method: "GET",
                url: tw.config.api_endpoint + "/report",
                data: {
                    lang: tw.language.get(),
                    lat: geocoderResult.lat,
                    lon: geocoderResult.lon,
                    geometry: true
                }
            })
            .then(function(response) {
                tw.models.product.item = response;
            })
        }
    }

})(tw,m);

