'use strict';

var LayerMenuCtrl = angular.module('mockupApp')
  .controller('LayerMenuCtrl', ['$scope', '$modal', '$filter', '$q', 'context', 'layerService', 'toolService', 'commonService', function ($scope, $modal, $filter, $q, context, layerService, toolService, commonService) {
  	$scope.layers = layerService.getAll();
  	$scope.activeClass = "active";
  //  $scope.selected = contextService.getSelected();
    $scope.fonts = commonService.getFonts();
    $scope.strokes = commonService.getStrokes();

    $scope.properties = commonService.getProperties();
    $scope.modalPromise = $modal({scope: $scope, template: 'views/layer/modal.html', show: false});

    $scope.strokePositions = [
      {id:"outline", name:"Outline"},
      {id:"border", name:"Border"}
    ];
    $scope.form = { 
      properties: commonService.getProperties(),
      font: $scope.fonts[0],
      stroke: $scope.strokes[0],
      strokePosition : $scope.strokePositions[0],
      boxShadow: {
        color: "#000000",
        inset: false,
        hpos: 10,
        vpos: 10,
        blur: 10,
        spread: 1
      }
    }

  	$scope.activateLayer = function(layer){
  		layerService.setActive(layer);
      context.layer = layer;
  	}

  	$scope.showLayer = function(layer){
  		if(layer.isShow) {
    		layer.isShow = false;
	  	} else {
	  		layer.isShow = true;
	  	}
  	}

    $scope.openModal = function () {
       if(context.layer != undefined) {
          $scope.form.properties = jQuery.extend(true, {}, context.layer.properties); //clone l'emen propriete
          $scope.form.font = $filter('filter')($scope.fonts, {$: $scope.properties.fontFamily }, false)[0];
          $scope.form.stroke = $filter('filter')($scope.strokes, {$: $scope.properties.borderStyle }, false)[0];
       }
       $scope.modalPromise.show();
    };

    $scope.validateModification = function() {
      if(context.layer != undefined ){
        if($scope.strokePositions.id == 'outline'){
          context.layer.properties.borderStyle = 'none';
        } else {
          context.layer.properties.outlineStyle = 'none';
        }
      }
      if (context.layer.type == "text") {
          $scope.form.properties.webkitBackgroundClip = "text";
          $scope.form.properties.webkitTextFillColor = "transparent";
      } else if(context.layer.type == "image") {
          $scope.form.properties.backgroundImage = "none";
      }
      if($scope.form.boxShadow != undefined) {
        var inset = "";
        if($scope.form.boxShadow.inset == true){
          inset = "inset";
        } 
        if (context.layer.type == "text") {
          $scope.form.properties.textShadow = $scope.form.boxShadow.hpos + "px " + $scope.form.boxShadow.vpos + "px " + $scope.form.boxShadow.blur + "px " + $scope.form.boxShadow.color;
        } else {
          $scope.form.properties.boxShadow = $scope.form.boxShadow.hpos + "px " + $scope.form.boxShadow.vpos + "px " + $scope.form.boxShadow.blur + "px " + $scope.form.boxShadow.spread + "px " + $scope.form.boxShadow.color + " " + inset;
        }
      }
      commonService.mapProperties($scope.form.properties, context.layer.properties);
      $scope.modalPromise.hide();
    };
}]);

