mockupApp
  .directive('elementImage', ["context", "layerService", function(context, layerService) {
      return {
        restrict: 'AE',
        transclude: true,
        scope: false,
        replace: true,
        require: 'ngModel',
        controller: function($scope, $element) {
            
            $scope.$content = $element.parent().parent();
            $scope.fileupload = $scope.$content.find('.fileupload');
            $scope.image = $scope.$content.find(".picture");
            if($scope.layer.content != undefined) {
              $scope.image.src = $scope.layer.content;
            }

            $scope.$watch('layer.filters', function() {
              Pixastic.revert($scope.image[0]);
              $scope.image.pixastic("blurfast", {amount:$scope.layer.filters.blur})
                    .pixastic("lighten", {amount:$scope.layer.filters.lighten})
                    .pixastic("brightness", {brightness:$scope.layer.filters.brightness,contrast:$scope.layer.filters.contrast});
            }, true);


            $scope.fileupload.fileupload({
              url: "http://127.0.0.1:3000/files",
              method: "post",
              done: function (e, data) {
                  $scope.layer.content = "http://127.0.0.1:3000/files/"+data.files[0].name;
                  $scope.$apply();
              }
            });
        },
        templateUrl : '/views/element/elementImage.html'
      }

  }]);