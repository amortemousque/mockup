'use strict';

mockupApp
  .controller('FileCtrl', ['$scope', '$modal', 'commonService', 'contextService', function ($scope, $modal, commonService, contextService) {
  		$scope.units = commonService.getUnits();
  		$scope.file = {
  			canvas : {
  				width: 100,
  				height: 100,
  				unit: $scope.units[0]
  			}
  		};

      $scope.exportFile = function(){
        var data = {a:1, b:2, c:3};
        var json = JSON.stringify(data);
        var blob = new Blob([json], {type: "application/json"});
        var url  = URL.createObjectURL(blob);

        $('#export-a').attr("href", url);
        // .attr("download", "backup.json").attr("textContent", "Download backup.json");
        // a.download    = "backup.json";
        // a.href        = url;
        // a.textContent = "Download backup.json";
        //console.log(a);
        //console.log(document.getElementById('export'));
        //document.getElementById('export').appendChild(a);
      };

  		$scope.newFile = function(modal){
  			console.log("modal", modal);
			  contextService.file.layers = [];
	  		contextService.file.canvas.width = $scope.file.canvas.width;
	  		contextService.file.canvas.height = $scope.file.canvas.height;
	  		contextService.file.canvas.unit = $scope.file.canvas.unit;
  		};
  }]);
