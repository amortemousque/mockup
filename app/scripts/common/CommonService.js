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
	
	this.properties = {
		color: "#fff",
		textShadow: "",
		fontSize: 14,
		fontFamily: "Helvetica Neue",
		borderStyle: "none", 
		textAlign: "",
		lineHeight: 1,
		verticalAlign: "",
		textDecoration: "",
		webkitTransform: "",
		width: "",
		height: "",
		outlineStyle: ""
	 }

	this.getUnits = function(){
		return this.units;
	}

	this.getFonts = function(){
		return this.fonts;
	}

	this.getStrokes = function(){
		return this.strokes;
	}

	this.getProperties = function(){
		return this.properties;
	}

	this.setProperties = function(properties){
		this.properties = properties;
	}

	this.mapProperties = function(source, target){
		console.log("mappProperties");
		target.color = source.color;
		target.textShadow = source.textShadow;
		target.fontSize = source.fontSize;
		target.fontFamily = source.fontFamily;
		target.borderStyle = source.borderStyle;
		target.textAlign = source.textAlign;
		target.lineHeight = source.lineHeight;
		target.verticalAlign = source.verticalAlign;
		target.textDecoration = source.textDecoration;
		target.webkitTransform = source.webkitTransform;
		target.width = source.width;
		target.height = source.height;
		target.outlineStyle =  source.outlineStyle;

		if(source.background != undefined) {
			target.background = source.background;
		}
	}
}]);