angular.module('WeatherModule', ['MapInfoModule', 'GoogleMapModule', 'ForecastModule', 'FlickrModule'])

.component('weather', {
  templateUrl: 'js/weather/weather.html',
  controller: function () {

    this.gpsData = {};
    this.latitude = 0;
    this.longitude = 0;
    this.message = '';
  }
});
