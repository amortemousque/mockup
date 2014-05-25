angular.module('mockupApp')
.service('bindingService', ['$resource', 'context', function($resource, context) {

  this.Bindings = $resource('http://localhost:port/bindings/:id', {port: ':3000'},
  {
      'update': { method:'PUT' },
      'save': {method: 'POST', isArray: true }
  });

}])