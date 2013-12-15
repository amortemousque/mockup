'use strict';

var LayerMenuCtrl = angular.module('mockupApp')
  .controller('LayerMenuCtrl', ['$scope', '$modal', '$filter', '$q', 'contextService', 'layerService', 'toolService', 'commonService', function ($scope, $modal, $filter, $q, contextService, layerService, toolService, commonService) {
  	$scope.layers = layerService.getAll();
  	$scope.activeClass = "active";
    $scope.selected = contextService.getSelected();
    $scope.fonts = commonService.getFonts();
    $scope.strokes = commonService.getStrokes();

    $scope.properties = commonService.getProperties();

    $scope.strokePositions = [
      {id:"outline", name:"Outline"},
      {id:"border", name:"Border"}
    ];
    $scope.form = { 
      properties: commonService.getProperties(),
      font: $scope.fonts[0],
      stroke: $scope.strokes[0],
      strokePosition : $scope.strokePositions[0]
    }

    $scope.modalPromise = $modal({template: 'views/layer/modal.html', persist: true, backdrop: 'static', show: false, scope: $scope});

  	$scope.activateLayer = function(layer){
  		layerService.setActive(layer);
  		contextService.setSelectedLayer(layer);
  	}

  	$scope.showLayer = function(layer){
  		if(layer.isShow) {
    		layer.isShow = false;
	  	} else {
	  		layer.isShow = true;
	  	}
  	}

    $scope.openModal = function () {
       if($scope.selected.layer != undefined) {
          $scope.form.properties = jQuery.extend(true, {}, $scope.selected.layer.properties); //clone l'emen propriete
          $scope.form.font = $filter('filter')($scope.fonts, {$: $scope.properties.fontFamily }, false)[0];
          $scope.form.stroke = $filter('filter')($scope.strokes, {$: $scope.properties.borderStyle }, false)[0];
       }
       $q.when($scope.modalPromise).then(function(modalEl) {
          modalEl.modal('show');
        });
    };

    $scope.validateModification = function() {
      if($scope.selected.layer != undefined ){
        if($scope.strokePositions.id == 'outline'){
          $scope.selected.layer.properties.borderStyle = 'none';
        } else {
          $scope.selected.layer.properties.outlineStyle = 'none';
        }
      }
      commonService.mapProperties($scope.form.properties, $scope.selected.layer.properties);
      $q.when($scope.modalPromise).then(function(modalEl) {
          modalEl.modal('hide');
      });
    };
}]);

