angular.module('mockupApp')
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

	this.getAllFont = function() {
	    return this.fonts;
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