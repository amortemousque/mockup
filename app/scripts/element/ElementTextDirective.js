mockupApp
  .directive('elementText', ["context", "layerService", function(context, layerService) {
      return {
        restrict: 'AE',
        transclude: true,
       // scope: false,
        replace: true,
        require: 'ngModel',
        controller: function($scope, $element) {

          $scope.dblClickTextElem = function(){
            if(context.tool.type == $scope.layer.type){
              $scope.$textarea.show().focus();
              $scope.$text.hide();
            }
            return false;
          }
          $scope.blurTextElem = function(){
            console.log("blurTextElem");
            $scope.$text.show();
            $scope.$textarea.hide();
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
            
          $scope.$content.dblclick($scope.dblClickTextElem);
        },
        templateUrl : '/views/element/elementText.html'
      }
  }]);