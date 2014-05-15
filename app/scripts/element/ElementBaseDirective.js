mockupApp
  .directive('elementBase', ["context", "layerService", function(context, layerService) {
      return {
        restrict: 'AE',
        transclude: true,
        //scope: false,
        replace: false,
        require: 'ngModel',
        controller: function($scope, $element) {
          console.log("layer de la mort : ",$scope.layer);
          console.log("init element base", $element);
          $scope.context = context;
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
            if(context.tool.type == $scope.layer.type || context.tool.type == 'move'|| context.tool.type == 'resize') {
              context.layer = $scope.layer;
              layerService.setActive($scope.layer);
              if($event.type == "dragstart" ||  $event.type == "resizestart") {
                $scope.$apply();
              }
            } 
            $event.stopPropagation();
          }

          $scope.resizeElem = function(event, ui){
            // console.log("resizeElem");

            // $scope.layer = contextService.getSelectedLayer();
            // $scope.layer.properties.width = ui.size.width;
            // $scope.layer.properties.height = ui.size.height;
            // $scope.$apply();
          }

          $scope.clickRemoveElement = function($event){
            layerService.remove($scope.layer);
            $event.stopPropagation();
          }
          
         // $scope.selected = contextService.getSelected();

          $scope.$content = $($element.find(".elem-content"));

          $scope.propertiesElem = {
            top: $scope.layer.position.top,
            left: $scope.layer.position.left,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
          }

          $scope.$watch('context.layer.properties', function() {
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
            { 
              containment: "#cavans", 
              scroll: false,
              disabled: true,
              start: $scope.activeElem,
              stop: function(event, ui) {
                console.log("stop drag", ui);
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