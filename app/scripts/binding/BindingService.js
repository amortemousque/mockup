angular.module('mockupApp')
.service('bindingService', ['$resource', 'context', function($resource, context) {

  this.Bindings = $resource('http://localhost:port/bindings/:id', {port: ':3000'},
  {
      'update': { method:'PUT' },
      'save': {method: 'POST', isArray: true }
  });


  this.getAllByLayerId = function(layerId) {
    var layers = this.Bindings.query({id: layerId});
    return layers;
  },

  this.save = function(bindings) {
    console.log("save bindings", bindings);
    var bindings = this.Bindings.save(bindings); 
    return bindings;
  }

}])