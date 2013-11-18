angular.module('mockupApp')
.service('contextService', ['$http', function() {
	this.file = { //file usually charged
		layers: [],
		canvas: {
			width: undefined,
			height: undefined,
			unit: undefined
		},
		selected: {
			tool: undefined, //tool usually used
			layer: undefined //layer usually used
		}
	},

	this.getSelectedTool = function(){
		return this.file.selected.tool;
	},

	this.getSelectedLayer = function(){
		return this.file.selected.layer;
	},

	this.setSelectedLayer = function(layer){
		this.file.selected.layer = layer;
	},

	this.setSelectedTool = function(tool){
		this.file.selected.tool = tool;
	},

	this.getSelected = function(){
		return this.file.selected;
	},

	this.getCanvas = function(){
		return this.file.canvas;
	}
}]);