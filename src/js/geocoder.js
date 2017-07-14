(function (tw, $) {
  'use strict';
  /**
   * This function binds the nominatim geocoder from mapquest to the input with id 'city'.
   * A user can then start typing (autocomplete) and select the right address from the dropdown.
   * Once the address is selected, the next button becomes active and the selected location is set
   * for the next screen in the display.
   */
  tw.geocoder = function () {
    $('.search-input').focusin(function() {
      $(this).val( '' );
    });
    $('.search-input').autocomplete({
      paramName: 'q',
      serviceUrl: tw.config.geocoder.search,
      minChars: 4,
      params: {
        key: tw.config.geocoder.key,
        format:"json",
        addressdetails:"1",
        limit: 3
      },
      preventBadQueries: false,
      onSearchStart: function (params) {
        $('.search-icon').html('<i class="fa fa-circle-o-notch fa-spin"></i>');
      },
      onSearchError: function (query, jqXHR, textStatus, errorThrown) {
        if(!errorThrown === 'abort'){
          $('.search-icon').html('<i class="fa fa-warning"></i>');
          console.log(errorThrown);
        }
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
        $('.search-input').val(suggestion.data.constructed_output);
        $('#current-location').text(suggestion.data.constructed_output);
        var lat = suggestion.data.lat;
        var lon = suggestion.data.lon;
        tw.app.setLocation('#/quality/' + lat + ',' + lon);
      }
    });
  };
})(tw, jQuery);
