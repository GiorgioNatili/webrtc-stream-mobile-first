'use strict';

/**
 * @ngdoc function
 * @name webrtcStreamMobileFirstApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webrtcStreamMobileFirstApp
 */
angular.module('webrtcStreamMobileFirstApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.type = '--';
    $scope.handleGesture = function($event) {
      console.log($event.type);
      $scope.type = $event.type;
    };
  });
