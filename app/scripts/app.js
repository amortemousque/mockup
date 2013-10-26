'use strict';

angular.module('mockupApp',   [
  'ngCookies',
  'ngResource',
  'ngSanitize'
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

angular.module('layerApp',   [
  'ngCookies',
  'ngResource',
  'ngSanitize'
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

angular.module('toolApp',   [
  'ngCookies',
  'ngResource',
  'ngSanitize'
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
