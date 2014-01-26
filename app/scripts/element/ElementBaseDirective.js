mockupApp
  .directive('elementBase', ["contextService", "layerService", function(contextService, layerService) {
      return {
        restrict: 'AE',
        transclude: true,
        scope: false,
        replace: false,
        require: 'ngModel',
        controller: function($scope, $element) {
          console.log("init element base");
          $scope.mouseFocusElem = function(){
              $element.find(".btn-remove").removeClass("hide");
              $("#field-style").val($element.attr("style"));
          }

          $scope.mouseBlurElem = function(){
            console.log("mouseBlurElem");
            $element.find(".btn-remove").addClass("hide");
          }

          $scope.activeElem = function($event) {
            console.log("event",$event);
            if($scope.selected.tool.type == $scope.layer.type || $scope.selected.tool.type == 'move'|| $scope.selected.tool.type == 'resize') {
              console.log("start drag", $event.type);
              contextService.setSelectedLayer($scope.layer);
              layerService.setActive($scope.layer);
              if($event.type == "dragstart" ||  $event.type == "resizestart") {
                $scope.$apply();
              }
            } 
            $event.stopPropagation();
          }

          $scope.resizeElem = function(event, ui){
            console.log("resizeElem");

            $scope.layer = contextService.getSelectedLayer();
            $scope.layer.properties.width = ui.size.width;
            $scope.layer.properties.height = ui.size.height;
            $scope.$apply();
          }

          $scope.clickRemoveElement = function($event){
            console.log("clickRemoveElement", $scope.layer);
            layerService.remove($scope.layer.id);
            $event.stopPropagation();
          }
          
          $scope.selected = contextService.getSelected();

          $scope.$content = $($element.find(".elem-content"));

          var canvasPosition = $("#canvas").offset();
          console.log("canvasPosition", canvasPosition);
          var topPosition =  window.mouseY - canvasPosition.top;
          var leftPosition =  window.mouseX - canvasPosition.left;
          $scope.propertiesElem = {
            top: topPosition,
            left: leftPosition,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
          }

          $scope.$watch('selected.layer.properties', function() {
              $scope.propertiesElem.width = $scope.layer.properties.width + 2;
              $scope.propertiesElem.height = $scope.layer.properties.height + 2;
              $scope.propertiesElem.borderTopLeftRadius = $scope.layer.properties.borderTopLeftRadius;
              $scope.propertiesElem.borderTopRightRadius = $scope.layer.properties.borderTopRightRadius;
              $scope.propertiesElem.borderBottomLeftRadius = $scope.layer.properties.borderBottomLeftRadius;
              $scope.propertiesElem.borderBottomRightRadius = $scope.layer.properties.borderBottomRightRadius;
          }, false);
          var startX = 0, startY = 0, x = 0, y = 0;
          var paramsDraggable = { containment: "#canvas", scroll: false };

          $element
          .resizable({
            start: $scope.activeElem,
            resize: $scope.resizeElem,
            disabled: true
          })
          .draggable(
            { containment: "#canvas", 
              scroll: false,
              disabled: true,
              start: $scope.activeElem,
              stop: function(event, ui) {
                console.log("stop drag", ui.position.top);
                console.log("stop drag", $scope.layer);
                $scope.propertiesElem.top = ui.position.top; 
                $scope.propertiesElem.left = ui.position.left;
                $scope.layer.position.top = ui.position.top; 
                $scope.layer.position.left = ui.position.left;
                $scope.$apply();

              }
          });
          $scope.element = $element;
          $scope.$watch('selected.tool', function(tool) {
            if($scope.selected.tool.type != "resize"){
              $scope.element.resizable('disable');
            } else {
              $scope.element.resizable('enable');
            }
            if($scope.selected.tool.type != "move"){
              $scope.element.draggable('disable');
            } else {
              $scope.element.draggable('enable');
            }
          });
        },
        templateUrl : '/views/element/elementBase.html'
      }
  }]);