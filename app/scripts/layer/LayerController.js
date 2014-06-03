'use strict';

mockupApp
  .controller('LayerCtrl', ['$scope', '$modal', 'context', 'layerService', 'commonService',function ($scope, $modal, context, layerService, commonService) {
  	$scope.layers = context.layers;
  	$scope.layerService = layerService;
    $scope.mockup = context.mockup;
    $scope.sortableOptions = {
      update: function(e, ui) { },
      axis: 'y'
    };

    $("#canvas")[0].addEventListener("dragover", function(e){e.preventDefault();}, true);
    $("#canvas")[0].addEventListener("drop", function(e){
      e.preventDefault(); 
    }, true);

    $scope.addLayerOnCanvas = function(){
    	if(context.tool != undefined && context.tool.type != "move" && context.tool.type != "resize") {
        var canvasPosition = $("#canvas").offset();

        var newLayer = {
          type: context.tool.type, 
          isShow: true, 
          isActive: true,
          position: {
            top: window.mouseY - canvasPosition.top,
            left: window.mouseX - canvasPosition.left
          },
          properties: {
            color: "#999",
            textShadow: "",
            borderStyle: 'solid',
            borderColor: '#999',
            borderWidth: 0,
            fontSize: 14,
            fontFamily: "Helvetica Neue",
            textAlign: "",
            lineHeight: 1,
            verticalAlign: "",
            textDecoration: "",
            webkitTransform: "",
            webkitFilter: "",
            width: 100,
            height: 100
          },
          bindings: [],
          filters: {
             blur: 0,
             lighten: 0,
             brightness: 0,
             contrast: 0,
          },                  
          content: undefined
        };


        if (context.tool.type == "shape" || context.tool.type == "image") {
          newLayer.properties.borderWidth = 1;
        }

	  		$scope.layerService.add(newLayer);
        context.layer = newLayer;
        layerService.setActive(newLayer);
	  	}
    }

  $scope.$watch('context.layer', function() {
    if(context.layer != undefined) {
        commonService.setProperties(context.layer.properties);
     }
  }, true);
 }]);
