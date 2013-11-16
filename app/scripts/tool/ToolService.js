angular.module('mockupApp')
.service('toolService', ['contextService', function() {

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

    this.setPropertiesTemplate = function(template) {
        this.template.url = template;
    }

    this.getPropertiesTemplate = function(){
    	return this.template;
    }
}]);