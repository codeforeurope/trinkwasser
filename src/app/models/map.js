var tw = tw || {
    models: {}
};
/**
 * Simple model to store map state information
 */
(function (tw, m) {
    'use strict';
    if (!tw.models) {
        tw.models = {}
    };

    tw.models.map = {
        center: {
            lat: 0,
            lon: 0
        },
        setCenter: function (location) {
            var coords = location.split(',');

            if (coords.length > 0) {
                tw.models.map.center = {
                    lat: coords[0],
                    lon: coords[1]
                }
            }
        }
    }

})(tw, m);