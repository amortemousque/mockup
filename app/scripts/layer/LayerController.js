'use strict';

mockupApp
  .controller('LayerCtrl', ['$scope', 'layerService', 'toolService',function ($scope, layerService, toolService) {
  	$scope.layers = layerService.getAll();
    $scope.activeLayer = layerService.getActive();
  	$scope.toolService = toolService;
  	$scope.layerService = layerService;
    $scope.sortableOptions = {
      update: function(e, ui) { },
      axis: 'y'
    };
    $scope.addLayerOnCanvas = function(){
    	var tool = $scope.toolService.getActive();

    	if(tool != undefined && tool.type != "move" && tool.type != "resize") {
    		var newLayer = {
          type: tool.type, 
          isShow: true, 
          active: "active",
          isActive: function(bool){
            if(bool == true) {
                $scope.layerService.setActive(this);
            }
          },
          properties: {
            color: "#fff",
            textShadow: "",
            fontSize: 14,
            fontFamily: "Helvetica Neue",
            textAlign: "",
            lineHeight: 1,
            verticalAlign: "",
            textDecoration: "",
            webkitTransform: "",
            width: 100,
            height: 100,
            top:0,
            left:0
          }
        };
	  		$scope.layerService.add(newLayer);
        layerService.setActive(newLayer)
	  	}
    }
 }]);
