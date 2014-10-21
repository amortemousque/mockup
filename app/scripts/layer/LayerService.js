angular.module('mockupApp')
.service('layerService', ['$resource', '$http', 'context', function($resource, $http, context) {

  this.Layers = $resource('http://localhost:port/layers/:id', {port: ':3000'},
  {
      'update': { method:'PUT' },
      'save': {method: 'POST', isArray: true }
  });

  this.create = function(type) {
      return $http.get('model/'+ type +'.json');
  } 

  this.MockupLayers = $resource('http://localhost:port/mockupLayers/:id', {port: ':3000'},
  {
      'update': { method:'PUT' },
  });


  this.getAll = function($resource) {
      return context.layers;
  },

  this.add = function(layer) {
  	context.layers.push(layer);
  },

  this.remove = function(layer) {
    context.layers.splice(context.layers.indexOf(layer), 1);
  },
  
  this.setActive = function(layer) {
    angular.forEach(context.layers , function(layer, key){
      layer.isActive = false;
    });
    layer.isActive = true;
  }

  this.getAllByMockupId = function(mockupId) {
    var layers = this.MockupLayers.query({id: mockupId});
    return layers;
  },

  this.removeByMockupId = function(mockupId) {
    var result = this.MockupLayers.remove({id: mockupId});
    return result;
  },

  this.save = function(layers) {
    console.log("save layers", layers);
    var layers = this.Layers.save(layers); 
    return layers;
  }

}])