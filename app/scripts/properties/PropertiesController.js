'use strict';

mockupApp
  .controller('PropertiesCtrl', ['$scope', '$filter', 'context','commonService','layerService', 'toolService', function ($scope, $filter, context, commonService, layerService, toolService) {
  	$scope.layerService = layerService;
    $scope.context = context;
    $scope.layer = {};
	  $scope.fonts = commonService.getFonts();
    $scope.strokes = commonService.getStrokes();
    $scope.templateProperties = { url: "" };
    $scope.filters = {
    	blur:0
    };

  	$scope.form = {
  		font: $scope.fonts[0],
  		stroke: $scope.strokes[0],
      content: ""
  	}

    $scope.fillChange = function() {
      $scope.layer.properties.fill = $(event.target).val();
    }
    
    $scope.strokeColorChange = function() {
      $scope.layer.properties.stroke = $(event.target).val();
    }

    $scope.changeWidth = function(val) {
      context.layer.ft.attrs.scale.x = parseFloat($(event.target).val());
      context.layer.ft.apply(true);
    }

    $scope.changeHeight = function(val) {
      context.layer.ft.attrs.scale.y = parseFloat($(event.target).val());
      context.layer.ft.apply(true);
    }

    $scope.$watch('context.layer', function() {
    	if(context.layer != undefined) {
        $scope.layer = context.layer;
        $scope.templateProperties.url = "views/properties/properties"+ context.layer.type.substr(0, 1).toUpperCase() + context.layer.type .substr(1) +".html";
		    $scope.properties = context.layer.properties;
	   }
	});
 }]);
