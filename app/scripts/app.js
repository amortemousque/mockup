'use strict';

var mockupApp = angular.module('mockupApp',   [
  'ngRoute',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ui',
  'ui.bootstrap',
  'mgcrea.ngStrap',
  'ui.bootstrap-slider',
  'ngGrid',
  'angularFileUpload'
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
