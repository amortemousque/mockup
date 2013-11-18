'use strict';

angular.module('mockupApp')
  .controller('LayerMenuCtrl', ['$scope', 'contextService', 'layerService', 'toolService', function ($scope, contextService, layerService, toolService) {
      	$scope.layers = layerService.getAll();
      	$scope.activeClass = "active";
      	$scope.activeLayer = contextService.getSelectedLayer();
      	$scope.activateLayer = function(layer){
      		layerService.setActive(layer);
      		contextService.setSelectedLayer(layer);
      	}
      	$scope.showLayer = function(layer){
      		if(layer.isShow) {
        		layer.isShow = false;
  		  	} else {
  		  		layer.isShow = true;
  		  	}
      	}
  }]);
