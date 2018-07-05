var tw = {};
(function (tw) {
    'use strict';
    tw = tw || {};
    tw.config = {
        api_endpoint: "http://www.transparentwater.io/api",
        api_doc: "http://www.transparentwater.io/docs",
        geocoder: {
            search: 'http://open.mapquestapi.com/nominatim/v1/search.php',
            key: "BJlOjYiGd1RjyCk1VVDE3YLjDruBpngY"
        },
        map: {
            url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }
    };
})(tw);

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}).replace("_", " ");
};