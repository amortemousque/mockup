'use strict';

mockupApp
  .controller('LayerCtrl', ['$scope', 'contextService', 'layerService',function ($scope, contextService, layerService) {
  	$scope.layers = layerService.getAll();
    $scope.context = contextService.getContext();
  	$scope.layerService = layerService;
    $scope.sortableOptions = {
      update: function(e, ui) { },
      axis: 'y'
    };
    $scope.addLayerOnCanvas = function(){
    	if($scope.context.tool != undefined && $scope.context.tool.type != "move" && $scope.context.tool.type != "resize") {
        var newLayer = {
          type: $scope.context.tool.type, 
          isShow: true, 
          isActive: true,
          position: {
            top: 0,
            left: 0
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
        contextService.setLayer(newLayer);
        layerService.setActive(newLayer);
	  	}
    }
 }]);
