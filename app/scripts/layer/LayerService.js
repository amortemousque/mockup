angular.module('mockupApp')
.service('layerService', ['contextService', function(contextService) {

  this.layers = contextService.file.layers,

  this.getAll = function($resource) {
      return contextService.file.layers;
  },

  this.add = function(layer) {
  	var id = 1;
  	if (this.layers.length != 0){
  		id = this.layers[this.layers.length - 1].id;
  	} 
  	layer.id = id+1;
  	contextService.file.layers.push(layer);
  },

  this.remove = function(id) {
    console.log(id);
    var length = this.layers.length;
    for(var i = 0; i < length; i++) {
      if(this.layers[i].id == id) {
        this.layers.splice(i, 1);
      }
    }
  },
  
  this.setActive = function(layer) {
    angular.forEach(this.layers , function(layer, key){
      layer.isActive = false;
    });
    layer.isActive = true;
  }

}])