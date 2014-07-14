'use strict';

mockupApp
  .controller('FileCtrl', ['$scope', '$q', '$modal', '$filter', 'commonService', 'context', 'fileService', 'layerService', function ($scope, $q, $modal, $filter, commonService, context, fileService, layerService) {
  		$scope.units = commonService.getUnits();
      $scope.mockups = fileService.getAll();
      $scope.formats = commonService.getFormats();
      $scope.canvasVisibled = false;
      $scope.mockup = context.mockup;
  		$scope.file = {
        name: context.mockup.name,
        format: $scope.formats[0],
  			canvas : {
  				width: 100,
  				height: 100,
  				unit: $scope.units[0],
  			}
  		};

      $scope.gridOptions = { 
        multiSelect: false,
        columnDefs: [
          { field: 'name', displayName: 'Name' },
          { field: '', cellTemplate: 
          '<div class="cell-action pull-right">'+
            '<button class="btn btn-unstyled btn-lg" ng-click="loadMockup(row.entity)">'+
              '<i class="text-primary fa fa-pencil"></i>' +
            '</button>' +
            '<a class="btn btn-unstyled btn-lg" href="http://localhost:3000/generator/{{row.entity._id}}" target="_blank">' +
              '<i class="text-success fa fa-download"></i>' +
            '</a>' +
            '<button class="btn btn-unstyled btn-lg" ng-click="deleteMockup(row.entity)">' +
              '<i class="text-danger fa fa-times"></i>' +
            '</button>' +
          '</div>' }
        ],
        data: 'mockups' };


      // Pre-fetch an external template populated with a custom scope
      $scope.modalOpenFile = $modal({scope: $scope, template: 'views/file/openFile.html', show: false});
      $scope.modalCanvasSize = $modal({scope: $scope, template: 'views/file/canvasSize.html', show: false});

      $scope.modalNewFile = $modal(
        { scope: $scope, 
          template: 'views/file/newFile.html', 
          show: false      });
      $scope.modalSaveAs = $modal({scope: $scope, template: 'views/file/saveFile.html', show: false});
      $scope.modalError = $modal({scope: $scope, template: 'views/file/saveFile.html', show: false});
      $scope.openModal = function(modalName){
          if(modalName == "newFile")
            $scope.modalNewFile.show();
          if(modalName == "openFile")
            $scope.modalOpenFile.show();
          if(modalName == "saveAs")
            $scope.modalSaveAs.show();
          if(modalName == "canvasSize") 
            $scope.modalCanvasSize.show();
      }

      $scope.exportFile = function($event){

      };

  		$scope.newFile = function(modal){
        context.mockup.name = $scope.file.name;
        context.layers.splice(0, context.layers.length);
	  		context.mockup.canvas.width = $scope.file.canvas.width;
	  		context.mockup.canvas.height = $scope.file.canvas.height;
	  		context.mockup.canvas.unit = $scope.file.canvas.unit;
        context.mockup.canvas.isVisible = true;
        $scope.modalNewFile.hide();

  		};

      $scope.changeCanvasSize = function(modal) {
        context.mockup.canvas.width = $scope.file.canvas.width;
        context.mockup.canvas.height = $scope.file.canvas.height;
        context.mockup.canvas.unit = $scope.file.canvas.unit;
        $scope.modalCanvasSize.hide();
      }

      $scope.saveFile = function($event, modal){
        var mockup = {};
        var log = [];

        context.mockup.name = $scope.file.name;

        console.log("result save mockup", context.mockup);

        var mockupPromise = fileService.save(context.mockup);

        mockupPromise.$promise
        .then(function(result){

          context.mockup._id = result._id;

          angular.forEach(context.layers, function(layer, key){
            layer.mockup_id = result._id;
          }, log);
          var deletePromise = layerService.removeByMockupId(result._id);
          deletePromise.$promise.then(function(result){
            layerService.save(context.layers);
            $scope.mockups = fileService.getAll();
          });
        })
        $scope.modalSaveAs.hide();

      };

      $scope.loadMockup = function(mockup) {
        console.log("mockup to load", mockup);
        $scope.canvasVisibled = true;

        context.mockup.name = mockup.name;
        $scope.file.name = context.mockup.name;

        context.mockup.canvas = mockup.canvas;
        context.mockup.canvas.isVisible = true;

        context.mockup._id = mockup._id;
        var layersPromise = layerService.getAllByMockupId(mockup._id);
        layersPromise.$promise.then(function(layers){
          console.log("layers to load", layers);
          context.layers.splice (0, context.layers.length);
          angular.forEach(layers, function(layer, key){
            layerService.add(layer);
          });
        });
       // contextService.file.layers = layers;
       $scope.modalOpenFile.hide();
      }

      $scope.deleteMockup = function(mockup) {
        var deletePromise = layerService.removeByMockupId(mockup._id);
        deletePromise.$promise.then(function(result){
          var mockupPromise = fileService.delete(mockup._id);
          var index=$scope.mockups.indexOf(mockup);
          $scope.mockups.splice(index,1);  
        });
      }

      $scope.getTableStyle= function() {
       console.log("tet");
        var rowHeight=30;
        var headerHeight=45;
        return {
           height: ($scope.mockups.length * rowHeight + headerHeight) + "px"
        };
      };

    $scope.$watch('file.format', function(format) {
      console.log("change format");
      $scope.file.canvas.width = format.size.width;
      $scope.file.canvas.height = format.size.height;
      $scope.file.canvas.unit = $filter('filter')($scope.units, {$: format.size.unit_id }, false)[0];
    });

  }]);

