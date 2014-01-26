angular.module('mockupApp')
.service('fileService', ['$resource', function($resource) {

  this.Mockups = $resource('http://localhost:port/mockups/:id', {port: ':3000'},
  {
      'update': { method:'PUT' }
  });

  this.getAll = function() {
      var mockups = this.Mockups.query();
          console.log("getAll", mockups);

      return mockups;
  },

  this.get = function(idMockup) {
      var mockups = this.Mockups.get({id:idMockup});
      return mockups;
  },

  this.delete = function(idMockup) {
      var mockups = this.Mockups.delete({id:idMockup});
  },

  this.save = function(mockup) {
    console.log("save", mockup);
  	// if (mockup._id != undefined) {
  	// 	this.Mockup.update({ id:$id }, mockup);
  	// } else {
		var mockup = this.Mockups.save(mockup); 
    return mockup;

  	// } 
  }
}]);