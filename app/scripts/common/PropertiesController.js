'use strict';

mockupApp
  .controller('PropertiesCtrl', ['$scope', '$filter', 'context','commonService','layerService', 'toolService', function ($scope, $filter, context, commonService, layerService, toolService) {
  	$scope.layerService = layerService;
    $scope.context = context;
	$scope.fonts = commonService.getFonts();
    $scope.strokes = commonService.getStrokes();
    $scope.templateProperties = { url: "" };
    $scope.filters = {
    	blur:0
    };
    $scope.properties = commonService.getProperties();

    $scope.templates = [
          {type: 'shape', propertiesTemplate: "views/properties/propertiesShape.html"},
          {type: 'resize',  propertiesTemplate: "views/properties/propertiesResize.html"},
          {type: 'text',  propertiesTemplate : "views/properties/propertiesText.html"},
          {type: 'image',  propertiesTemplate : "views/properties/propertiesImage.html" }
        ],

	$scope.form = {
		font: $scope.fonts[0],
		stroke: $scope.strokes[0]
	}

    $scope.$watch('form.font', function(font) {
    	if(font != undefined) {
    		$scope.properties.fontFamily = font.css;
    	}	
    });

    $scope.$watch('form.stroke', function(stroke) {
		if(stroke != undefined) {
    		$scope.properties.borderStyle = stroke.css;
    	}	
    });

    $scope.$watch('context.layer', function() {
    	if(context.layer != undefined) {
        $scope.templateProperties.url = $filter('filter')($scope.templates, {$: context.layer.type }, false)[0].propertiesTemplate;
		    $scope.properties = context.layer.properties;
	    	$scope.form.font = $filter('filter')($scope.fonts, {$: $scope.properties.fontFamily }, false)[0];
	    	$scope.form.stroke = $filter('filter')($scope.strokes, {$: $scope.properties.borderStyle }, false)[0];
	   }
	});
 }]);
