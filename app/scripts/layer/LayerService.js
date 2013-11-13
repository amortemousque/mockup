angular.module('mockupApp')
.service('layerService', ['$http', function() {

	this.layers = [],
	this.context = {layer: {}},

	this.getAll = function($resource) {
        return this.layers;
    },

    this.getActive = function() {
    	return this.context.layer;
	  },

  	this.add = function($layer) {
  		var id = 1;
  		console.log(this.layers);
  		if (this.layers.length != 0){
  			id = this.layers[this.layers.length - 1].id;
  		} 
  		$layer.id = id+1;
  		this.layers.push($layer);
  	},

  	this.setActive = function(layer) {
      console.log("setActive");
  		for(var i = 0; i < this.layers.length; i++) {
  			this.layers[i].active = "";
  		}				
  		layer.active = "active";
  		this.context.layer = layer;
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