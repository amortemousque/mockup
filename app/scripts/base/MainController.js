'use strict';

mockupApp
  .controller('MainCtrl', ['$scope', 'context', function ($scope, context) {
    window.mouseX;
    window.mouseY;
    $(document).mousemove( function(e) {
       window.mouseX = e.pageX; 
       window.mouseY = e.pageY;
    }); 

    $scope.context = context;

  var ctrlPressed = false;
  $(window).keydown(function(evt) {
    if (evt.shiftKey) { 
      $scope.context.shortCut.shiftPressed = true;
    } else if(evt.ctrlKey && evt.keyCode == 84) { 
            console.log("Hey! Ctrl+T event captured!");

      $scope.context.shortCut.ctrlTPressed = true;
      $scope.$apply(); 

      evt.preventDefault(); 
    }
  }).keyup(function(evt) {
    $scope.context.shortCut.shiftPressed = false;
    $scope.context.shortCut.ctrlTPressed = false;
    $scope.$apply(); 

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


 	this.__defineSetter__("sliders.sliderValue", function (val) {
        return parseInt(val);
    });


  }]);
