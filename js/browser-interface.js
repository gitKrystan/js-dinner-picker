$(function() {
  var $mapDiv = $('#map');

  var map;
  var marker;
  var currentCenter;
  placeMarkers = [];

  //request flags
  openNowFlag = false;
  radiusFlag = '1000';
  hippieFlag = false;
  hipsterFlag = false;
  pickyFlag = false;

  initMap($mapDiv);
});
