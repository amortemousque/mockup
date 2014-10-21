angular.module('mockupApp')
.service('toolService', ['context', function() {

	this.tools = [
	      {type: 'move', name:'move', img:'arrow-up', propertiesTemplate : "", status: "", isActive: false},
	      {type: 'rectangle', name:'rectangle', img:'square-o', status: "", isActive: false},
  	      {type: 'ellipse', name:'ellipse', img:'square-o', status: "", isActive: false},
	      {type: 'text', name:'text', img:'text-width', status: "", isActive: false},
	      {type: 'richText', name:'richText', img:'text-width', status: "", isActive: false},
	      {type: 'image', name:'image', img:'picture-o', status: "", isActive: false}
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