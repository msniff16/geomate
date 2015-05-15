# Geomate
Geomate is a GeoJSON data animator built with angularJS, turfJS, leafletJS, bootstrap, and mapBox.
Visit www.cgawm.com for a functioning demo.

## Basic Setup
The app is designed as a one-page angular app with just one controller, one html page, and one style sheet. Sample geoJSON data
is stored on the server and accessible via cgawm.com/track_data/"name_of_file". As of right now, the upload functionality does not work,
and will need to be implemented via a back-end language such as python (the server will need to be configured to run python). The option "track run"
allows you to accumulate points as the data changes, and the option "followed run" allows you to follow and not track data as it coordinates change.
You can change the speed of the pins in real time with the slider.

## Methods in Controller

* QGIS
* QGIS plugins
  * tablemanag
* GeoServer