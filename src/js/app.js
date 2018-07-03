// Initialize our namespace
var tw = tw || { data: {}};
(function(tw, $) {
  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };
  tw.app = $.sammy('#transparentwater', function() {
    var langCode = navigator.language || navigator.systemLanguage;
    var lang = langCode.toLowerCase();
    lang = lang.substr(0, 2);
    // Main page route
    function setNavigation(){
      $('#api-docs').attr('href', tw.config.api_doc);
      $('.navbar-burger').on('click', function(e){
        $(this).toggleClass('is-active');

        $('#mobilemenu').toggleClass('is-active');
      });
      $('.home-button').on('click', function(){
        tw.app.setLocation('#/');
      })
      tw.geocoder();
    }

    function renderInfo(block, context){
      $('.top-menu').show();
      context.render('templates/navigation.html').replace('#navigation-section').then(function(){
        setNavigation();
        context.render('templates/' + block + '.html').replace('#info-section').then(function(){
          $('#info-section').show();
          $('.delete').on('click', function(e){
            $('#info-section').hide();
            context.render('templates/info.html').replace('#info-section');
          });
        });

      });
    }
    function renderMain(context){
      $('.top-menu').hide();
      $('#hero-section').show();
      context.render('templates/main.html').replace('#hero-section').then(function(){
        $('#info-section').show();
        context.render('templates/info.html').replace('#info-section').then(function(){
          $('#results-section').hide();
          tw.geocoder();
        });
      });
    }

    function renderAbout(context){
      renderInfo('about', context);
    }

    function renderTeam(context){
      renderInfo('team', context);
    }

    function renderContact(context){
      renderInfo('contact', context);
    }
    this.get('/', renderMain);
    this.get('#/', renderMain);
    this.get('#/about', renderAbout);
    this.get('#/team', renderTeam);
    this.get('#/contact', renderContact);

    //Sub page route, quality report for location
    this.get('#/quality/:location', function(context) {
      var lat = this.params.location.split(',')[0];
      var lon = this.params.location.split(',')[1];
      $('#current-location-lat').val(lat);
      $('#current-location-lon').val(lon);
      $('.top-menu').show();
      $('#hero-section').hide();
      $('#info-section').hide();
      $('#results-section').show();

      // Set spinner while we wait for results.
      $('#result-loading').show();
      $('#result-success').hide();
      $('#result-details').hide();
      $('#result-failed').hide();
      if($('#navigation-section').html().length === 0){
        context.render('templates/navigation.html').replace('#navigation-section').then(function(){
          setNavigation();
        })
      }
      tw.utils.getReport(lat, lon, function(data){
        $('.navbar-burger').removeClass('is-active');
        $('#mobilemenu').removeClass('is-active');
        tw.map.clear();

        // Turn of spinner.
        $('#result-loading').hide();
        $('#table-observations').html('');
        $('#zone-id').html('');
        if (Object.keys(data).length > 0) {
          if(data.zone && data.zone.geometry){
            console.log("Current location text: '" + $('#current-location').text() + "'");
            if ($('#current-location').text().length === 0){
              $('#current-location').text(data.zone.properties.name.toProperCase().replace("_", " "));
            }
            //Add the geometry as layer and zoom the map to the layer extend.
            tw.map.setZone(data.zone);
            if(data.plants && data.plants.length > 0){
              tw.map.setPlants(data.plants);
            }
          }
          $('#result-success').show('fast', function(){
            $('#result-details').show();
          });
          tw.data.report = data;
          $('.zone-id').text(data.name);
          if(data.operator){
            $('#report-operator').html('<a href="' +data.operator.url + '">'+ data.operator.name + '</a>');
            $('.report-operator').show();
          } else {
            $('#report-operator').html('');
            $('.report-operator').hide();
          }
          if(data.plants && data.plants.length > 0){
            var plantArr = [];
            for (var i = 0; i < data.plants.length; i++) {
              plantArr.push(data.plants[i].properties.name);
            }
            $('#report-plant').html('<em>' + plantArr.join('</em>, <em>') + '</em>');
            $('.report-plant').show();
          } else {
            $('#report-plant').html('');
            $('.report-plant').hide();
          }
          if(data.authority){
            $('#report-authority').html('<a href="' +data.authority.url + '">'+ data.authority.name + '</a>');
            $('.report-authority').show();
          } else {
            $('#report-authority').html('');
            $('.report-authority').hide();
          }
          $('.zone-data-year').text(data.year);
          $('.zone-data-count').text(data.observations.length);
          $('.zone-description').html(data.description);
          $('.zone-about').toggle(!!((data.year || data.description)));
          $('.zone-year-container').toggle(!!data.year);
          tw.utils.getLimits(function(data) {
            tw.data.limits = data;
            tw.data.report.observations.forEach(function (attribute, index, observations) {
              if(attribute.value || attribute.value == 0){
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
          tw.map.update(lat,lon);
        }
      });
    });
  });
  $(function() {
    tw.app.run();
  });
})(tw, jQuery);
