'use strict';

mockupApp
  .controller('LayerCtrl', ['$scope', 'layerService', 'toolService', function ($scope, layerService, toolService) {
  	$scope.layers = layerService.getAll();
  	$scope.toolService = toolService;
  	$scope.layerService = layerService;
    $scope.properties = layerService.getProperties();
    $scope.templateProperties = toolService.getPropertiesTemplate();
    $scope.templateModal = {url:""};

    $scope.modal = $('#myModal').modal({"show":false});
    $scope.addLayerOnCanvas = function(){
    	var tool = $scope.toolService.getActive();
    	if(tool != undefined && tool.type != "move" && tool.type != "resize") {
    		var newLayer = {
          type: tool.type, 
          isShow: true, 
          isActive: true,
          properties : {
            "color": "#fff",
            "text-shadow": "",
            "font-size": "",
            "font-familly": "",
            "text-align": "",
            "line-height": "",
            "vertical-align": "",
            "text-decoration": "",
            "-webkit-Transform": "rotate(120deg)"
          }
        };
	  		$scope.layerService.add(newLayer);
	  	}

      $scope.newLayer = function($event){
        console.log("newLayer");
        $scope.templateModal.url = "views/menu/newLayer.html";
        $scope.modal.show();
                    $event.stopPropagation();


      }
    }
 }]);
