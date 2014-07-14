'use strict';

mockupApp
  .controller('MainCtrl', function ($scope) {
    window.mouseX;
    window.mouseY;
    $(document).mousemove( function(e) {
       window.mouseX = e.pageX; 
       window.mouseY = e.pageY;
    }); 

	$scope.sliders = {};
	$scope.sliders.sliderValue = 100;

	$scope.zoom = 1;
	$scope.testOptions = {
		min: 0,
		max: 300,
		step: 1,
		value: 100	
	};



  });
