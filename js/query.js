var Query = function(searchSession) {
  this.placeMarkers = [];
  this.searchSession = searchSession;
  this.openNowFlag = false;
  this.radiusFlag = '1000';
  this.hippieFlag = false;
  this.hipsterFlag = false;
  this.pickyFlag = false;
};

Query.prototype.getQueryResults = function() {
  this.request = {
    location: this.searchSession.currentCenter,
    radius: this.radiusFlag,
    type: ['restaurant'],
    keyword: [],
    //Using both cases because documentation is ambiguous
    //This returns places without specified opening hours if set to true, contrary to Places API documentation
    openNow: this.openNowFlag,
    opennow: this.openNowFlag
  };
  console.log(this.request.radius);
  var currentQuery = this;
  this.request.keyword = this.generateSearchKeywords();
  service = new google.maps.places.PlacesService(this.searchSession.map);
  service.radarSearch(this.request, function(results, status) {
    return currentQuery.createMarkersForPlaceResults(results, status);
  });

  this.clearAllMarkers();
};

Query.prototype.createMarkersForPlaceResults = function(results, status) {
  var currentQuery = this;
  currentQuery.infoWindows = [];
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log("Results length: " + results.length);
    for (var i = 0; i < results.length; i++) {
      currentQuery.createMarker(results[i]);
    }
  }

  google.maps.event.addListener(currentQuery.searchSession.map, "click", function(event) {
    currentQuery.clearAllInfoWindows();
  });
};

Query.prototype.clearAllMarkers = function() {
  for (var i = 0; i < this.placeMarkers.length; i++) {
    this.placeMarkers[i].setMap(null);
  }
  this.placeMarkers = [];
};

Query.prototype.clearAllInfoWindows = function() {
  this.infoWindows.forEach(function(infoWindow) {
    infoWindow.close();
  });
};

Query.prototype.createMarker = function(place, infoWindows) {
  var currentQuery = this;
  var placeLoc = place.geometry.location;
  var placeMarker = new google.maps.Marker({
    map: currentQuery.searchSession.map,
    position: place.geometry.location
  });
  currentQuery.placeMarkers.push(placeMarker);

  google.maps.event.addListener(placeMarker, 'click', function() {
    currentQuery.clearAllInfoWindows();
    service.getDetails(place, function(result, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }
      var infoWindow = new google.maps.InfoWindow({map: currentQuery.searchSession.map});
      currentQuery.infoWindows.push(infoWindow);
      console.log(result);
      infoWindow.setContent(result.name);
      infoWindow.open(currentQuery.searchSession.map, placeMarker);
    });
  });
};

Query.prototype.generateSearchKeywords = function() {
  this.keywords = [];
  if (this.hippieFlag) {
    this.keywords.push('vegetarian');
  }
  if (this.hipsterFlag) {
    this.keywords.push('-chain');
  }
  if (this.pickyFlag) {
    this.keywords.push('american OR italian');
  }
  return this.keywords;
};

Query.prototype.toggleOpenNow = function () {
  this.openNowFlag = !this.openNowFlag;
  this.getQueryResults();
};

Query.prototype.toggleHippie = function () {
  this.hippieFlag = !this.hippieFlag;
  this.getQueryResults();
};

Query.prototype.toggleHipster = function () {
  this.hipsterFlag = !this.hipsterFlag;
  this.getQueryResults();
};

Query.prototype.togglePicky = function () {
  this.pickyFlag = !this.pickyFlag;
  this.getQueryResults();
};

Query.prototype.setRadius = function (radius) {
  this.radiusFlag = radius;
  this.getQueryResults();
};

module.exports = Query;
