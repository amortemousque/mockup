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
          $scope.text = $(svg.select("textarea"));

          function createElement() {
            var text = Snap.parse('<g><foreignObject><p class="tinyMce"></p></foreignObject></g>');
            $scope.group = g.append(text);
            $scope.elem = $element.find("g")
            $scope.foreignObject = $element.find("foreignObject");
          }

          function setSize(size) {
            $scope.foreignObject.attr("width", $scope.layer.size.width);
            $scope.foreignObject.attr("height", $scope.layer.size.height);
          }

          function setPosition(position) {
            $scope.foreignObject.attr("x", $scope.layer.position.top);
            $scope.foreignObject.attr("y", $scope.layer.position.left);          
          }

          function onMove(dx, dy, x, y, ev) {
            var x = parseFloat($scope.foreignObject.attr("x"));
            var y = parseFloat($scope.foreignObject.attr("y"));
            $scope.foreignObject.attr("x", x - x);
            $scope.foreignObject.attr("y", y - y);
            //$(ev.target).attr("x", x);
            ev.stopPropagation();
          }

          function onChangeContent(ed, l) {
            $scope.context.layer.text = l.content;
            $scope.$apply();
          }

          function onPostRender(ed) {
            var propertiesPanel = $(".panels-bar #properties"); 
            $('.mceMenubar').hide(); 
            $('.mceToolbar').hide(); 

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

          }
          createElement();
          setSize($scope.layer.size);
          setPosition($scope.layer.position);
          $scope.group.drag(onMove);

          $element.find("p").tinymce({
            script_url : '/bower_components/jquery.tinymce/jscripts/tiny_mce/tiny_mce.js',            
            theme : "advanced",
            plugins : "pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
            toolbar: "false",
            menubar:"false",
            setup : function(ed) {         
              ed.onChange.add(onChangeContent);
              ed.onPostRender.add(onPostRender);
            }
          }); 

         $scope.$watch('context.tool', function(tool){
            $element.find("p").tinymce().remove();
          });

        }
      }
  }]);