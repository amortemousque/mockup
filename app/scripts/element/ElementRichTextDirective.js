mockupApp
  .directive('elementRtext', ["context", "layerService", function(context, layerService) {
      return {
        restrict: 'AE',
        transclude: true,
       // scope: false,
        replace: true,
        require: 'ngModel',
        controller: function($scope, $element) {

          var svg = Snap("#svg");
          var g = svg.select("#svg g:last-child > g");
          $scope.context = context;
          $scope.layerService = layerService;
          



          var text = Snap.parse('<g><foreignObject><textarea class="form-control tinyMce">qsdqssd</textarea></foreignObject></g>');
          $scope.group = g.append(text);
          $scope.elem = $element.find("g")
          // var helper = new ElementHelper();
          // helper.init($scope, $scope.layer);
          
          $scope.foreignObject = $element.find("foreignObject");

          $scope.layer.properties.width = 350;
          $scope.layer.properties.height = 200;
          $scope.foreignObject.attr("width", $scope.layer.properties.width);
          $scope.foreignObject.attr("height", $scope.layer.properties.height);

          $scope.group.drag();
          $scope.group.transform("t"+$scope.layer.position.left +"," +$scope.layer.position.top );

          $scope.text = $(svg.select("textarea"));

          $element.find("textarea").tinymce({
            // Location of TinyMCE script
            script_url : '/bower_components/jquery.tinymce/jscripts/tiny_mce/tiny_mce.js',

            // General options
            theme : "advanced",
            plugins : "autolink,lists,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist",

          });          




          $scope.text.change(function(){
            $scope.layer.text = $(this).val();
          });

        }
       // templateUrl : '/views/element/elementText.html'
      }
  }]);