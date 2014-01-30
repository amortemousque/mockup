angular.module('mockupApp')
.service('layerService', ['$resource', 'contextService', function($resource, contextService) {

  this.Layers = $resource('http://localhost:port/layers/:id', {port: ':3000'},
  {
      'update': { method:'PUT' },
      'save': {method: 'POST', isArray: true }
  });

  this.MockupLayers = $resource('http://localhost:port/mockupLayers/:id', {port: ':3000'},
  {
      'update': { method:'PUT' },
  });

  this.layers = contextService.file.layers,

  this.getAll = function($resource) {
      return contextService.file.layers;
  },

  this.add = function(layer) {
  	contextService.file.layers.push(layer);
  },

  this.remove = function(layer) {
    this.layers.splice(this.layers.indexOf(layer), 1);
  },
  
  this.setActive = function(layer) {
    angular.forEach(this.layers , function(layer, key){
      layer.isActive = false;
    });
    layer.isActive = true;
  }

  this.getAllByMockupId = function(mockupId) {
    var layers = this.MockupLayers.query({id: mockupId});
    return layers;
  },

  this.save = function(layers) {
    console.log("save layers", layers);
    var layers = this.Layers.save(layers); 
    return layers;
  }

}])