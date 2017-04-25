sampleApp = angular.module('weatherApp', ['ngRoute', 'WeatherModule', 'ngSanitize']);

sampleApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider.
    when('/home', {
      template: '<weather></weather>'
    }).
    otherwise({
      redirectTo: '/home'
    });



}]);
