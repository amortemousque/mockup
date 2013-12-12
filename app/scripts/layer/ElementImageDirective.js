mockupApp
  .directive('elementImage', ["contextService", "layerService", function(contextService, layerService) {
      return {
        restrict: 'AE',
        transclude: true,
        scope: false,
        replace: true,
        require: 'ngModel',
        controller: function($scope, $element) {
          console.log("init image");
            $scope.layer = contextService.getSelectedLayer();
            $scope.selected = contextService.getSelected();
            $scope.$content = $element.parent();
            $scope.image = new Image();

            $scope.$content.append($scope.image); 
            $($scope.image).addClass("image");

            var MAX_HEIGHT = 200;

            $scope.loadImage = function(src){
              //  Prevent any non-image file type from being read.
              if(!src.type.match(/image.*/)){
                console.log("The dropped file is not an image: ", src.type);
                return;
              }
              //  Create our FileReader and run the results through the render function.
              var reader = new FileReader();
              reader.onload = function(e){
                $scope.render(e.target.result);
              };
              reader.readAsDataURL(src);
            }

            $scope.render = function(src){
                $scope.image.src = src;
                if( $scope.image.height > MAX_HEIGHT) {
                  $scope.image.width *= MAX_HEIGHT / $scope.image.height;
                  $scope.image.height = MAX_HEIGHT;
                  $scope.layer.properties.width = $scope.image.width;
                  $scope.layer.properties.height = $scope.image.height;
                }
                console.log("digest");
                $scope.$digest();

            }

            $scope.$watch('layer.filters', function() {
              console.log("filter change", $scope.$content.find(".image"));
              var $img = $scope.$content.find(".image");
              Pixastic.revert($img[0]);
              $img = $scope.$content.find(".image");
              $img.pixastic("blurfast", {amount:$scope.layer.filters.blur})
                    .pixastic("lighten", {amount:$scope.layer.filters.lighten})
                    .pixastic("brightness", {brightness:$scope.layer.filters.brightness,contrast:$scope.layer.filters.contrast});
            }, true);

            $scope.$content[0].addEventListener("dragover", function(e){e.preventDefault();}, true);
            $scope.$content[0].addEventListener("drop", function(e){
              e.preventDefault(); 
              $scope.loadImage(e.dataTransfer.files[0]);
            }, true);
        }
      }
  }]);