var getQueryResults = function(map) {
  var request = {
    location: currentCenter,
    radius: '500',
    types: ['store']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, createMarkerForPlaceResults);
}

var createMarkerForPlaceResults = function(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    var infoWindow = new google.maps.InfoWindow({map: map});
    infoWindow.setContent(place.name);
    infoWindow.open(map, this);
  });
}
