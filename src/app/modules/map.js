(function (tw, L) {
    'use strict';
    var map;
    var zonelayer;
    var plantlayer;
    /**
     *
     */
    var init = function (vnode) {
        map = L.map(vnode.dom).setView([tw.models.map.center.lat, tw.models.map.center.lon],10);
        map.invalidateSize();
        L.tileLayer(tw.config.map.url, {
            attribution: tw.config.map.attribution
        }).addTo(map);
    };

    var clear = function () {
        if(map){
            if(plantlayer){
              map.removeLayer(plantlayer);
            }
            if(zonelayer){
              map.removeLayer(zonelayer);
            }
        }
    };
    var update = function (lon,lat) {
        if(!map){
            map = L.map('result-map').setView([lon,lat],10);
            map.invalidateSize();
            L.tileLayer(tw.config.map.url, {
            attribution: tw.config.map.attribution
            }).addTo(map);
        } else {
            map.setView([lon, lat]);
        }
    };

    var setPlants = function (plants) {
        if(!map){
            init();
        }
        plantlayer = L.geoJSON(plants);
        plantlayer.addTo(map);
    };

    var setZone = function (zone) {
        if(!map){
            init();
        }
        zonelayer = L.geoJSON(zone, {
        style: function (feature) {
            return {fill: false};
        }});
        zonelayer.addTo(map);
        map.fitBounds(zonelayer.getBounds());
    };

    /**
     * Initialize the map module
     */
    tw.map = {
        init: init,
        clear: clear,
        update: update,
        setZone: setZone,
        setPlants: setPlants,
        view: function (vnode) {
            return m("div", { id: "result-map", class: "map", onupdate: tw.map.init });
        }
    };
})(tw, L);
