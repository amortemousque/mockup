mockupApp
  .directive('elementImage', ["context", "layerService", "$fileUploader", function(context, layerService, $fileUploader) {
      return {
        restrict: 'AE',
        transclude: true,
        scope: false,
        replace: true,
        require: 'ngModel',
        controller: function($scope, $element) {
            
            $scope.$content = $element.parent().parent();
            $scope.inputUpload = $scope.$content.find('.input-upload');
            $scope.image = $scope.$content.find(".picture");
            if($scope.layer.content != undefined) {
              $scope.image.src = $scope.layer.content;
            }

            // $scope.$watch('layer.filters', function() {
            //   Pixastic.revert($scope.image[0]);
            //   $scope.image.pixastic("blurfast", {amount:$scope.layer.filters.blur})
            //         .pixastic("lighten", {amount:$scope.layer.filters.lighten})
            //         .pixastic("brightness", {brightness:$scope.layer.filters.brightness,contrast:$scope.layer.filters.contrast});
            // }, true);

          $scope.uploadButtonHandler = function(event) {
            $scope.inputUpload.trigger("click");
            event.stopPropagation();
            return false;
          }

          $scope.clickUpload = function(event){
            event.stopPropagation();
          }




          var uploader = $scope.uploader = $fileUploader.create({
              scope: $scope,                          // to automatically update the html. Default: $rootScope
              url: "http://127.0.0.1:3000/files",
              autoUpload: true,
              method: "POST",
          });
          uploader.bind('success', function (event, xhr, item, response) {
            console.log("complete", response);
            $scope.layer.content = response.name;
            $scope.layer.properties.width = Math.round((response.size.width * $scope.layer.properties.height) / response.size.height);
          });
          // Images only
          uploader.filters.push(function(item /*{File|HTMLInputElement}*/) {
              var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
              type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          });




        },
        templateUrl : '/views/element/elementImage.html'
      }

  }]);