angular.module('mockupApp')
.service('toolService', ['context', function() {

	this.tools = [
	      {type: 'move', name:'move', img:'arrow-up', propertiesTemplate : "", status: "", isActive: false},
	      {type: 'shape', name:'shape', img:'square-o', propertiesTemplate: "views/properties/propertiesShape.html", status: "", isActive: false},
	      {type: 'resize', name:'resize', img:'arrows', propertiesTemplate: "views/properties/propertiesResize.html",  status: "", isActive: false},
	      {type: 'text', name:'text', img:'text-width', propertiesTemplate : "views/properties/propertiesText.html", status: "", isActive: false},
	      {type: 'image', name:'image', img:'picture-o', propertiesTemplate : "views/properties/propertiesImage.html", status: "", isActive: false}
	    ],


	this.getAll = function() {
	    return this.tools;
	},

	this.getAllFont = function() {
	    return this.fonts;
	},

    this.getPropertiesTemplate = function(){
    	return this.template;
    }
}]);