'use strict';
var cameraIp;
/**
 * @ngdoc overview
 * @name webrtcStreamMobileFirstApp
 * @description
 * # webrtcStreamMobileFirstApp
 *
 * Main module of the application.
 */
angular
  .module('webrtcStreamMobileFirstApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'hmTouchEvents',
    'toggle-switch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
