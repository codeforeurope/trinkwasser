(function (tw, L) {
    'use strict';
    var map;
    var zonelayer;
    var plantlayer;

    /**
     * Create the map. Should only be initiated once, on the oncreate event.
     */
    var create = function(vnode){
        map = L.map(vnode.dom).setView([tw.models.map.center.lat, tw.models.map.center.lon], 10);
        map.invalidateSize();
        L.tileLayer(tw.config.map.url, {
            attribution: tw.config.map.attribution
        }).addTo(map);
    }

    /**
     * Initialize the map module
     */
    tw.map = {
        create: create,
        /**
         * Remove all layers from the map
         */
        clear: function () {
            console.debug("map clear");
            if (map) {
                if (plantlayer) {
                    map.removeLayer(plantlayer);
                }
                if (zonelayer) {
                    map.removeLayer(zonelayer);
                }
            }
        },
        /**
         * Update or create the map
         */
        update: function () {
            console.debug("map update");
            if (!map) {
                var el = document.getElementById("result-map");
                if (el) {
                    map = L.map(el).setView([tw.models.map.center.lat, tw.models.map.center.lon], 10);
                    map.invalidateSize();
                    L.tileLayer(tw.config.map.url, {
                        attribution: tw.config.map.attribution
                    }).addTo(map);
                }
            } else {
                map.setView([tw.models.map.center.lat, tw.models.map.center.lon], 10);
            }

        },
        /**
         * Add a zone polygon to the map
         */
        setZone: function (zone) {
            console.debug("map setZone(" + zone + ")");
            if (!map) {
                create();
            }
            zonelayer = L.geoJSON(zone, {
                style: function (feature) {
                    return {
                        fill: false
                    };
                }
            });
            zonelayer.addTo(map);
            map.fitBounds(zonelayer.getBounds());
        },
        /**
         * Add plant markers to the map
         */
        setPlants: function (plants) {
            console.debug("map setPlants(" + plants + ")");
            if (!map) {
                create();
            }
            plantlayer = L.geoJSON(plants);
            plantlayer.addTo(map);
        },
        /**
         * Mithril view
         */
        view: function () {
            return m("div", {
                id: "result-map",
                class: "map",
                oncreate: tw.map.create
            });
        }
    };
})(tw, L);