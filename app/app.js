'use strict';

var greenPiThumbApp = angular.module('greenPiThumbApp', [
  'greenPiThumbApp.directives',
  'greenPiThumbApp.version'
  ]);

angular.module('d3', []);
angular.module('greenPiThumbApp.directives', ['d3']);

greenPiThumbApp.controller('DashboardCtrl', function($scope, $http) {
  $http.get('/temperatureHistory.json').success(function(temperatureHistory) {
    $scope.temperature = temperatureHistory;
    $scope.latestTemperature =
      $scope.temperature[$scope.temperature.length - 1].temperature;
  });
  // $http.get('/soilTemperatureHistory.json').success(function(soilTemperatureHistory) {
    // $scope.soilTemperature = soilTemperatureHistory;
    // $scope.latestSoilTemperature =
    //   $scope.soilTemperature[$scope.soilTemperature.length - 1].soil_temperature;

  $http.get('/soilTemperatureHistory.json').success(function(soilTemperatureHistory) {
    $scope.soilTemperature = [];
    // Convert temperature records from C to F.
    soilTemperatureHistory.forEach(function(record) {
      $scope.soilTemperature.push({
        temperature: (record.temperature * (9.0 / 5.0)) + 32.0,
        timestamp: record.timestamp
      });
    });

    $scope.latestTemperature =
      $scope.temperature[$scope.temperature.length - 1].temperature;
  });
  $http.get('/humidityHistory.json').success(function(humidityHistory) {
    $scope.humidity = humidityHistory;
    $scope.latestHumidity =
      humidityHistory[humidityHistory.length - 1].humidity;
  });
  $http.get('/lightHistory.json').success(function(lightHistory) {
    $scope.lightLevel = lightHistory;
    $scope.latestLightLevel =
      lightHistory[lightHistory.length - 1].light;
  });
  $http.get('/soilMoistureHistory.json').success(function(moistureHistory) {
    // Convert raw soil moisture readings into a percentage (out of 1023).
    $scope.soilMoisture = [];
    moistureHistory.forEach(function(record) {
      $scope.soilMoisture.push({
        moisture: record.soil_moisture,
        timestamp: record.timestamp
      });
    });
    $scope.latestSoilMoisture =
      $scope.soilMoisture[$scope.soilMoisture.length - 1].moisture;
  });
  $http.get('/pumpHistory.json').success(function(pumpHistory) {
    $scope.pump = pumpHistory;
    $scope.latestPump =
      $scope.pump[$scope.pump.length - 1].pump_state;
  });
  $http.get('/windowHistory.json').success(function(windowHistory) {
    $scope.window = windowHistory;
    $scope.latestwindow =
      $scope.window[$scope.window.length - 1].window_state;
  });
  $http.get('/images.json').success(function(images) {
    $scope.images = [];
    images.forEach(function(image) {
      $scope.images.push({
        'timestamp': image.timestamp,
        'filename': 'images/' + image.filename
      });
    });
    $scope.images.sort(function(a, b) {
      if (a.timestamp < b.timestamp) {
        return -1;
      }
      if (a.timestamp > b.timestamp) {
        return 1;
      }
      return 0;
    });
    $scope.currentImage = $scope.images.length - 1;
  });

  $scope.firstImage = function() {
    $scope.currentImage = 0;
  };

  $scope.previousImage = function() {
    $scope.currentImage = Math.max(0, $scope.currentImage - 1);
  };

  $scope.nextImage = function() {
    $scope.currentImage = Math.min(($scope.currentImage + 1),
                                   ($scope.images.length - 1));
  };

  $scope.lastImage = function() {
    $scope.currentImage = $scope.images.length - 1;
  };
});
