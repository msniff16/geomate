/* ------------- front page controller ------------------- */
myApp.controller("mainController", function($scope, $http, $log) {

  $scope.currentLat = 0;
  $scope.currentLng = 0;
  $scope.interval = "";
  $scope.speed = 200;
  $scope.coordinate = "";
  $scope.data = "";
  $scope.numTracks = 0;
  $scope.currentTrack = 0;
  $scope.marker = "";
  $scope.currentFile = "antbird.geojson";

  // Setup leaflet
  L.mapbox.accessToken = 'pk.eyJ1IjoiY2dhd20iLCJhIjoiTnMtVTBQMCJ9.Lq400ePqtpC_9NJmNRAA1w';
  $scope.map = L.mapbox.map('map', 'cgawm.l42agboc').setView([37, -76], 10);

  // grab geoJSON file
  $scope.startRun = function(runType) {

      // load in geoJSON file from server
      $.getJSON("track_data/" + $scope.currentFile, function(data) {

          $scope.data = data;
          $scope.coordinate = data.features[0].geometry.coordinates;
          $scope.numTracks = data.features.length;

          // starting lng
          $scope.currentLat = $scope.coordinate[1];
          // starting lat
          $scope.currentLng  = $scope.coordinate[0];

          // set new map view
          var latlng = L.latLng($scope.currentLat, $scope.currentLng);
          $scope.map.setView(latlng, 16);

          // call animation start
          if(runType == "tracked") {
            $scope.animateRun("tracked");
          }
          else if(runType == "followed") {
            // create only marker
            $scope.marker = L.marker([$scope.currentLat, $scope.currentLng]).addTo($scope.map);
            $scope.animateRun("followed");
          }

      });
  }

  // start accumulating animation
  $scope.animateRun = function(runType) {

    // add new marker
    if($scope.currentLat) {

      // need new marker added if is a tracked run
      if(runType == "tracked") {
        $scope.marker = L.marker([$scope.currentLat, $scope.currentLng]).addTo($scope.map);
      }

      // update pin position
      var latlng = L.latLng($scope.currentLat, $scope.currentLng);
      $scope.marker.setLatLng(latlng);
      $scope.marker.update();

    }

    // at the last track --> stop animation
    if($scope.currentTrack >= $scope.numTracks - 1) {
      clearTimeout($scope.interval);
    }

    // increment current track
    else {
      $scope.currentTrack += 1;
      $scope.coordinate =  $scope.data.features[$scope.currentTrack].geometry.coordinates
      $scope.currentLat = $scope.coordinate[1];
      $scope.currentLng = $scope.coordinate[0];
    }

    // call this same function again
    if(runType == "tracked") {
      $scope.interval = setTimeout($scope.animateRun, $scope.speed, "tracked");
    }
    else if(runType == "followed") {
      $scope.interval = setTimeout($scope.animateRun, $scope.speed, "followed");
    }

  };

  // return current animation speed
  $scope.getSpeed = function() {
    return $scope.speed + "ms";
  }

});

