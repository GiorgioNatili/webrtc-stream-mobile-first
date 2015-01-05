'use strict';

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
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'hmTouchEvents'
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
