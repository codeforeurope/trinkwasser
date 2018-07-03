var tw = tw || { models: {}};
/**
 * Get a report valid at a given latitude/longitude
 */
(function(tw, m) {
    'use strict';
    if(!tw.models) { tw.models =  {}};

  
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

