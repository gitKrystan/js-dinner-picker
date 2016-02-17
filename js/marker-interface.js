var initializeMarker = function(map) {
  var marker = new google.maps.Marker({
    position: map.getCenter(),
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10
    },
    draggable: true,
    map: map
  });

  marker.addListener('dragend', function() {
    currentCenter = marker.getPosition();
    map.setCenter(currentCenter);
    getQueryResults(map);
  });
  return marker;
}
