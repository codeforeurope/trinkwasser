// Initialize our namespace
var tw = tw || { data: {}};

(function (tw, $) {
  'use strict';
  tw.data.nutrientDailyDosis = {
    "Kalium": '~ 2000 mg',
    "Calcium": '~ 1000 mg',
    "Magnesium": '~ 350 mg'
  };
  var defs = {
    'hardness': {
      'min': 0,
      'max': 28,
      'parts': [{
        'id': 1,
        'x': 0,
        'width': 225,
        'label': 'weich',
        'rangeLabel': '&lt; 8,4 °dH'
      }, {
        'id': 2,
        'x': 225,
        'width': 150,
        'label': 'mittel',
        'rangeLabel': '8,4 - 14 °dH'
      }, {
        'id': 3,
        'x': 375,
        'width': 375,
        'label': 'hart',
        'rangeLabel': '&gt; 14 °dH'
      },
      ]
    }
  };

  var areaData = null;
  var zoneData = null;
  var mapInstance = null;
  var zoneId = '';
  var attribute = null;
  var hasSelectedFirstLocation = false;
  var section = 'explanation';

  var updateAttributeContent = function () {
    var hit;
    if (attribute === 'info') {
      $('.result-with-value, .result-without-value').hide();
      $('.info-container').show();
    } else {
      $('.info-container').hide();
      for (var i = 0; i < tw.data.report.observations.length; i++) {
        if(tw.data.report.observations[i].code === attribute){
          hit = true;
          $('.result-without-value').hide();
          $('.result-with-value').show();
          tw.gauge.update(attribute);
          if (section === 'explanation') {
            tw.gauge.updateValue(attribute, tw.data.report.observations[i].value, tw.data.report);
          }
          if (section === 'compare') {
            tw.comparison.update(attribute, tw.data.report.observations[i].value);
          }
          if (section === 'map') {
            tw.map.update(attribute);
          }
          continue;
        }
      }
      if(!hit){
        $('.result-with-value').hide();
        $('.result-without-value').show();
      }
    }
  };

  var setupTabs = function (startAttribute) {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      attribute = $(e.target).data('attribute');
      $('.current-attribute-label').text($(e.target).text());
      section = 'explanation';
      updateSection();
      updateAttributeContent();
    });

    var startAttributeElement = $('a[data-attribute="' + startAttribute + '"]');
    startAttributeElement.parent().addClass('active').closest('.nav-li-main').addClass('active');
    $('.current-attribute-label').text(startAttributeElement.text());
    attribute = startAttribute;
  };

  var stringComparator = function (a, b) {
    a = a.toLowerCase();
    a = a.replace(/ä/g, 'a');
    a = a.replace(/ö/g, 'o');
    a = a.replace(/ü/g, 'u');
    a = a.replace(/ß/g, 's');

    b = b.toLowerCase();
    b = b.replace(/ä/g, 'a');
    b = b.replace(/ö/g, 'o');
    b = b.replace(/ü/g, 'u');
    b = b.replace(/ß/g, 's');

    return (a === b) ? 0 : (a > b) ? 1 : -1;
  };

  /**
   * Set the label for an attribute
   *
   * @param {*} attribute
   * @param {*} value
   */
  var setAttributeLabel = function(attribute, value){
    // @todo i18n this one.
    if (attribute === 'hardness' && value > 21.3) {
      return tw.i18n.hard;
    }
  };

  /**
   * This function binds the nominatim geocoder from mapquest to the input with id 'city'.
   * A user can then start typing (autocomplete) and select the right address from the dropdown.
   * Once the address is selected, the next button becomes active and the selected location is set
   * for the next screen in the display.
   */
  var startGeocoder = function () {
    $('.search-input').autocomplete({
      paramName: 'q',
      serviceUrl: 'http://open.mapquestapi.com/nominatim/v1/search.php',
      minChars: 4,
      params: {
        key:"BJlOjYiGd1RjyCk1VVDE3YLjDruBpngY",
        format:"json",
        addressdetails:"1",
        limit: 3
      },
      preventBadQueries: false,
      onSearchStart: function (params) {
        $('.search-icon').html('<i class="fa fa-circle-o-notch fa-spin"></i>');
      },
      onSearchError: function (query, jqXHR, textStatus, errorThrown) {
        $('.search-icon').html('<i class="fa fa-warning"></i>');
      },
      transformResult: function(response) {
        if(response.length > 0){
          $('.search-icon').html('<i class="fa fa-search"></i>');
          response = JSON.parse(response);
          return {
            suggestions: $.map(response, function(result) {
              var address = result.address;
              var name;

              //return { value: result.display_name, data: result };
              var street = address.road;
              var housenr = address.house_number;
              var postcode = address.postcode;
              var suburb;
              var city = address.hamlet || address.city || address.town || address.village;

              if(city !== address.suburb) {
                suburb = address.suburb;
              }
              var country = address.country_code.toUpperCase();
              if(result.class === "amenity" || result.class === "tourism"){
                name = address[result.type];
              }
              address.lat = result.lat;
              address.lon = result.lon;
              var arr = [name, street, housenr, postcode, suburb, city];
              arr = arr.filter(function(n){
                if(!n) {
                  return false;
                } else {
                  return true;
                }
              });
              address.constructed_output = arr.join(' ');
              return { value: address.constructed_output, data: address};
            })
          };
        } else {
          $('.search-icon').html('<i class="fa fa-warning"></i>');
          return {};
        }
      },
      onSelect: function (suggestion) {
        $('.search-icon').html('<i class="fa fa-search"></i>');
        $('#current-location').text(suggestion.data.constructed_output);
        var lat = suggestion.data.lat;
        var lon = suggestion.data.lon;
        $('#current-location-lat').val(lat);
        $('#current-location-lon').val(lon);
        if(this.id === 'city'){
          $('.top-menu').toggle();
          $('#hero-section').toggle();
          $('#info-section').toggle();
          $('#results-section').toggle();
        }
        // Set spinner while we wait for results.
        $('#result-loading').show();
        $('#result-success').hide();
        $('#result-failed').hide();
        tw.utils.getReport(lat, lon, function(data){
          // Turn of spinner.
          $('#result-loading').hide();
          $('#table-observations').html('');
          $('#zone-id').html('');
          if (Object.keys(data).length > 0) {
            $('#result-success').show();
            tw.data.report = data;
            $('.zone-id').text(data.name);
            $('.zone-data-year').text(data.year);
            $('.zone-data-count').text(data.observations.length);
            $('.zone-description').html(data.description);
            $('.zone-about').toggle(!!((data.year || data.description)));
            $('.zone-year-container').toggle(!!data.year);
            tw.utils.getLimits(function(data) {
              tw.data.limits = data;
              tw.data.report.observations.forEach(function (attribute, index, observations) {
                if(attribute.value){
                  var card = $('<div class="card"></div>');
                  var header = $('<header class="card-header"><p class="card-header-title">' + attribute.code + ' ' + tw.utils.getObservationValue(attribute) + ' ' + attribute.uom.label +'</p><a class="card-header-icon"><span class="icon"><i class="fa caret fa-angle-down"></i></span></a><header>');
                  var cardcontent = $('<div class="card-content" style="display:none;"></div>');
                  //Get the limits for this observation:
                  var description = $('<div class="content"><p>' + tw.i18n.nodescription + '</p></div>');
                  if(attribute.description){
                    description = $('<div class="content"><p>' + attribute.description + '</p></div>');
                  }
                  description.prepend(tw.utils.evaluateLimit(attribute));
                  card.append(header);
                  cardcontent.append(description);
                  card.append(cardcontent);
                  header.on('click', function(e){
                    card.find('.caret').toggleClass('fa-angle-down fa-angle-up');
                    cardcontent.toggle();
                  });
                  $('#table-observations').append(card);
                }
                if(index === observations.length -1){
                  // finished, do whatever needed here.
                }
              });

              tw.utils.getAverages(function(data){
                tw.data.averages = data;
                tw.utils.getProducts(function(data){
                  tw.data.products = data;
                });
              });
              $('.results').toggle(true);
            });
          } else {
            $('#result-failed').show();
          }
        });
      }
    });
  };

  /**
   * When the submit button is pressed, the value from the input with id city is used to
   * get information on the waterquality for the given location.
   */
  $('.nav-toggle').on('click', function (e) {
    $('.nav-menu').toggleClass('is-active');
  });

  var updateSection = function () {
    $('.section').hide();
    $('.section-' + section).show();
    if ($('body').scrollTop() > $('.result-with-value').offset().top) {
      $('body').scrollTop($('.result-with-value').offset().top);
    }
  };

  var setupSectionSwitch = function () {
    $('.switch-to-section').on('click', function () {
      section = $(this).data('section');
      updateSection();
      updateAttributeContent();
    });
  };


  /**
   * Initialize the application
   */
  tw.init = function (i18n) {
    tw.i18n = i18n;
    $('.modal-background').on('click', function(e){
      $('.modal').removeClass('is-active');
    });
    $('.modal-close').on('click', function(e){
      $('.modal').removeClass('is-active');
    });

    $('.button-footer').on('click', function(){
      var attr = $(this).data('target');
      console.log(attr);
      if (typeof attr !== typeof undefined && attr !== false) {
        $(attr).addClass('is-active');
      }
    });

    startGeocoder();
    setupSectionSwitch();
    //Set the API docs link to the right location
    $('#api-docs').attr('href', tw.config.api_doc);
    $('.home-button').on('click', function(){
      $('.top-menu').toggle();
      $('#hero-section').toggle();
      $('#info-section').toggle();
      $('#results-section').toggle();
    })
    $('#city-btn').prop('disabled', true);
    if (window.location.href.indexOf('embed') < 0) {
      $('h1').show();
    }
  };
})(tw, jQuery);
