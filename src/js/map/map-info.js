angular.module('MapInfoModule',  [])

.component('mapCtrl', {
  bindings:{
    gpsData: '='
  },
  templateUrl: 'js/map/map-info.html',
  controller: function () {
  }
});
