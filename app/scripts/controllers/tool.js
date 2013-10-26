'use strict';

angular.module('mockupApp')
  .controller('ToolCtrl', function ($scope) {
    $scope.tools = [
      {name:'move', img:'arrow-up', status: ""},
      {name:'shape', img:'unchecked', status: ""},
      {name:'move', img:'move', status: ""},
      {name:'text-width', img:'text-width', status: ""},
      {name:'camera', img:'camera', status: ""}
    ];
    
    $scope.activateTool = function(toolName) {
	  	angular.forEach($scope.tools, function(value, key){
			  if(toolName == value.name){
			  	value.status = "active";
			  } else {
          value.status = "";
        }
		  });
	 };
  });
