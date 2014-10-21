mockupApp
  .directive('elementImage', ["context", "layerService", function(context, layerService) {
      return {
        restrict: 'AE',
        transclude: true,
        scope: false,
        replace: true,
        require: 'ngModel',
        controller: function($scope, $element) {
            
            console.log($scope.dataDrag);

            var svg = Snap("#svg");
            var elem = svg.select("#svg g:last-child > g");
            $scope.context = context;
            $scope.layerService = layerService;
            $scope.layer.size.width = $scope.dataDrag.size.width / 3;
            $scope.layer.size.height = $scope.dataDrag.size.width / 3;
            
            $scope.elem = elem.image("http://127.0.0.1:3000/files/" + $scope.dataDrag.name, 10, 10, $scope.layer.size.width, $scope.layer.size.height);

            var helper = new ElementHelper();
            helper.init($scope, $scope.layer);

            $scope.$watch('layer.size', function(size){
              $scope.ft.attrs.scale.x = size.width;
              $scope.ft.attrs.scale.y = size.height;
              $scope.ft.apply(true);
            }, true);
            // $scope.$watch('layer.filters', function() {
            //   Pixastic.revert($scope.image[0]);
            //   $scope.image.pixastic("blurfast", {amount:$scope.layer.filters.blur})
            //         .pixastic("lighten", {amount:$scope.layer.filters.lighten})
            //         .pixastic("brightness", {brightness:$scope.layer.filters.brightness,contrast:$scope.layer.filters.contrast});
            // }, true);







        }
      }

  }]);