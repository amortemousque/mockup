mockupApp
  .directive('element', ["toolService", "layerService", function(toolService, layerService) {
      return {
        restrict: 'EA',
        transclude: true,
        scope: {newLayer: '@',  layers: '@'},
        replace: true,
        link: function ($scope, $element, $attr, controller) {
          console.log($scope.layers);
        },
        controller: function($scope, $element) {
          $scope.mouseenterElem = function(){
            console.log("mouseenterElem");
              $element.find(".btn-remove").removeClass("hide");
              $("#field-style").val($element.attr("style"));
          }

          $scope.mouseleaveElem = function(){
            console.log("mouseleaveElem");
            $element.find(".btn-remove").addClass("hide");
          } 

          $scope.clickElem = function($event) {
            $(".canvas .elem").removeClass("active");
            $(this).addClass("active");
            $event.stopPropagation();
          }

          $scope.getActiveElem = function(){
            return $(".canvas .elem.active");
          }

          $scope.getActiveLayer = function(){
            return $(".canvas .layer.active");
          }
          
          $scope.clickRemoveElement = function($event){
            console.log($scope.layer);
            layerService.remove($scope.layer.id);
            $event.stopPropagation();
          }
          
          $scope.initElemText = function(){
              $scope.dblClickTextElem = function(){
                console.log("dblclickHandler",this);
                $scope.$textarea.show().focus();
                $scope.$text.hide();
                return false;
              }
              $scope.blurTextElem = function(){
                console.log("blurTextElem");
                console.log($element.find(".elem-content"));
                $scope.$text.html($scope.$textarea.val()).show();
                $scope.$textarea.hide();
                return false;

              }
              $scope.$text = $("<p>").appendTo($scope.$content);
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
          $scope.tool = toolService.getActive();
          $scope.layer = layerService.getActive();
          console.log($scope.layer);
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
             height: 100,
             border: "solid 1px #fff"
           })
          .resizable()
          .draggable({ containment: "#canvas", scroll: false });

          if( $scope.tool.name == "text"){
            $scope.initElemText();
          }
        },
        template : 
        '<div class="elem elem-{{tool.type}}" ng-mouseleave="mouseleaveElem()"  ng-mouseenter="mouseenterElem()" ng-click="clickElem($event)">' +
          '<div class="elem-content" ng-transclude>' +
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