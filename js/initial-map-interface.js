var INITIAL_MAP_LAT = 32.7767;
var INITIAL_MAP_LNG = -96.7970;

var initMap = function($mapDiv) {
  var map = new google.maps.Map($mapDiv[0], {
    center: {lat: INITIAL_MAP_LAT, lng: INITIAL_MAP_LNG},
    zoom: 15
  });

  marker = createMarker(map);

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      marker.setPosition(pos);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, map.getCenter());
  }
}

var handleLocationError = function(browserHasGeolocation, pos) {
  var infoWindow = new google.maps.InfoWindow({map: map});
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
