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
          



          var text = Snap.parse('<g><foreignObject><textarea class="form-control tinyMce"></textarea></foreignObject></g>');
          $scope.group = g.append(text);
          $scope.elem = $element.find("g")

        //  var helper = new ElementHelper();
        //  helper.init($scope, $scope.layer);
          
          $scope.foreignObject = $element.find("foreignObject");

         // $scope.layer.properties.width = 350;
         // $scope.layer.properties.height = 200;
          $scope.foreignObject.attr("width", $scope.layer.size.width);
          $scope.foreignObject.attr("height", $scope.layer.size.height);
          $scope.foreignObject.attr("x", $scope.layer.position.top);
          $scope.foreignObject.attr("y", $scope.layer.position.left);

          $scope.group.drag(function(dx, dy, x, y, ev){
            console.log(x); 
                        console.log(dx); 
            var x = parseFloat($scope.foreignObject.attr("x"));
            var y = parseFloat($scope.foreignObject.attr("y"));
            $scope.foreignObject.attr("x", x - x);
            $scope.foreignObject.attr("y", y - y);
            //$(ev.target).attr("x", x);
            ev.stopPropagation();
          });
         // $scope.group.transform("t"+$scope.layer.position.left +"," +$scope.layer.position.top );

          $scope.text = $(svg.select("textarea"));

          $element.find("textarea").tinymce({
            script_url : '/bower_components/jquery.tinymce/jscripts/tiny_mce/tiny_mce.js',
            // General options
            
            theme : "advanced",
            plugins : "pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
            toolbar: "false",
            menubar:"false",
            setup : function(ed) {
              ed.onPostRender.add(function(ed) {
                var propertiesPanel = $(".panels-bar #properties"); 
              //  $('.mceMenubar').hide(); 
              //  $('.mceToolbar').hide(); 

                $(propertiesPanel.find("#justifyright")).click(function () {
                   tinymce.execCommand('justifyright', true);
                });
                $(propertiesPanel.find("#justifyleft")).click(function () {
                   tinymce.execCommand('justifyleft', true);
                });
                $(propertiesPanel.find("#justifycenter")).click(function () {
                   tinymce.execCommand('justifycenter', true);
                });
                $(propertiesPanel.find("#justifyfull")).click(function () {
                   tinymce.execCommand('justifyfull', true);
                });



                $(propertiesPanel.find("#bold")).click(function () {
                   tinymce.execCommand('bold', true);
                });
                $(propertiesPanel.find("#italic")).click(function () {
                   tinymce.execCommand('italic', true);
                });
                $(propertiesPanel.find("#underline")).click(function () {
                   tinymce.execCommand('underline', true);
                });
                $(propertiesPanel.find("#strikethrough")).click(function () {
                   tinymce.execCommand('strikethrough', true);
                });


                $(propertiesPanel.find("#forecolor")).change(function () {
                   tinymce.execCommand('forecolor', false, $(this).val());
                });

                $(propertiesPanel.find("#fontsize")).change(function () {
                  console.log("fontsize", $(this).val());
                   tinymce.execCommand('fontsize', false, $(this).val());
                });

                $(propertiesPanel.find("#fontname")).change(function () {
                  console.log("fontname", $(this).val());
                   tinymce.execCommand('fontname', false, $(this).val());
                });
                

                $(propertiesPanel.find("#bullist")).click(function () {
                  console.log("bullist", $(this).val());
                   tinymce.execCommand('InsertUnorderedList', true);
                });

                $(propertiesPanel.find("#numlist")).click(function () {
                  console.log("numlist", $(this).val());
                   tinymce.execCommand('InsertOrderedList', true);
                });

                $(propertiesPanel.find("#code")).click(function () {
                  console.log("code", $(this).val());
                   tinymce.execCommand('mceCodeEditor', true);
                });
                
              });
            }
          });          




          $scope.text.change(function(){
            $scope.layer.text = $(this).val();
          });

        }
       // templateUrl : '/views/element/elementText.html'
      }
  }]);