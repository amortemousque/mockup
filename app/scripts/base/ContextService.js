angular.module('mockupApp')
.service('contextService', ['$http', function() {
	this.context = {
		tool: undefined, //tool usually used
		layer: undefined //layer usually used
	},

	this.getTool = function(){
		return this.context.tool;
	},

	this.getLayer = function(){
		return this.context.layer;
	},

	this.setLayer = function(layer){
		this.context.layer = layer;
	},

	this.setTool = function(tool){
		this.context.tool = tool;
	},

	this.getContext = function(){
		return this.context;
	}
}]);