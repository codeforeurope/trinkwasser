// Initialize our namespace
var tw = tw || { data: {}};

(function (tw, $) {
  'use strict';

  /**
   * Get the language from the path
   */
  var getLang = function () {
    var pathArray = window.location.pathname.split('/');
    //get the two letter code from the array
    for (var i = 0; i < pathArray.length; i++) {
      if(pathArray[i].length === 2){
        return pathArray[i];
      }
    }
    return 'en'; //Default language
  };

  /**
   * Get the List of products (bottled water)
   * @param {function} callback function to pass the result to
   */
  var getProducts = function(callback){
    //Get the zone for the current location.
    $.getJSON(tw.config.api_endpoint + '/products',{lang: getLang()}, function(data){
      if (data) {
        data.forEach(function (attribute) {
          //create a tab for each observation
          $('#products').append('<button type="button" class="btn btn-primary btn-lg btn-block" data-water="' + attribute.id + '">' + attribute.name +
          //'<br /><small class="vendor-small">' + attribute.vendor.name + '</small>' +
          '</button>');
        });
        callback(data);
      }
    });
  };

  /**
   * Get the averages of all substances.
   * @param {function} callback function to pass the result to
   */
  var getAverages = function (callback) {
    $.getJSON(tw.config.api_endpoint + '/observations/average',{lang: getLang()}, function(data){
      if (data) {
        callback(data);
      }
    });
  };

  /**
   * Get the legal limits for the given location, let us default to EU for now.
   * @param {string} code the code to retrieve the values from
   * @param {function} callback function to pass the result to
   */
  var getLimit = function (code, callback) {
    $.getJSON(tw.config.api_endpoint + '/norm',{code: code, lang: getLang()}, function(data){
      if (data) {
        callback(data);
      }
    });
  };

  /**
   * Get the legal limits for the given location, let us default to EU for now.
   * @param {function} callback function to pass the result to
   */
  var getLimits = function (callback) {
    $.getJSON(tw.config.api_endpoint + '/norms',{lang: getLang()}, function(data){
      if (data) {
        callback(data);
      }
    });
  };


  var transformLimit = function(observation, transformto){
    if(observation.max || observation.max == 0){
        var converted = math.eval(observation.max + ' ' + observation.uom.code + ' to ' + transformto.code);
        observation.max = parseFloat(converted.to(transformto.code).toString().split(' ')[0]).toFixed(2);
    }
    if(observation.min || observation.min == 0){
        var converted = math.eval(observation.min + ' ' + observation.uom.code + ' to ' + transformto.code);
        observation.min = parseFloat(converted.to(transformto.code).toString().split(' ')[0]).toFixed(2);
    }
    if(observation.average || observation.average == 0){
        var converted = math.eval(observation.average + ' ' + observation.uom.code + ' to ' + transformto.code);
        observation.average = parseFloat(converted.to(transformto.code).toString().split(' ')[0]).toFixed(2);
    }
    if(observation.value || observation.value == 0){
        var converted = math.eval(observation.value + ' ' + observation.uom.code + ' to ' + transformto.code);
        observation.value = parseFloat(converted.to(transformto.code).toString().split(' ')[0]).toFixed(2);
    }
    observation.uom = transformto;
    return observation;
  };

  /**
   * Get the value for a limit from tw.data.limits
   */
  var evaluateLimit = function(observation) {
    var table = $('<table class="table"><thead><tr><th>Standard</th><th>' + tw.i18n.min  + '</th><th>' + tw.i18n.max + '</th><th>' + tw.i18n.score + '</th></tr></thead></table>');
    var tbody = $('<tbody></tbody>');
    for (var i = 0; i < tw.data.limits.length; i++) {
      //Each limit
      var name = tw.data.limits[i].name;
      var limitvalues = tw.data.limits[i].observations;
      var standard = $('<tr><td>' + name + '</td></tr>');
      var val = "-";
      var min = '-';
      var max = '-';
      for (var j = 0; j < limitvalues.length; j++) {
        if(limitvalues[j].code === observation.code) {
          var limit = transformLimit(limitvalues[j], observation.uom);
          min = limit.min || '-';
          max = limit.max || '-';
          if ((limit.min || limit.min == 0) && !limit.max) {
            // At least. If actual value is higher, thumbs up
            if(observation.value >= limit.min){
              val = '<span class="icon is-small"><i class="fa fa-thumbs-up green" title="' + tw.i18n.morethan + ' ' + limit.min + ' ' + limit.uom.label + '"></i></span>';
            } else {
              val = '<span class="icon is-small"><i class="fa fa-thumbs-down red" title="'+  tw.i18n.lessthan + ' ' + limit.min + ' ' + limit.uom.label + '"></i></span>';
            }
          } else if((limit.max || limit.max == 0) && !limit.min){
            // At most. If actual value is lower, thumbs up
            if(observation.value <= limit.max){
              val = '<span class="icon is-small"><i class="fa fa-thumbs-up green" title="' + tw.i18n.lessthan + ' ' + limit.max + ' ' + limit.uom.label + '"></i></span>';
            } else {
              val = '<span class="icon is-small"><i class="fa fa-thumbs-down red" title="' + tw.i18n.morethan + ' ' + limit.max + ' ' + limit.uom.label + '"></i></span>';
            }
          } else if((limit.max || limit.max == 0) && (limit.min || limit.min == 0)){
            //Between
            if(observation.value <= limit.max && observation.value >= limit.min){
              val = '<span class="icon is-small"><i class="fa fa-thumbs-up green" title="' + tw.i18n.between + ' ' + limit.min + ' - ' + limit.max + ' ' + limit.uom.label + '"></i></span>';
            } else {
              if(observation.value > limit.max){
                val = '<span class="icon is-small"><i class="fa fa-thumbs-down red" title="' + tw.i18n.morethan + ' ' + limit.max + ' ' + limit.uom.label + '"></i></span>';
              }
              if(observation.value < limit.min){
                val = '<span class="icon is-small"><i class="fa fa-thumbs-down red" title="' + tw.i18n.lessthan + ' ' + limit.max + ' ' + limit.uom.label + '"></i></span>';
              }
            }
          }
        }
      }
      //append
      standard.append('<td>' + min  + '</td>');
      standard.append('<td>' + max  + '</td>');
      standard.append('<td>' + val  + '</td>');
      tbody.append(standard);
    }
    table.append(tbody);
    var paragraph = $('<div></div>');
    paragraph.append('<em>' + ' ' + observation.uom.label + '</em>');
    paragraph.append(table);
    return paragraph; //Not found
  };

  /**
   * Get the value for a observation from tw.data.report
   */
  var getValue = function(nutrient, asLabel) {
    for (var i = 0; i < tw.data.report.observations.length; i++) {
      if(tw.data.report.observations[i].code === nutrient){
        if(asLabel){
          return tw.data.report.observations[i].value.toFixed(2) +
            " " +
            tw.data.report.observations[i].uom.label;
        }
        return tw.data.report.observations[i].value;
      }
    }
    return; //Not found
  };

  var getObservationValue = function(observation) {
    return observation.value;
  };
  /**
   * Get the value for a observation from tw.data.report
   */
  var getProductValue = function(nutrient, product, type) {
    for (var i = 0; i < product.observations.length; i++) {
      if(product.observations[i].code === nutrient){
        switch(type){
          case 'label':
            return product.observations[i].value.toFixed(2) +
              " " +
              product.observations[i].uom.label;
          case 'object':
            return product.observations[i];
          default:
            return product.observations[i].value;
        }
      }
    }
    return; //Not found
  };

  /**
   * Get the legal limits for the given location, let us default to EU for now.
   * @param {float} lat latitude of the user location
   * @param {float} lon longitude of the user location
   * @param {function} callback function to pass the result to
   */
  var getProduct = function (id, callback) {
    $.getJSON(tw.config.api_endpoint + '/product/' + id, {lang: getLang()}, function(data){
        callback(data);
    });
  };

  /**
   * Get the legal limits for the given location, let us default to EU for now.
   * @param {float} lat latitude of the user location
   * @param {float} lon longitude of the user location
   * @param {function} callback function to pass the result to
   */
  var getReport = function (lat, lon, callback) {
    lat = lat || 49.1925;
    lon = lon || 9.2254;
    $('#result-observations').html('');
    $.getJSON(tw.config.api_endpoint + '/report',{lat: lat, lon: lon, geometry: true, lang: getLang()}, function(data){
      callback(data);
    });
  };

  /**
   *
   * @param {*} value
   */
  var isRange = function (value) {
    return value.toString().indexOf('-') > -1;
  };

  /**
   *
   * @param {*} value
   */
  var getRange = function (value) {
    var indexOfHyphen = value.indexOf('-');
    var min = parseInt(value.substr(0, indexOfHyphen), 10);
    var max = parseInt(value.substr(indexOfHyphen + 1), 10);
    return [min, max];
  };

  /**
   *
   * @param {*} value
   */
  var getMeanValue = function (value) {
    var temp = 0;
    if (value || !isRange(value)) {
      temp = value;
    } else {
      var minMax = getRange(value);
      temp = minMax[0] + ((minMax[1] - minMax[0]) / 2);
    }
    return temp;
  };

  /**
   *
   * @param {*} d
   */
  var returnArgument = function (d) {
    return d;
  };

  /**
   * Where does this formula originate from?
   * http://www.who.int/water_sanitation_health/dwq/chemicals/hardness.pdf
   * @param {*} calcium
   * @param {*} magnesium
   */
  var calculateHardness = function(calcium, magnesium){
    return Math.round(((0.14 * calcium) + (0.23 * magnesium)) * 10) / 10;
  };

  /**
   * Initialize the utils module
   */
  tw.utils = {
    'getLimits': getLimits,
    'getObservationValue': getObservationValue,
    'getLimit': getLimit,
    'evaluateLimit': evaluateLimit,
    'getLang': getLang,
    'getValue': getValue,
    'getProductValue': getProductValue,
    'getAverages': getAverages,
    'getProducts': getProducts,
    'getProduct': getProduct,
    'getReport': getReport,
    'isRange': isRange,
    'getRange': getRange,
    'getMeanValue': getMeanValue,
    'returnArgument': returnArgument,
    'calculateHardness': calculateHardness
  };
})(tw, jQuery);
