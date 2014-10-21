mockupApp
  .directive('elementText', ["context", "layerService", function(context, layerService) {
      return {
        restrict: 'AE',
        transclude: true,
       // scope: false,
        replace: true,
        require: 'ngModel',
        controller: function($scope, $element) {
          var svg = Snap("#svg");
          var elem = svg.select("#svg g:last-child > g");
          $scope.context = context;
          $scope.layerService = layerService;
          $scope.elem = elem.text(0, 0, $scope.layer.text);

          var helper = new ElementHelper();
          helper.init($scope, $scope.layer);

          $scope.$watch('layer.text', function(text){
            $scope.elem.node = text;
            $scope.elem.attr("text", context.layer.text);
          }, true);
        }
      }
  }]);