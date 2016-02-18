var getQueryResults = function(map) {
  console.log("In query results");
  var request = {
    location: currentCenter,
    radius: radiusFlag,
    type: ['restaurant'],
    keyword: [],
    openNow: openNowFlag
  };

  request.keyword = generateSearchKeywords();
  service = new google.maps.places.PlacesService(map);
  service.radarSearch(request, createMarkersForPlaceResults);

  clearAllMarkers();
  rebindOpenNow();
  rebindRadius();
  rebindKeywordModes();
};

var createMarkersForPlaceResults = function(results, status) {
  var infoWindows = [];
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log("Results length: " + results.length);
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

var rebindOpenNow = function() {
  $("#open-now").unbind("change");
  $("#open-now").on("change", function() {
    openNowFlag = !openNowFlag;
    console.log(openNowFlag);
    getQueryResults(map);
  });
};

var rebindRadius = function() {
  $("#radius").unbind("change");
  $("#radius").on("change", function() {
    radiusFlag = $(this).val();
    getQueryResults(map);
  });
};

var rebindKeywordModes = function() {
  $("#hippie").unbind("click");
  $("#hippie").on("click", function() {
    hippieFlag = !hippieFlag;
    getQueryResults(map);
  });

  $("#hipster").unbind("click");
  $("#hipster").on("click", function() {
    hipsterFlag = !hipsterFlag;
    getQueryResults(map);
  });

  $("#picky").unbind("click");
  $("#picky").on("click", function() {
    pickyFlag = !pickyFlag;
    getQueryResults(map);
  });
};

var generateSearchKeywords = function() {
  var keywords = [];
  if (hippieFlag) {
    keywords.push('vegetarian');
  }
  if (hipsterFlag) {
    keywords.push('-chain');
  }
  if (pickyFlag) {
    keywords.push('american OR italian');
  }
  return keywords;
};
