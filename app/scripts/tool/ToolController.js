'use strict';

mockupApp
  .controller('ToolCtrl', ['$scope', 'context', 'toolService', function ($scope, context, toolService) {
    $scope.tools = toolService.getAll();
    $scope.fonts = toolService.getAllFont();
    $scope.activateTool = function(tool) {
		angular.forEach($scope.tools, function(tool, key){
			tool.isActive = false;
		});
		tool.isActive = true;
		context.tool = tool;
	 };
  }]);
