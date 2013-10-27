angular.module('mockupApp')
.service('layerService', ['$http', function() {

	this.layers = [],

	this.getAll = function($resource) {
        return this.layers;
    },

    this.getActive = function() {
    	var active = undefined;
		angular.forEach(this.layers, function(value, key){
			if (value.isActive){
				active = value;
			}
		});
		return active;   
	},
  	
  	this.add = function($layer) {
  		var id = 1;
  		console.log(this.layers);
  		if (this.layers.length != 0){
  			id = this.layers[this.layers.length - 1].id;
  		} 
  		$layer.id = id+1;
  		this.setActive($layer.id);
  		this.layers.push($layer);
  	},

  	this.setActive = function(id) {
        angular.forEach(this.layers, function(value, key){
			if(value.id == id) {
				value.isActive = true;
			} else {
				value.isActive = false;
			}
		});
    },

  	this.remove = function(id) {
  		console.log(id);
		for(var i = 0; i < this.layers.length; i++) {
			if(this.layers[i].id == id) {
				this.layers.splice(i, 1);
			}
		}
  	}
}])

.service('toolService', ['$http', function() {

	this.activeTool = undefined,
	this.tools = [
	      {type: 'move', name:'move', img:'arrow-up', status: "", isActive: false},
	      {type: 'shape', name:'shape', img:'unchecked', status: "", isActive: false},
	      {type: 'move', name:'move', img:'move', status: "", isActive: false},
	      {type: 'text', name:'text', img:'text-width', status: "", isActive: false},
	      {type: 'camera', name:'camera', img:'camera', status: "", isActive: false}
	    ];

	this.getAll = function() {
	    return this.tools;
	},

	this.getActive = function() {
		var active = undefined;
        angular.forEach(this.tools, function(value, key){
			if (value.isActive){
				active = value;
			}
		});
		return active;  
    },

  	this.setActive = function(name) {
        angular.forEach(this.tools, function(value, key){
			if(value.name == name) {
				value.isActive = true;
				value.status = "active";
			} else {
				value.isActive = false;
				value.status = "";
			}
		});
    }
}]);