'use strict';

mockupApp
  .controller('LayerCtrl', ['$scope', 'contextService', 'layerService',function ($scope, contextService, layerService) {
  	$scope.layers = layerService.getAll();
    $scope.selected = contextService.getSelected();
  	$scope.layerService = layerService;
    $scope.canvas = contextService.getCanvas();
    $scope.sortableOptions = {
      update: function(e, ui) { },
      axis: 'y'
    };
    $scope.addLayerOnCanvas = function(){
    	if($scope.selected.tool != undefined && $scope.selected.tool.type != "move" && $scope.selected.tool.type != "resize") {
        var newLayer = {
          type: $scope.selected.tool.type, 
          isShow: true, 
          isActive: true,
          position: {
            top: 0,
            left: 0
          },
          properties: {
            color: "#fff",
            textShadow: "",
            borderStyle: 'none',
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
        contextService.setSelectedLayer(newLayer);
        layerService.setActive(newLayer);
	  	}
    }
 }]);
