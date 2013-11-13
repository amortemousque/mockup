mockupApp
  .directive('element', ["toolService", "layerService", function(toolService, layerService) {
      return {
        restrict: 'E',
        transclude: true,
        scope: false,
        replace: true,
        require: 'ngModel',
        link: function($scope, $element, attr, ngModel) {
          $scope.mouseFocusElem = function(){
            console.log("mouseFocusElem");
              $element.find(".btn-remove").removeClass("hide");
              $("#field-style").val($element.attr("style"));
          }

          $scope.mouseBlurElem = function(){
            console.log("mouseBlurElem");
            $element.find(".btn-remove").addClass("hide");
          }

          $scope.clickElem = function($event) {
            $scope.layer.isActive(true);
            $event.stopPropagation();
          }
          $scope.dragElem = function(){
             activeTool = toolService.getActive();
              if(activeTool.type != "move"){
                return false;
              } 
          }
          $scope.resizeElem = function(){
            console.log("resize");
          }

          $scope.clickRemoveElement = function($event){
            console.log("clickRemoveElement", $scope.layer);
            layerService.remove($scope.layer.id);
            $event.stopPropagation();
          }
          
          $scope.initElemText = function(){
              $scope.dblClickTextElem = function(){
                activeTool = toolService.getActive();
                if(activeTool.type == $scope.layer.type){
                  $scope.$textarea.show().focus();
                  $scope.$text.hide();
                }
                return false;
              }
              $scope.blurTextElem = function(){
                console.log("blurTextElem");
                $scope.$text.html($scope.$textarea.val()).show();
                $scope.$textarea.hide();
                return false;
              }
              $scope.$text = $("<p>").appendTo($scope.$content).hide();
              $scope.$textarea = $("<textarea>")
                .css({
                  "top": 0, 
                  "left": 0})
                .appendTo($scope.$content)
                .addClass("form-control")
                .focusout($scope.blurTextElem)
                .focus();
              $element.dblclick($scope.dblClickTextElem);
          }

          $scope.initElemImage = function() {
              $scope.dblClickTextElem = function(){
                console.log("dblclickHandler",this);
                $scope.$img.hide();
                $scope.$submitImg.show().focus();
                $scope.$input.show();
                return false;
              }
              $scope.blurImageElem = function(){
                console.log("blurTextElem");
                var oFReader = new FileReader();
                oFReader.readAsDataURL($scope.$input[0].files[0]);
                oFReader.onload = function (oFREvent) {
                  console.log("oFREvent");
                  $scope.$img[0].src = oFREvent.target.result;
                };
                $scope.$input.hide();
                $scope.$submitImg.hide();
                $scope.$img.show();
                return false;
              }
              $scope.$img = $("<img ng-style='layer.properties'>").appendTo($scope.$content).css({"width" : "100%", "height": "100%"}).hide();
              $scope.$input = $("<input type='file'>")
                .css({
                  "top": 0, 
                  "left": 0})
                .appendTo($scope.$content)
                .addClass("form-control")
              $scope.$submitImg = $("<button>")
              .click($scope.blurImageElem)
              .appendTo($scope.$content).html("Valider");
              $element.dblclick($scope.dblClickTextElem); 
          }
          $scope.tool = toolService.getActive();
          $scope.layer = layerService.getActive();
          
          $scope.$content = $($element.find(".elem-content"));

          canvasPosition = $("#canvas").offset();
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
          $scope.$watch('layer.properties', function() {
              $scope.propertiesElem.width = $scope.layer.properties.width + 2;
              $scope.propertiesElem.height = $scope.layer.properties.height + 2;
              $scope.propertiesElem.borderTopLeftRadius = $scope.layer.properties.borderTopLeftRadius;
              $scope.propertiesElem.borderTopRightRadius = $scope.layer.properties.borderTopRightRadius;
              $scope.propertiesElem.borderBottomLeftRadius = $scope.layer.properties.borderBottomLeftRadius;
              $scope.propertiesElem.borderBottomRightRadius = $scope.layer.properties.borderBottomRightRadius;
          }, true);
          var startX = 0, startY = 0, x = 0, y = 0;
          var paramsDraggable = { containment: "#canvas", scroll: false };

          $element
          .resizable({
            resize: $scope.resizeElem
          })
          .draggable(
            { containment: "#canvas", 
              scroll: false,
              drag: $scope.dragElem,
              stop: function(event, ui) {
                $scope.propertiesElem.top = ui.position.top; 
                $scope.propertiesElem.left = ui.position.left;
              }
          });
          if( $scope.tool.name == "text"){
            $scope.initElemText();
          }
          if( $scope.tool.name == "image"){
            $scope.initElemImage();
          }
        },
        template : 
        '<div class="elem elem-{{tool.type}} {{layer.active}}" ' +
         'ng-style="propertiesElem" ' +
         'ng-blur="mouseBlurElem()"  ng-focus="mouseFocusElem()" ng-click="clickElem($event)">' +
          '<div class="elem-content" ng-transclude ng-style="layer.properties">' +
          '</div>' +
          '<div class="elem-footer">' +
            '<button ng-click="clickRemoveElement($event)" class="btn btn-remove">' +
              '<span class="glyphicon glyphicon-trash"></span>' + 
            '</button>' +
          '</div>' +
        '</div>',
      }
  }]);