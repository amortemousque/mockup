'use strict';

var mockupApp = angular.module('mockupApp',   [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui',
  '$strap.directives'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/edit', {
        templateUrl: 'views/layer/detail.html',
        controller: 'LayerEditCtrl'
      })
      .when('/add', {
        templateUrl: 'views/layer/detail.html',
        controller: 'LayerAddCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
