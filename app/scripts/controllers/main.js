'use strict';

/**
 * @ngdoc function
 * @name webrtcStreamMobileFirstApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webrtcStreamMobileFirstApp
 */
angular.module('webrtcStreamMobileFirstApp')
.controller('MainCtrl', function ($scope, $document, $sce) {

  $document[0].body.addEventListener('touchmove', function(event) {
    event.preventDefault();
  }, false); 

  $scope.$watch('switchStatus', function(newValue){

    if(newValue === true){

      var iframe = angular.element( document.querySelector( '#stream-fetcher' ));
      iframe.sandbox = 'allow-scripts';

      var script = iframe[0].contentWindow.document.createElement('script');
      script.type = 'text\/javascript';

      script.onload = function(){
        
        $scope.currentCameraURL = $sce.trustAsResourceUrl($scope.ipAddress);
        iframe[0].contentWindow.connector.connect($scope.ipAddress);

      };

      script.onerror = function(error){

        console.log('oh no, the data proxy is not loaded!!!', error);

      };

      cameraIp = $scope.ipAddress;

      script.src = 'scripts/utils/dataProxy.js';
      iframe.contents().find('body').append(script);

    }

  });

  $scope.ipAddress = 'http://192.168.122.1:60152';

  angular.element(document).ready(function () {


  });

  $scope.type = '--';
  $scope.handleGesture = function(event) {
    console.log(event);
    $scope.type = event.type;
  };

  });
