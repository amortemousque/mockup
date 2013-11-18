angular.module('mockupApp')
.service('toolService', ['contextService', function() {

	this.tools = [
	      {type: 'move', name:'move', img:'arrow-up', propertiesTemplate : "", status: "", isActive: false},
	      {type: 'shape', name:'shape', img:'unchecked', propertiesTemplate: "views/properties/propertiesShape.html", status: "", isActive: false},
	      {type: 'resize', name:'resize', img:'fullscreen', propertiesTemplate: "views/properties/propertiesResize.html",  status: "", isActive: false},
	      {type: 'text', name:'text', img:'text-width', propertiesTemplate : "views/properties/propertiesText.html", status: "", isActive: false},
	      {type: 'image', name:'image', img:'camera', propertiesTemplate : "views/properties/propertiesImage.html", status: "", isActive: false}
	    ],

	
	this.template = {url : ""}

	this.getAll = function() {
	    return this.tools;
	},

	this.getAllFont = function() {
	    return this.fonts;
	},

    this.setPropertiesTemplate = function(template) {
        this.template.url = template;
    }

    this.getPropertiesTemplate = function(){
    	return this.template;
    }
}]);