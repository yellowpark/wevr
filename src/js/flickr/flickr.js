angular.module('FlickrModule',  ['jtt_flickr'])

.component('flickrCtrl', {
  bindings:{
    gpsData: '='
  },
  templateUrl: 'js/flickr/flickr.html',
  controller: ['$scope', 'flickrFactory', function($scope, flickrFactory) {

    var ctrl = this;
    ctrl.gpsData = {};

    var objLength = 0;

    $scope.$on('googleDataReceived', function(event, args){
      objLength = 1;
      //var tags = 'weather,' + args.googleData.name;
      var tags = 'weather,' + args.googleData.vicinity;
      flickrFactory.getImagesByTags({
          tags: tags,
          tagmode:"ALL"
      }).then(function(_data){

          function getFlickrImages(data){
            var i = 0;
            var imgs = {};
            var len = 0;
            var res;
            var img;
            while ((i < data.data.items.length) && (i < 18)){
              img = data.data.items[i].media.m;
              len = img.length;
              res =  img.substring(0, len - 5);
              imgs[i] = {};
              imgs[i][0] = res + 'q.jpg';
              imgs[i][1] = data.data.items[i].link;
              imgs[i][2] = data.data.items[i].title;
              i+=1;
            }
            return imgs;
          }
          ctrl.rawPhotos = getFlickrImages(_data);
          var test = ctrl.rawPhotos;
      });
    });

    // if this is the first visit to the page, load default data for London
    if (objLength == 0){
      fetchFlickr('London');
    }
    function fetchFlickr(city) {
      var tags = 'weather, London';
      flickrFactory.getImagesByTags({
          tags: tags,
          tagmode:"ALL"
      }).then(function(_data){

          function getFirstImages(data){
            var i = 0;
            var imgs = {};
            var len = 0;
            var res;
            var img;
            while ((i < data.data.items.length) && (i < 18)){
              img = data.data.items[i].media.m;
              len = img.length;
              res =  img.substring(0, len - 5);
              imgs[i] = {};
              imgs[i][0] = res + 'q.jpg';
              imgs[i][1] = data.data.items[i].link;
              imgs[i][2] = data.data.items[i].title;
              i+=1;
            }
            return imgs;
          }
          ctrl.rawPhotos = getFirstImages(_data);
      });
    }
  }]
});
