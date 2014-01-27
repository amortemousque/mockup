'use strict';

mockupApp
  .controller('FileCtrl', ['$scope', '$q', '$modal', '$filter', 'commonService', 'contextService', 'fileService', 'layerService', function ($scope, $q, $modal, $filter, commonService, contextService, fileService, layerService) {
  		$scope.units = commonService.getUnits();
      $scope.mockups = fileService.getAll();
  		$scope.file = {
        name: undefined,
  			canvas : {
  				width: 100,
  				height: 100,
  				unit: $scope.units[0]
  			}
  		};


      // Show a basic modal from a controller
    //  var myModal = $modal({title: 'My Title', content: 'My Content', show: true});

      // Pre-fetch an external template populated with a custom scope
      $scope.modalOpenFile = $modal({scope: $scope, template: 'views/file/openFile.html', show: false});
      $scope.modalNewFile = $modal({scope: $scope, template: 'views/file/newFile.html', show: false});
      $scope.modalSaveAs = $modal({scope: $scope, template: 'views/file/saveFile.html', show: false});

      $scope.openModal = function(modalName){
          if(modalName == "newFile")
            $scope.modalNewFile.show();
          if(modalName == "openFile")
            $scope.modalOpenFile.show();
          if(modalName == "saveAs")
            $scope.modalSaveAs.show();
      }

   //   $scope.modalOpenFile = $modal({scope: $scope, template: 'views/file/openFile.html', show: true});

      // Show when some event occurs (use $promise property to ensure the template has been loaded)
      // modelOpenFile.$promise.then(function() {
      //   myOtherModal.show();
      // })

      $scope.exportFile = function($event){
        // var data = {a:1, b:2, c:3};
        // var json = JSON.stringify(data);
        // var blob = new Blob([json], {type: "application/json"});
        // var url  = URL.createObjectURL(blob);

        // $('#export-a').attr("href", url)
        // .attr("download", "backup.json").attr("textContent", "Download backup.json");
        // a.download    = "backup.json";
        // a.href        = url;
        // a.textContent = "Download backup.json";
        // console.log(a);
        // console.log(document.getElementById('export'));
        // document.getElementById('export').appendChild(a);
        // console.log("exportFile", $event);
         // $event.stopPropagation();
         // return false;
      };

  		$scope.newFile = function(modal){
  			console.log("modal", modal);
			  contextService.file.layers = [];
	  		contextService.file.canvas.width = $scope.file.canvas.width;
	  		contextService.file.canvas.height = $scope.file.canvas.height;
	  		contextService.file.canvas.unit = $scope.file.canvas.unit;
        $event.stopPropagation();
  		};

      $scope.saveFile = function($event, modal){
        var mockup = {};
        var log = [];
        console.log("name",$scope.file.name);
        contextService.file.name = $scope.file.name;
        //copy la reference pour ne pas casser les bindings
        angular.copy(contextService.file, mockup);
        var layers = mockup.layers;
        mockup.layers = undefined;
        mockup.selected = undefined;
        mockup = fileService.save(mockup);

        angular.forEach(layers, function(layer, key){
          layer.mockup_id = mockup._id;
        }, log);

        layerService.save(layers);
        $event.stopPropagation();

      };

      $scope.loadMockup = function(mockup) {
        console.log("mockup to load", mockup);
        console.log("mockup to load id", mockup._id);

        $scope.file.name =  mockup.name;
        $scope.file.canvas.width = mockup.canvas.width;
        $scope.file.canvas.height = mockup.canvas.height;
      //  $scope.form.font = $filter('filter')($scope.units, {$: mockup.canvas.unit.id}, false)[0];
        var layersPromise = layerService.getAllByMockupId(mockup._id);
        layersPromise.$q.then(function(layers){
          angular.forEach(layers, function(layer, key){
            $scope.layerService.add(layer);
          });
        });
       // contextService.file.layers = layers;
        $event.stopPropagation();

      }
  }]);
