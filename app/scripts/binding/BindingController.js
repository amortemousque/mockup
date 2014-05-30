'use strict';

mockupApp
  .controller('BindingCtrl', ['$scope', '$modal', 'context', 'bindingService', 'commonService',function ($scope, $modal, context, bindingService, commonService) {
    $scope.context = context;
    $scope.propertiesList = commonService.properties.toArray();

    $scope.newBinding = function() {
    	$scope.context.layer.bindings.push({property: "", name: ""});
    }

    $scope.removeBinding = function(binding) {
    	$scope.context.layer.bindings.splice($scope.context.layer.bindings.indexOf(binding), 1);
    }

 }]);
