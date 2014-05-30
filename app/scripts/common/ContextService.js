angular.module('mockupApp')
.service('context', ['$http', 'commonService', function($http, commonService) {
	this.mockup = { //mockup usually charged
		name: undefined,
		canvas: {
      width: commonService.formats[0].size.width,
      height: commonService.formats[0].size.height,
      unit: commonService.units[1]
    }
	},

  this.layers = [],


	//current tool selected
	this.tool = {}; 

	//current layer selected
	this.layer = {  
		  type: '', 
      isShow: true, 
      isActive: true,
      position: {
        top: 0,
        left: 0
      },
      properties: {
        color: "#fff",
        textShadow: "",
        borderStyle: 'none',
        fontSize: 14,
        fontFamily: "Helvetica Neue",
        textAlign: "",
        lineHeight: 1,
        verticalAlign: "",
        textDecoration: "",
        webkitTransform: "",
        webkitFilter: "",
        width: 100,
        height: 100
      },
      filters: {
         blur: 0,
         lighten: 0,
         brightness: 0,
         contrast: 0,
      },                  
      bindings: [],
      content: undefined
      }; 

}]);