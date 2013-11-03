'use strict';

mockupApp
  .controller('PropertiesCtrl', ['$scope', 'layerService', 'toolService', function ($scope, layerService, toolService) {
  	$scope.layerService = layerService;
	$scope.properties = {
	    color: "#fff",
	    textShadow: "",
	    fontSize: "",
	    fontFamilly: "",
	    textAlign: "",
	    lineHeight: "",
	    verticalAlign: "",
	    textDecoration: "",
	    webkitTransform: "",
	    width: "",
	    height: ""
	},
    $scope.templateProperties = toolService.getPropertiesTemplate();

    $scope.$watch('properties', function() {
     	var activeLayer = $scope.layerService.getActive();
     	activeLayer.properties = $scope.properties;
	}, true);
 }]);
