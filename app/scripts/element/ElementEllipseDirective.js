mockupApp
  .directive('elementEllipse', ["context", "layerService", function(context, layerService) {
      return {
        restrict: 'AE',
        transclude: true,
        //scope: false,
        replace: true,
        require: 'ngModel',
        controller: function($scope, $element) {
          var svg = Snap("#svg");
          var g = svg.select("#svg g:last-child > g");
          $scope.context = context;
          $scope.layerService = layerService;
          $scope.elem = g.ellipse(0, 0, $scope.layer.properties.rx, $scope.layer.properties.ry);
          
          var helper = new ElementHelper();
          helper.init($scope, $scope.layer);


          $scope.startPoint.top = $scope.layer.position.top;
          $scope.startPoint.left = $scope.layer.position.left;


          $scope.$watch('layer.properties.width', function(width){
            $scope.ft.attrs.scale.x = width / 2;
            $scope.ft.apply(true);
          }, true);

          $scope.$watch('layer.properties.height', function(height){
            $scope.ft.attrs.scale.y = height / 2;
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
                  $scope.ft.attrs.scale.y = actualTopPos / 2;
                  $scope.ft.attrs.translate.y =  $scope.startPoint.top + (actualTopPos / 2);
                } 

                if(canvasLeftPos >= $scope.startPoint.left) {
                  $scope.ft.attrs.scale.x = actualLeftPos /2;
                  $scope.ft.attrs.translate.x = $scope.startPoint.left  + (actualLeftPos / 2);

                } 
                $scope.ft.apply();
    
            }
         // var canvasPosition = $("#canvas").offset();
         //      var canvasTopPos = window.mouseY - canvasPosition.top;
         //      var canvasLeftPos = window.mouseX - canvasPosition.left;
         //      var actualTopPos = canvasTopPos - context.layer.position.top;
         //      var actualLeftPos = canvasLeftPos - context.layer.position.left;

         //      if(context.shortCut.shiftPressed == true) {
         //        $scope.ft.attrs.scale = {x: Math.abs(actualTopPos), y: Math.abs(actualLeftPos)};
         //      } else {
         //        $scope.ft.attrs.scale = {x: Math.abs(actualLeftPos), y: Math.abs(actualLeftPos)};
         //      } 
         //      $scope.ft.apply();

          });
        },
      }
  }]);