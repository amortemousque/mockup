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

angular.module('mockupApp').directive('uiColorpicker', function() {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: false,
        replace: true,
        template: "<span><input class='input-small' /></span>",
        link: function(scope, element, attrs, ngModel) {
            console.log("model",ngModel);
            var input = element.find('input');
            var options = angular.extend({
                color: ngModel.$viewValue,
                change: function(color) {
                    scope.$apply(function() {
                      ngModel.$setViewValue(color.toHexString());
                    });
                }
            }, scope.$eval(attrs.options));
            
            ngModel.$render = function() {
              input.spectrum('set', ngModel.$viewValue || '');
            };
            
            input.spectrum(options);
        }
    };
});