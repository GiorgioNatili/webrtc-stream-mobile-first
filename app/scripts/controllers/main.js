'use strict';

/**
 * @ngdoc function
 * @name webrtcStreamMobileFirstApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webrtcStreamMobileFirstApp
 */
angular.module('webrtcStreamMobileFirstApp')
  .controller('MainCtrl', function ($scope, $document) {

    $document[0].body.addEventListener('touchmove', function(event) {
       event.preventDefault();
    }, false); 

    $scope.ipAddress = 'http://192.168.122.1:8080';

    $scope.type = '--';
    $scope.handleGesture = function(event) {
      console.log(event);
      $scope.type = event.type;
    };
  });
