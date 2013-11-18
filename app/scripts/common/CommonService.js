angular.module('mockupApp')
.service('commonService', ['$http', function() {
	this.units = [
		{id:"px", type:"px", name: "Pixels"},
		{id:"cm", type:"cm", name: "Centimeters"}
	],


	this.fonts = [
		{css: "Arial", name : "Arial"}, 
		{css: "Arial Black", name : "Arial Black"}, 
		{css: "Helvetica", name : "Helvetica"}, 
		{css: "sans-serif", name : "sans-serif"}, 
		{css: "Comic Sans MS", name : "Comic Sans MS"},
	    {css: "Courier New",name : "Courier New"}, 
	    {css: "Georgia",name : "Georgia"}, 
	    {css: "Impact",name : "Impact"}, 
	    {css: "Lucida Console",name : "Lucida Console"}, 
	    {css: "Palatino Linotype",name : "Palatino Linotype"},
	    {css: "Tahoma",name : "Tahoma"}, 
	    {css: "Times New Roman",name : "Times New Roman"}, 
	    {css: "Trebuchet MS",name : "Trebuchet MS"}, 
	    {css: "Verdana",name : "Verdana"}, 
	    {css: "Geneva",name : "Geneva"},
	    {css: "MS Sans Serif",name : "MS Sans Serif"},
	    {css: "Helvetica Neue", name: "Helvetica Neue"}
    ],

    this.strokes = [
	      {name:'none', css:'none', img : "", status: ""},
	      {name:'dotted', css:'dotted', img: "", status: ""},
	      {name:'dashed', css:'dashed', img: "",  status: ""},
	      {name:'solid', css:'solid', img : "", status: ""},
	      {name:'double', css:'double', img : "", status: ""},
	      {name:'groove', css:'groove', img : "", status: ""},
	      {name:'ridge', css:'ridge', img : "", status: ""},
	      {name:'inset', css:'inset', img : "", status: ""},
	      {name:'outset', css:'outset', img : "", status: ""}
	    ],

	this.getUnits = function(){
		return this.units;
	}

	this.getFonts = function(){
		return this.fonts;
	}

	this.getStrokes = function(){
		return this.strokes;
	}
}]);