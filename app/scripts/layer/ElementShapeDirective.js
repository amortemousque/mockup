mockupApp
  .directive('elementShape', ["contextService", "layerService", function(contextService, layerService) {
      return {
        restrict: 'AE',
        transclude: true,
        scope: false,
        replace: true,
        require: 'ngModel',
        controller: function($scope, $element) {
          $scope.tool = contextService.getSelectedTool();
          $scope.layer = contextService.getSelectedLayer();
          $scope.selected = contextService.getSelected();
        }
      }
  }]);