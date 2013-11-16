'use strict';

mockupApp
  .controller('MainCtrl', function ($scope) {
    window.mouseX;
    window.mouseY;
    $(document).mousemove( function(e) {
       window.mouseX = e.pageX; 
       window.mouseY = e.pageY;
    }); 
    $scope.newLayer = function(){
  //   	console.log("test");
  //   	$scope.modal = {
		//   "content": "Hello Modal",
		//   "saved": false
		// }
    }

  });
