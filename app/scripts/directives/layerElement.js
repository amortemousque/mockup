mockupApp
  .directive('element', ["toolService", "layerService", function(toolService, layerService) {
      return {
        restrict: 'EA',
        transclude: true,
        scope: {},
        replace: true,
        controller: function($scope, $element) {
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
            console.log("clickElem",$scope.layer);
            $scope.attachPropertyPanel();
            $scope.setActive();
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
          $scope.setActive = function() {
            console.log("setActive", $element);
            layerService.setActive($scope.layer)
            $(".canvas .elem").removeClass("active");
            $element.addClass("active");
          }

          $scope.attachPropertyPanel = function(){
            $scope.properties.color = $scope.$content.css("color");
            $scope.properties.fontFamilly = $scope.$content.css("font-familly");
            $scope.properties.fontSize = $scope.$content.css("font-size");
            $scope.properties.lineHeight = $scope.$content.css("line-height");
            $scope.properties.verticalAlign = $scope.$content.css("vertical-align");
            $scope.properties.textDecoration = $scope.$content.css("text-decoration");
            $scope.properties.webkitTransform = $scope.$content.css("-webkit-transform");
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
          $scope.changeProperties = function(elem) {
            var active = layerService.getActive();
            if($scope.layer.id == active.id){
              return $scope.properties;
            } else {
              return {
                "color" : $scope.$content.css("color"),
                "fontFamilly" : $scope.$content.css("font-familly"),
                "fontSize" : $scope.$content.css("font-size"),
                "lineHeight" : $scope.$content.css("line-height"),
                "verticalAlign" : $scope.$content.css("vertical-align"),
                "textDecoration" : $scope.$content.css("text-decoration"),
                "borderStyle" : $scope.$content.css("border-style"),
                "borderWidth": $scope.$content.css("border-width"),
                "borderColor": $scope.$content.css("border-color"),
                "webkitTransform": $scope.$content.css("webkit-transform")
              }
            }
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
              $scope.$img = $("<img>").appendTo($scope.$content).css({"width" : "100%", "height": "100%"}).hide();
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
          $scope.properties = layerService.getProperties();
          $scope.$content = $($element.find(".elem-content"));

          canvasPosition = $("#canvas").offset();
          var topPosition =  window.mouseY - canvasPosition.top;
          var leftPosition =  window.mouseX - canvasPosition.left;

          var startX = 0, startY = 0, x = 0, y = 0;
          var paramsDraggable = { containment: "#canvas", scroll: false };
          $element.css({
             position: 'absolute',
             top: topPosition,
             left: leftPosition,
             cursor: 'pointer',
             width: 100,
             height: 100
           })
          .resizable({
            resize: $scope.resizeElem
          })
          .draggable(
            { containment: "#canvas", 
              scroll: false,
              drag: $scope.dragElem
          });
          if( $scope.tool.name == "text"){
            $scope.initElemText();
          }
          if( $scope.tool.name == "image"){
            $scope.initElemImage();
          }
          $scope.setActive();
        },
        template : 
        '<div class="elem elem-{{tool.type}} active" ng-blur="mouseBlurElem()"  ng-focus="mouseFocusElem()" ng-click="clickElem($event)">' +
          '<div class="elem-content" ng-transclude ng-style="changeProperties(this)">' +
          '</div>' +
          '<div class="elem-footer">' +
            '<button ng-click="clickRemoveElement($event)" class="btn btn-remove">' +
              '<span class="glyphicon glyphicon-trash"></span>' + 
            '</button>' +
          '</div>' +
        '</div>',
      }
  }]);

angular.module('mockupApp').directive('ngBlur', ['$parse', function($parse) {
  return function(scope, element, attr) {
    var fn = $parse(attr['ngBlur']);
    element.bind('blur', function(event) {
      scope.$apply(function() {
        fn(scope, {$event:event});
      });
    });
  }
}]);