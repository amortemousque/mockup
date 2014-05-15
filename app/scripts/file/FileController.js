'use strict';

mockupApp
  .controller('FileCtrl', ['$scope', '$q', '$modal', '$filter', 'commonService', 'context', 'fileService', 'layerService', function ($scope, $q, $modal, $filter, commonService, context, fileService, layerService) {
  		$scope.units = commonService.getUnits();
      $scope.mockups = fileService.getAll();
  		$scope.file = {
        name: context.mockup.name,
  			canvas : {
  				width: 100,
  				height: 100,
  				unit: $scope.units[0]
  			}
  		};

      $scope.gridOptions = { 
        multiSelect: false,
        columnDefs: [
            { field: 'name', displayName: 'Name' },
            { field: '', cellTemplate: '<div class="cell-action pull-right"><button class="btn btn-unstyled btn-lg" ng-click="loadMockup(row.entity)"><i class="text-primary fa fa-pencil"></i></button> <button class="btn btn-unstyled btn-lg" ng-click="deleteMockup(row.entity)"><i class="text-danger fa fa-times"></i></button></div>' }
        ],
        data: 'mockups' };

      // Show a basic modal from a controller
    //  var myModal = $modal({title: 'My Title', content: 'My Content', show: true});

      // Pre-fetch an external template populated with a custom scope
      $scope.modalOpenFile = $modal({scope: $scope, template: 'views/file/openFile.html', show: false});
      $scope.modalNewFile = $modal({scope: $scope, template: 'views/file/newFile.html', show: false});
      $scope.modalSaveAs = $modal({scope: $scope, template: 'views/file/saveFile.html', show: false});
      $scope.modalError = $modal({scope: $scope, template: 'views/file/saveFile.html', show: false});
      $scope.openModal = function(modalName){
          if(modalName == "newFile")
            $scope.modalNewFile.show();
          if(modalName == "openFile")
            $scope.modalOpenFile.show();
          if(modalName == "saveAs")
            $scope.modalSaveAs.show();
      }

      $scope.exportFile = function($event){

      };

  		$scope.newFile = function(modal){
  			console.log("modal", modal);
			  context.mockup.layers = [];
	  		context.mockup.canvas.width = $scope.file.canvas.width;
	  		context.mockup.canvas.height = $scope.file.canvas.height;
	  		context.mockup.canvas.unit = $scope.file.canvas.unit;

  		};

      $scope.saveFile = function($event, modal){
        var mockup = {};
        var log = [];
        console.log("name",$scope.file.name);
        context.mockup.name = $scope.file.name;
        //copy la reference pour ne pas casser les bindings
       // angular.copy(context.mockup, mockup);
        var mockupPromise = fileService.save(context.mockup);

        mockupPromise.$promise
        .then(function(result){
          console.log("result save mockup", result);
          angular.forEach(context.layers, function(layer, key){
            layer.mockup_id = result._id;
          }, log);
          var deletePromise = layerService.removeByMockupId(result._id);
          deletePromise.$promise.then(function(result){
            layerService.save(context.layers);
          });
        })
        $scope.modalSaveAs.hide();

      };

      $scope.loadMockup = function(mockup) {
        console.log("mockup to load", mockup);
        context.mockup = mockup;
      //  $scope.form.font = $filter('filter')($scope.units, {$: mockup.canvas.unit.id}, false)[0];
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

  }]);
