var SearchSession = require('./../js/search-session.js');
var Query = require('./../js/query.js');

var INITIAL_MAP_LAT = 32.7767;
var INITIAL_MAP_LNG = -96.7970;

var bindOpenNowToUpdateQuery = function(session) {
  $("#open-now").on("change", function() {
    session.query.toggleOpenNow();
  });
};

var bindRadiusToUpdateQuery = function(session) {
  $("#radius").on("change", function() {
    session.query.setRadius($(this).val());
  });
};

var bindKeywordModesToUpdateQuery = function(session) {
  $("#hippie").on("click", function() {
    session.query.toggleHippie();
  });

  $("#hipster").on("click", function() {
    session.query.toggleHipster();
  });

  $("#picky").on("click", function() {
    session.query.toggleHippie();
  });
};

$(function() {
  var map = new google.maps.Map($('#map')[0], {
    center: {lat: INITIAL_MAP_LAT, lng: INITIAL_MAP_LNG},
    zoom: 15
  });

  var session = new SearchSession(map);

  bindOpenNowToUpdateQuery(session);
  bindRadiusToUpdateQuery(session);
  bindKeywordModesToUpdateQuery(session);
});
