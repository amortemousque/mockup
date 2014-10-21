function ElementHelper() {

  this.init = function($scope, model) {


    $scope.ft = Snap.freeTransform($scope.elem, $scope, {
      draw: ['bbox'],
      drag: ['center', 'self'],
     // keepRatio: ['bboxCorners'],
      rotate: ['axisX'],
      scale: ['bboxCorners', 'bboxSides'],
      distance: '1.6',
      snap: { rotate:0 },
      snapDist: { rotate:20 }

    }, cb);

    $scope.layer.ft = $scope.ft;
    this.translate($scope, model.position);
    this.watching($scope);
    this.click($scope);
    function cb(subject, ev){
      if($scope.layer.type == "rectangle" || $scope.layer.type == "image") {
        $scope.layer.size.width = subject.attrs.scale.x;
        $scope.layer.size.height = subject.attrs.scale.y;
      } else {
        $scope.layer.properties.rx = subject.attrs.scale.x;
        $scope.layer.properties.ry = subject.attrs.scale.y;
        $scope.layer.properties.width = subject.attrs.scale.x * 2;
        $scope.layer.properties.height = subject.attrs.scale.y * 2;
      }
    }

    $scope.$watch('layer.isActive', function(isActive){
      if(isActive == true) { 
        $scope.ft.showHandles();
      } else {
        $scope.ft.hideHandles();
      }
    });

  },

  this.translate = function($scope, position) {
    $scope.ft.attrs.translate = {x:position.left, y:position.top};
    $scope.ft.apply();
  },

  this.watching = function($scope) {
    var $scope = $scope;
    $scope.$watch('layer.properties', function(properties){
      for(var propertyName in properties) {
        $scope.elem.attr(propertyName, properties[propertyName]);
      }
    }, true);
  },

  this.click = function($scope) {
    var $scope = $scope;
    $scope.elem.click(function(e){
      $scope.context.layer = $scope.layer;
      $scope.layerService.setActive($scope.layer);
      $scope.$apply(); 
      e.stopPropagation();  
    });
  }
}
