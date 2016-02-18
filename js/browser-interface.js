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
  $("#hippie").on("change", function() {
    session.query.toggleHippie();
    updateKeywordsDisplay(session);
  });

  $("#hipster").on("change", function() {
    session.query.toggleHipster();
    updateKeywordsDisplay(session);
  });

  $("#picky").on("change", function() {
    session.query.togglePicky();
    updateKeywordsDisplay(session);
  });
};

var updateKeywordsDisplay = function(session) {
  var keywords = session.query.keywords;
  var $keywordList = $('#keyword-list');
  $keywordList.empty();
  keywords.forEach(function(keyword) {
    $keywordList.append("[" + keyword + "]  ");
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
