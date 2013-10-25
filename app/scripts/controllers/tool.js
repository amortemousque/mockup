'use strict';

angular.module('mockupApp')
  .controller('ToolCtrl', function ($scope) {
    $scope.tools = [
      {name:'move', img:'arrow-up'},
      {name:'shape', img:'unchecked',},
      {name:'move', img:'move'},
      {name:'text-width', img:'text-width'},
      {name:'camera', img:'camera'}
    ];
  });
