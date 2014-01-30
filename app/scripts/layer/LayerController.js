'use strict';

mockupApp
  .controller('LayerCtrl', ['$scope', '$modal', 'contextService', 'layerService', 'commonService',function ($scope, $modal, contextService, layerService, commonService) {
  	$scope.layers = layerService.getAll();
    $scope.selected = contextService.getSelected();
  	$scope.layerService = layerService;
    $scope.canvas = contextService.getCanvas();
    $scope.sortableOptions = {
      update: function(e, ui) { },
      axis: 'y'
    };

    $("#canvas")[0].addEventListener("dragover", function(e){e.preventDefault();}, true);
    $("#canvas")[0].addEventListener("drop", function(e){
      e.preventDefault(); 
    }, true);

    $scope.addLayerOnCanvas = function(){
      console.log("image drag");
    	if($scope.selected.tool != undefined && $scope.selected.tool.type != "move" && $scope.selected.tool.type != "resize") {
        var canvasPosition = $("#canvas").offset();
          var topPosition =  window.mouseY - canvasPosition.top;
          var leftPosition =  window.mouseX - canvasPosition.left;
        var newLayer = {
          type: $scope.selected.tool.type, 
          isShow: true, 
          isActive: true,
          position: {
            top: topPosition,
            left: leftPosition
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
            webkitFilter: "",
            width: 100,
            height: 100
          },
          filters: {
             blur: 0,
             lighten: 0,
             brightness: 0,
             contrast: 0,
          },                  
          content: undefined
        };
	  		$scope.layerService.add(newLayer);
        contextService.setSelectedLayer(newLayer);
        layerService.setActive(newLayer);
	  	}
    }

    $scope.$watch('selected', function() {
      if($scope.selected.layer != undefined) {
        commonService.setProperties($scope.selected.layer.properties);
  //      $scope.form.stroke = $filter('filter')($scope.strokes, {$: $scope.properties.borderStyle }, false)[0];
     }
  }, true);
 }]);
