var createMarker = function(map) {
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
    map.setCenter(marker.getPosition())
  });

  return marker;
}
