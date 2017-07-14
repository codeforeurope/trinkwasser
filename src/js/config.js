var tw = tw || { data: {}};
tw.config = {
  // api_endpoint: "http://www.transparentwater.io/api",
  // api_doc: "http://www.transparentwater.io/docs",
  api_endpoint: "http://localhost:8081/api",
  api_doc: "http://localhost:8081/docs",
  geocoder: {
    search: 'http://open.mapquestapi.com/nominatim/v1/search.php',
    key: "BJlOjYiGd1RjyCk1VVDE3YLjDruBpngY"
  },
  map:{
    url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }
};
