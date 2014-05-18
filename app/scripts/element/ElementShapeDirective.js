mockupApp
  .directive('elementShape', ["context", "layerService", function(context, layerService) {
      return {
        restrict: 'AE',
        transclude: true,
        //scope: false,
        replace: true,
        require: 'ngModel',
        controller: function($scope, $element) {
         // $scope.tool = context.tool;
         // $scope.layer = context.layer;
        },
        templateUrl : '/views/element/elementShape.html'
      }
  }]);