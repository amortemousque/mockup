'use strict';

mockupApp
  .controller('ToolCtrl', ['$scope', 'toolService', function ($scope, toolService) {
    $scope.tools = toolService.getAll();

    $scope.activateTool = function(tool) {
      toolService.setPropertiesTemplate(tool.propertiesTemplate);
      toolService.setActive(tool.name);
	 };
  }]);
