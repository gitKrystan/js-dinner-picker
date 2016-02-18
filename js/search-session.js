var Query = require('./../js/query.js');

var SearchSession = function(map) {
  this.map = map;
  this.initMap();
  this.query = new Query(this);
};

SearchSession.prototype.initMap = function() {
  this.marker = this.initializeMarker();
  var currentSession = this;
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(userPosition) {
      currentSession.currentCenter = {
        lat: userPosition.coords.latitude,
        lng: userPosition.coords.longitude
      };
      currentSession.marker.setPosition(currentSession.currentCenter);
      currentSession.map.setCenter(currentSession.currentCenter);
      currentSession.query.getQueryResults(currentSession.map);
    }, function() {
      currentSession.handleLocationError(true, currentSession.map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    currentSession.handleLocationError(false, currentSession.map.getCenter());
  }
};

SearchSession.prototype.handleLocationError = function(browserHasGeolocation, pos) {
  var infoWindow = new google.maps.InfoWindow({map: this.map});
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
};

SearchSession.prototype.initializeMarker = function () {
  var currentSession = this;
  var marker = this.marker;
  marker = new google.maps.Marker({
    position: currentSession.map.getCenter(),
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10
    },
    draggable: true,
    map: currentSession.map
  });

  marker.addListener('dragend', function() {
    currentSession.currentCenter = marker.getPosition();
    currentSession.map.setCenter(currentSession.currentCenter);
    currentSession.query.clearAllMarkers();
    currentSession.query.getQueryResults();
  });

  return marker;
};

module.exports = SearchSession;
