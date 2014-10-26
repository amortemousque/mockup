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
        //headers: {'header-key': 'header-value'},
        //withCredentials: true,
        data: {"content-type": 'application/json'},
        file: file, // or list of files ($files) for html5 only
        //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
        // customize file formData name ('Content-Disposition'), server side file variable name. 
        //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
        // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
        //formDataAppender: function(formData, key, val){}
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
        //console.log(data);
      })
      .error(function(err){ console.log(err); alert("error");});
      //.then(success, error, progress); 
      // access or attach event listeners to the underlying XMLHttpRequest.
      //.xhr(function(xhr){xhr.upload.addEventListener(...)})
    }
  }
    

    $scope.$watch('context.shortCut.shiftPressed', function(shiftPressed){
      if(shiftPressed) {
        context.layer.ft.opts.keepRatio = ['bboxCorners'];
        context.layer.ft.opts.snap = { rotate:90 };
      } else {
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
