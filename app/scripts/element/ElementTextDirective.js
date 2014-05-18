mockupApp
  .directive('elementText', ["context", "layerService", function(context, layerService) {
      return {
        restrict: 'AE',
        transclude: true,
       // scope: false,
        replace: true,
        require: 'ngModel',
        controller: function($scope, $element) {
          console.log("element", $element);
          $scope.dblClickTextElem = function(){
            if(context.tool.type == $scope.layer.type){
              $scope.$textarea.show().focus();
              $scope.$p.hide();
            }
            return false;
          }
          $scope.blurTextElem = function() {
            $scope.$textarea.hide();
            $scope.$p.show();
            return false;
          }
          $scope.calculeSize = function() {
            $scope.layer.properties.width =  $(this).outerWidth();
            $scope.layer.properties.height =  $(this).outerHeight();
            $scope.$apply();
            return false;
          }
          $scope.$p = $element.find("p").hide();
          $scope.$textarea = $element.find("textarea")
            .css({
              "top": 0, 
              "left": 0})
            .addClass("form-control")
            .focusout($scope.blurTextElem)
            .mouseup($scope.calculeSize)  
            .focus();
          $element.dblclick($scope.dblClickTextElem);
        },
        templateUrl : '/views/element/elementText.html'
      }
  }]);