// Initialize our namespace
var tw = tw || { data: {}};

(function (tw, L) {
  'use strict';



  var map;
  var zonelayer;
  var plantlayer;
  /**
   *
   */
  var init = function () {
    map = L.map('result-map').setView([51.505, -0.09], 13);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  };

  var clear = function () {
    if(plantlayer){
      map.removeLayer(plantlayer);
    }
    if(zonelayer){
      map.removeLayer(zonelayer);
    }
  };
  var update = function (lon,lat) {
    map.invalidateSize();
    map.setView([lon, lat]);
  };

  var setPlants = function (plants) {
    plantlayer = L.geoJSON(plants);
    plantlayer.addTo(map);
  };

  var update = function (lon,lat) {
    map.invalidateSize();
    map.setView([lon, lat]);
  };

  var setZone = function (zone) {
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
    'init': init,
    'clear': clear,
    'update': update,
    'setZone': setZone,
    'setPlants': setPlants
  };
})(tw, L);
