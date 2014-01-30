mockupApp
  .directive('elementText', ["contextService", "layerService", function(contextService, layerService) {
      return {
        restrict: 'AE',
        transclude: true,
       // scope: false,
        replace: true,
        require: 'ngModel',
        controller: function($scope, $element) {
          $scope.tool = contextService.getSelectedTool();
          $scope.selected = contextService.getSelected();

         // $scope.$content = $element.parent();

          $scope.dblClickTextElem = function(){
            if($scope.selected.tool.type == $scope.layer.type){
              $scope.$textarea.show().focus();
              $scope.$text.hide();
            }
            return false;
          }
          $scope.blurTextElem = function(){
            console.log("blurTextElem");
            $scope.$text.show();
            $scope.$textarea.hide();
            //$scope.layer.content = $scope.$textarea.val();
           // $scope.$apply();
            return false;
          }
          $scope.$text = $scope.$content.find("p");
          $scope.$textarea = $scope.$content.find("textarea")
            .css({
              "top": 0, 
              "left": 0})
            .addClass("form-control")
            .focusout($scope.blurTextElem)
            .focus();

          // if($scope.layer.content != undefined){
          //   $scope.$textarea.text($scope.layer.content);
          // }
          $scope.$content.dblclick($scope.dblClickTextElem);
        },
        templateUrl : '/views/element/elementText.html'
      }
  }]);