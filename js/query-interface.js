var getQueryResults = function(map) {
  var request = {
    location: currentCenter,
    radius: '6000',
    type: ['restaurant'],
    keyword: ['indian'],
    openNow: true
  };

  service = new google.maps.places.PlacesService(map);
  service.radarSearch(request, createMarkersForPlaceResults);
};

var createMarkersForPlaceResults = function(results, status) {
  var infoWindows = [];
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i], infoWindows);
    }
  }

  google.maps.event.addListener(map, "click", function(event) {
    clearAllInfoWindows(infoWindows);
  });
};

var clearAllMarkers = function() {
  for (var i = 0; i < placeMarkers.length; i++) {
    placeMarkers[i].setMap(null);
  }
  placeMarkers = [];
};

var clearAllInfoWindows = function(infoWindows) {
  infoWindows.forEach(function(infoWindow) {
    infoWindow.close();
  });
};

var createMarker = function(place, infoWindows) {
  var placeLoc = place.geometry.location;
  var placeMarker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  placeMarkers.push(placeMarker);

  google.maps.event.addListener(placeMarker, 'click', function() {
    clearAllInfoWindows(infoWindows);
    service.getDetails(place, function(result, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }
      var infoWindow = new google.maps.InfoWindow({map: map});
      infoWindows.push(infoWindow);
      infoWindow.setContent(result.name);
      infoWindow.open(map, placeMarker);

    });
  });
};
