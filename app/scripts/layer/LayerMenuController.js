'use strict';

angular.module('mockupApp')
  .controller('LayerMenuCtrl', ['$scope', 'layerService', 'toolService', function ($scope, layerService, toolService) {
      	$scope.layers = layerService.getAll();
      	$scope.activeClass = "active";
      	$scope.activeLayer = layerService.getActive();
  }]);
