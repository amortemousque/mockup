'use strict';

mockupApp
  .controller('MainCtrl', function ($scope) {
    window.mouseX;
    window.mouseY;
    $(document).mousemove( function(e) {
       window.mouseX = e.pageX; 
       window.mouseY = e.pageY;
    }); 
  });
