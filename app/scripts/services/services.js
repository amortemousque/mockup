angular.module('mockupApp')
.service('layerService', ['$http', function() {

	this.layers = [],
	this.activeLayer = {},
	this.properties = {
	    "color": "#fff",
	    "text-shadow": "",
	    "font-size": "",
	    "font-familly": "",
	    "text-align": "",
	    "line-height": "",
	    "vertical-align": "",
	    "text-decoration": "",
	    "webkit-transform": ""
	  },


	this.getAll = function($resource) {
        return this.layers;
    },

    this.getActive = function() {
    	return this.activeLayer;
	},

  	this.getProperties = function() {
    	return this.properties;
	},

  	this.add = function($layer) {
  		var id = 1;
  		console.log(this.layers);
  		if (this.layers.length != 0){
  			id = this.layers[this.layers.length - 1].id;
  		} 
  		$layer.id = id+1;
  		this.setActive($layer);
  		this.layers.push($layer);
  	},

  	this.setActive = function(layer) {
  		for(var i = 0; i < this.layers.length; i++) {
			this.layers[i].isActive = false;
		}				
		this.layers.isActive = true;
		this.activeLayer = layer;
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
	      {type: 'move', name:'move', img:'arrow-up', propertiesTemplate : "", status: "", isActive: false},
	      {type: 'shape', name:'shape', img:'unchecked', propertiesTemplate: "views/tool/propertiesShape.html", status: "", isActive: false},
	      {type: 'resize', name:'resize', img:'fullscreen', propertiesTemplate: "views/tool/propertiesResize.html",  status: "", isActive: false},
	      {type: 'text', name:'text', img:'text-width', propertiesTemplate : "views/tool/propertiesText.html", status: "", isActive: false},
	      {type: 'image', name:'image', img:'camera', propertiesTemplate : "views/tool/propertiesImage.html", status: "", isActive: false}
	    ],
	this.template = {url : "views/tool/propertiesText.html"}

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

    this.setPropertiesTemplate = function(template) {
        this.template.url = template;
    }

    this.getPropertiesTemplate = function(){
    	return this.template;
    }
}]);