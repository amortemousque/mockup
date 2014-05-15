'use strict';

var mockupApp = angular.module('mockupApp',   [
  'ngRoute',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ui',
  'mgcrea.ngStrap',
  'blueimp.fileupload',
  'ngGrid'
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
