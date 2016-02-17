var getQueryResults = function(map) {
  var request = {
    location: currentCenter,
    radius: '6000',
    types: ['restaurant'],
    keyword: 'vegetarian',
    openNow: true
  };

  service = new google.maps.places.PlacesService(map);
  service.radarSearch(request, createMarkerForPlaceResults);
};

var createMarkerForPlaceResults = function(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
};

var clearAllMarkers = function() {
  for (var i = 0; i < placeMarkers.length; i++) {
    placeMarkers[i].setMap(null);
  }
  placeMarkers = [];
};

var createMarker = function(place) {
  var placeLoc = place.geometry.location;
  var placeMarker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  placeMarkers.push(placeMarker);

  google.maps.event.addListener(placeMarker, 'click', function() {
    var infoWindow = new google.maps.InfoWindow({map: map});
    service.getDetails(place, function(result, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }
      infoWindow.setContent(result.name);
      infoWindow.open(map, placeMarker);
    });
  });
};
