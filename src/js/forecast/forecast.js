angular.module('ForecastModule', [])

.component('forecastCtrl', {
  templateUrl: 'js/forecast/forecast.html',
  controller: ['$scope', 'weatherService', function ($scope, weatherService) {

    var ctrl = this;
    ctrl.gpsData = {};
    var objLength = 0;

    $scope.$on('googleDataReceived', function(event, args){
      objLength = Object.keys(args.googleData.address_components).length;
      fetchWeather(args.googleData.name, args.googleData.address_components[objLength-1].short_name);
    });

    // if this is the first visit to the page, load default data for London
    if (objLength == 0){
      fetchWeather('London', 'UK');
    }
    
    function fetchWeather(city, country) {
      weatherService.getWeather(city, country).then(function(data){
        $scope.rawWeather = data;
      });
    }
  }]
})

.factory('weatherService', ['$http', '$q', function ($http, $q){
  function getWeather (city, country) {

    var forecast = 'http://api.wunderground.com/api/2d9e76c9f8316a99/forecast/q/';

    var deferred = $q.defer();
    $http.get(forecast + country + '/' + city + '.json')
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(err){
        console.log('Error retrieving markets');
        deferred.reject(err);
      });
    return deferred.promise;
  }

  return {
    getWeather: getWeather
  };
}]);
