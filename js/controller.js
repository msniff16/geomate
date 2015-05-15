/* ------------- front page controller ------------------- */
myApp.controller("mainController", function($scope, $http, $log) {

  $scope.username = "";
  $scope.password = "";
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

  // upload geoJSON file
  $scope.run = function() {

      // grab file uploading
      // var fileUploadControl = $("#jsonFile")[0];

      // store file uploading
      // if (fileUploadControl.files.length > 0) {
      //   var file = fileUploadControl.files[0];
      // }

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
          $scope.startAnimation();

      });
  }

  // upload geoJSON file
  $scope.runThru = function() {

      // load in geoJSON file from server
      $.getJSON("track_data/" + $scope.currentFile, function(data) {

          $scope.data = data;
          $scope.coordinate = data.features[0].geometry.coordinates;
          $scope.numTracks = data.length;

          // starting lng
          $scope.currentLat = $scope.coordinate[1];
          // starting lat
          $scope.currentLng  = $scope.coordinate[0];

          // set new map view
          var latlng = L.latLng($scope.currentLat, $scope.currentLng);
          $scope.map.setView(latlng, 16);

          // new marker
          $scope.marker = L.marker([$scope.currentLat, $scope.currentLng]).addTo($scope.map);

          // call non-accumulating animation start
          $scope.startRunThru();

      });

  }

  // start accumulating animation
  $scope.startAnimation = function() {

    console.log($scope.numTracks);
    console.log($scope.currentTrack);

    // add new marker
    if($scope.currentLat) {

      $scope.marker = L.marker([$scope.currentLat, $scope.currentLng]).addTo($scope.map);

      // update marker at current (lat,lng)
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
    $scope.interval = setTimeout($scope.startAnimation, $scope.speed);

  };

  // start non-accumulating animation
  $scope.startRunThru = function() {

    // update marker at current (lat,lng)
    if($scope.currentLat) {
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
    $scope.interval = setTimeout($scope.startRunThru, $scope.speed);

  };

  // return current animation speed
  $scope.getSpeed = function() {
    return $scope.speed + "ms";
  }

  // clear all pins
  $scope.clear = function() {
      $scope.map.removeLayer($scope.markerArray);
  }

});


