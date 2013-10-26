'use strict';

angular.module('mockupApp')
  .controller('LayerCtrl', function ($scope) {
  	

  	$scope.layers = [
      {name: 'Layer 1'},
      {name: 'Layer 2'}
    ];
    $scope.layers = [
      {name: 'Layer 1'},
      {name: 'Layer 2'}
    ];

    $scope.templateDetails = "";
    
    $scope.addLayer = function(){
    	$scope.templateDetails = "views/layer/detail.html";

    }
	
	$scope.saveLayer = function(toolName) {
	  	$scope.layers.push({name : 'test'});
	};

	$scope.editName = function() {

	}
 });
