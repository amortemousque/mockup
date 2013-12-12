'use strict';

mockupApp
  .controller('PropertiesCtrl', ['$scope', '$filter', 'contextService','commonService','layerService', 'toolService', function ($scope, $filter, contextService, commonService, layerService, toolService) {
  	$scope.layerService = layerService;
	$scope.selected = contextService.getSelected();
	$scope.fonts = commonService.getFonts();
    $scope.strokes = commonService.getStrokes();
    $scope.templateProperties = toolService.getPropertiesTemplate();
    $scope.filters = {
    	blur:0
    };
	$scope.properties = {
	    color: "#fff",
	    textShadow: "",
	    fontSize: 14,
	    fontFamily: "Helvetica Neue",
	    borderStyle: "none", 
	    textAlign: "",
	    lineHeight: 1,
	    verticalAlign: "",
	    textDecoration: "",
	    webkitTransform: "",
	    width: "",
	    height: ""
	};

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

    $scope.$watch('selected', function() {
    	if($scope.selected.layer != undefined) {
	    	$scope.properties = $scope.selected.layer.properties;
	    	$scope.filters = $scope.selected.layer.filters;

	    	$scope.form.font = $filter('filter')($scope.fonts, {$: $scope.properties.fontFamily }, false)[0];
	    	$scope.form.stroke = $filter('filter')($scope.strokes, {$: $scope.properties.borderStyle }, false)[0];
	    	
	    	console.log('context change', $scope.selected.layer.properties);
	   }
	}, true);
 }]);
