mockupApp
  .directive('elementText', ["contextService", "layerService", function(contextService, layerService) {
      return {
        restrict: 'AE',
        transclude: true,
        scope: false,
        replace: true,
        require: 'ngModel',
        controller: function($scope, $element) {
          console.log("init element text");
          $scope.tool = contextService.getSelectedTool();
          $scope.layer = contextService.getSelectedLayer();
          $scope.selected = contextService.getSelected();

          $scope.$content = $element.parent();

          $scope.dblClickTextElem = function(){
            if($scope.selected.tool.type == $scope.layer.type){
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
          $scope.$content.dblclick($scope.dblClickTextElem);
        },
      }
  }]);