'use strict';

mockupApp
  .controller('LayerCtrl', ['$scope', '$modal', 'context', 'layerService', 'commonService','$upload', function ($scope, $modal, context, layerService, commonService, $upload) {
  	$scope.IsInisializedElement = false;
    $scope.startPoint = {left: 0, top:0};
    $scope.layers = context.layers;
  	$scope.layerService = layerService;
    $scope.mockup = context.mockup;
    context.svg = Snap("#svg");
    $scope.sortableOptions = {
      update: function(e, ui) { },
      axis: 'y'
    };

    $scope.onFileSelect = function($files) {
      //$files: an array of files selected, each file has name, size, and type.
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        $scope.upload = $upload.upload({
          url: 'http://127.0.0.1:3000/files', //upload.php script, node.js route, or servlet url
          method: 'POST',
          data: {"content-type": 'application/json'},
          file: file
        }).progress(function(evt) {
         // console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {
          // file is uploaded successfully
          $scope.dataDrag = data;
          var newLayer = $scope.layerService.create("image");
          newLayer.success(function(layer){
            var canvasPosition = $("#canvas").offset();
            if (context.tool.type == "shape" || context.tool.type == "image") {
              layer.properties.borderWidth = 1;
            }
            layer.position.top = window.mouseY - canvasPosition.top;
            layer.position.left = window.mouseX - canvasPosition.left;

            $scope.layerService.add(layer);
            context.layer = layer;
            layerService.setActive(layer);
          });
        })
        .error(function(err){ console.log(err); alert("error");});
      }
    }
    

    $scope.$watch('context.shortCut.shiftPressed', function(shiftPressed){
      if(shiftPressed) {
        context.layer.ft.opts.keepRatio = ['bboxCorners'];
        context.layer.ft.opts.snap = { rotate:90 };
      } else if(context.layer.ft != undefined){
        context.layer.ft.opts.keepRatio = [];
        context.layer.ft.opts.snap = { rotate:0 };
      }
    });

    $scope.addLayerOnCanvas = function(dataDrag){
    	if(context.tool != undefined && context.tool.type != "move" && context.tool.type != "resize") {
        $scope.IsInisializedElement = true;
        var newLayer = $scope.layerService.create(context.tool.type);
        newLayer.success(function(layer){
          var canvasPosition = $("#canvas").offset();
          if (context.tool.type == "shape" || context.tool.type == "image") {
            layer.properties.borderWidth = 1;
          }
          layer.position.top = window.mouseY - canvasPosition.top;
          layer.position.left = window.mouseX - canvasPosition.left;


          $scope.layerService.add(layer);
          context.layer = layer;
          layerService.setActive(layer);
        });
	  	}
    }

    $scope.quitCanvas = function() {
      $scope.IsInisializedElement = false;
    }

}]);
