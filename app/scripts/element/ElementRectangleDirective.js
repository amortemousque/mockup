mockupApp
  .directive('elementRectangle', ["context", "layerService", function(context, layerService) {
      return {
        restrict: 'AE',
        transclude: true,
        //scope: false,
        replace: true,
        require: 'ngModel',
        controller: function($scope, $element) {
          var svg = Snap("#svg");
          var elem = svg.select("#svg g:last-child > g");
          $scope.context = context;
          $scope.layerService = layerService;
          $scope.elem = elem.rect(0, 0, $scope.layer.size.width, $scope.layer.size.height);

          var helper = new ElementHelper();
          helper.init($scope, $scope.layer);


          $scope.startPoint.top = $scope.layer.position.top;
          $scope.startPoint.left = $scope.layer.position.left;


          $scope.$watch('layer.size', function(size){
            $scope.ft.attrs.scale.x = size.width;
            $scope.ft.attrs.scale.y = size.height;
            $scope.ft.apply(true);
          }, true);


          $("#canvas").mousemove(function(){
            if($scope.IsInisializedElement && $scope.layer.isActive) {
              var canvasPosition = $("#canvas").offset();
              var canvasTopPos = window.mouseY - canvasPosition.top;
              var canvasLeftPos = window.mouseX - canvasPosition.left;
              var actualTopPos = canvasTopPos - $scope.startPoint.top;
              var actualLeftPos = canvasLeftPos - $scope.startPoint.left;
              if(canvasTopPos >= $scope.startPoint.top) {
                $scope.ft.attrs.scale.y = actualTopPos;
                $scope.ft.attrs.translate.y =  $scope.startPoint.top + (actualTopPos / 2);
              }

              if(canvasLeftPos >= $scope.startPoint.left) {
                $scope.ft.attrs.scale.x = actualLeftPos;
                $scope.ft.attrs.translate.x = $scope.startPoint.left  + (actualLeftPos / 2);
              }  
              $scope.ft.apply();
            }
          });
        },
      }
  }]);