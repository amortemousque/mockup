'use strict';

mockupApp
  .controller('LayerCtrl', ['$scope', 'layerService', 'toolService', function ($scope, layerService, toolService) {
  	$scope.layers = layerService.getAll();
    $scope.activeLayer = layerService.getActive();
  	$scope.toolService = toolService;
  	$scope.layerService = layerService;

    $scope.addLayerOnCanvas = function(){
    	var tool = $scope.toolService.getActive();
    	if(tool != undefined && tool.type != "move" && tool.type != "resize") {
    		var newLayer = {
          type: tool.type, 
          isShow: true, 
          active: "active",
          properties : {}
        };
	  		$scope.layerService.add(newLayer);
        layerService.setActive(newLayer)
	  	}
    }
 }]);
