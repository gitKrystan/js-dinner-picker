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

var getCustomKeywords = function(session) {
  $('#custom-search').submit(function(event) {
    event.preventDefault();
    var userInput = $('#custom-search input').val();
    $('#custom-search input').val("");
    session.query.addCustomKeywords(userInput);
    updateKeywordsDisplay(session);
  });
};

var updateKeywordsDisplay = function(session) {
  var keywords = session.query.keywords;
  var $keywordList = $('#keyword-list');
  $keywordList.empty();

  for (var i = 0; i < keywords.length; i++) {
    var keyword = keywords[i]
    $keywordList.append("<span id='" + i + "'>[" + keyword + "]  </span>");
  }
};

var updateCheckboxes = function(session) {
  $("#hippie").prop('checked', session.query.hippieFlag);
  $("#hipster").prop('checked', session.query.hipsterFlag);
  $("#picky").prop('checked', session.query.pickyFlag);
}

var bindCustomKeywordsForRemoval = function(session) {
  $('#keyword-list').on("click", "span", function() {
    session.query.removeIndexFromKeywords($(this).attr('id'));
    updateKeywordsDisplay(session);
    updateCheckboxes(session);
  });
};

var setDefaultSearchParameters = function(session) {
  $("#radius").val(session.query.radiusFlag);
  $("#open-now").prop('checked', session.query.openNowFlag);
}

$(function() {
  var map = new google.maps.Map($('#map')[0], {
    center: {lat: INITIAL_MAP_LAT, lng: INITIAL_MAP_LNG},
    zoom: 15
  });

  var session = new SearchSession(map);

  setDefaultSearchParameters(session);
  bindOpenNowToUpdateQuery(session);
  bindRadiusToUpdateQuery(session);
  bindKeywordModesToUpdateQuery(session);
  bindCustomKeywordsForRemoval(session);
  getCustomKeywords(session);
});
