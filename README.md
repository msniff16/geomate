# Geomate
Geomate is a GeoJSON data animator built with angularJS, turfJS, leafletJS, bootstrap, and mapBox.
Visit www.cgawm.com for a functioning demo.

## Basic Setup
The app is designed as a one-page angular app with just one controller, one html page, and one style sheet. It is less than 100 lines of javascript. Sample geoJSON data is stored on the server and accessible via cgawm.com/track_data/"name_of_file". As of right now, the upload functionality does not work, and will need to be implemented via a back-end language such as python (the server will need to be configured to run python). The option "track run"
allows you to accumulate points as the data changes, and the option "followed run" allows you to follow and not track data as it coordinates change.
You can change the speed of the pins in real time with the slider. Variables setup at the top of the javascript controller (e.g. $scope.speed) are global in scope and are accessible by any of the methods described below. To change the geoJSON data being run, just edit the name of the $scope.currentFile variable at the top of the controller to whatever the name of the file (inside /track_data) is you want to run. The mapbox map template can also be changed near the top of the controller file. $scope.map (again, at the top of the controller) is the name of the variable that references the actual map itself.

## Methods

### startRun(runType)
<br />
Pulls the geoJSON file from the server and loads it into memory. Scans first data point of file to set currentLat and currentLng for the map. If runType parameter = "tracked" then function calls animateRun('tracked'). If runType parameter = "followed" then function calls animateRun('followed').

### #animateRun(runType)
<br />
Animates the data points by parsing JSON with a setTimeout loop. New markers are added to map if runType = "tracked" otherwise marker positions are just updated for runType "followed".

### #getSpeed()
<br />
Returns the current speed of the animation. Default is 200 ms and can be changed by the $scope.speed variable.


## Future Features
