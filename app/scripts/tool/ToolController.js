'use strict';

mockupApp
  .controller('ToolCtrl', ['$scope', 'contextService', 'toolService', function ($scope, contextService, toolService) {
    $scope.tools = toolService.getAll();
    $scope.fonts = toolService.getAllFont();
    $scope.activateTool = function(tool) {
		toolService.setPropertiesTemplate(tool.propertiesTemplate);
		angular.forEach($scope.tools, function(tool, key){
			tool.isActive = false;
		});
		tool.isActive = true;
		contextService.setTool(tool);
	 };
  }]);
