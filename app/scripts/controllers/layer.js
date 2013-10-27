'use strict';

mockupApp
  .controller('LayerCtrl', ['$scope', 'layerService', 'toolService', function ($scope, layerService, toolService) {

  	$scope.layers = layerService.getAll();
  	$scope.toolService = toolService;
  	$scope.layerService = layerService;
    $scope.templateDetails = "";
    $scope.addLayerOnCanvas = function(){
    	var tool = $scope.toolService.getActive();
    	console.log(tool);
    	if(tool != undefined) {
    		var newLayer = {type: tool.type, isShow: true, isActive: true};
	  		$scope.layerService.add(newLayer);
	  	}
    }

	$scope.editName = function() {

	}

 }]);
