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

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.type = '--';
    $scope.handleGesture = function(event) {
      console.log(event);
      $scope.type = event.type;
    };
  });
