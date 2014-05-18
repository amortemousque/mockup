mockupApp
  .directive('elementBase', ["context", "layerService", function(context, layerService) {
      return {
        restrict: 'AE',
        transclude: true,
        //scope: false,
        replace: false,
        require: 'ngModel',
        controller: function($scope, $element) {
          $element = $($element.find(".elem"));
          $scope.context = context;
          $scope.mouseFocusElem = function(){
              $element.find(".btn-remove").removeClass("hide");
              $("#field-style").val($element.attr("style"));
          }

          $scope.mouseBlurElem = function(){
            $element.find(".btn-remove").addClass("hide");
          }

          $scope.activeElem = function($event) {
            if(context.tool.type == $scope.layer.type || context.tool.type == 'move'|| context.tool.type == 'resize') {
              context.layer = $scope.layer;
              layerService.setActive($scope.layer);
              if($event.type == "dragstart" ||  $event.type == "resizestart") {
                $scope.$apply();
              }
            } 
            $event.stopPropagation();
          }

          $scope.clickRemoveElement = function($event){
            layerService.remove($scope.layer);
            $event.stopPropagation();
          }
        
          $scope.layer.properties.top = $scope.layer.position.top;
          $scope.layer.properties.left = $scope.layer.position.left;

          var startX = 0, startY = 0, x = 0, y = 0;
          var paramsDraggable = { containment: "#canvas", scroll: false };

          $element
          .resizable({
            start: $scope.activeElem,
            resize: $scope.resizeElem,
            stop: function( event, ui ) {
                $scope.layer.properties.height = ui.size.height; 
                $scope.layer.properties.width = ui.size.width;
                $scope.$apply();
            },
            disabled: true
          })
          .draggable(
            { 
              containment: "#canvas", 
              scroll: false,
              disabled: true,
              start: $scope.activeElem,
              stop: function(event, ui) {
                $scope.layer.position.top = ui.position.top; 
                $scope.layer.position.left = ui.position.left;
                $scope.$apply();

              }
          });
          $scope.element = $element;
          $scope.$watch('context.tool', function(tool) {
            if(context.tool != undefined && context.tool.type != "resize"){
              $scope.element.resizable('disable');
            } else {
              $scope.element.resizable('enable');
            }
            if(context.tool != undefined && context.tool.type != "move"){
              $scope.element.draggable('disable');
            } else {
              $scope.element.draggable('enable');
            }
          });
        },
        templateUrl : '/views/element/elementBase.html'
      }
  }]);