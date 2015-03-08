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
            var text = Snap.parse('<g><foreignObject width="100%" height="100%"><p class="tinyMce"></p></foreignObject></g>');
            $scope.group = g.append(text);
            $scope.elem = $element.find("g")
            $scope.foreignObject = $element.find("foreignObject");
          }

          function onMove(dx, dy, x, y, ev) {
            // var x = parseFloat($scope.foreignObject.attr("x"));
            // var y = parseFloat($scope.foreignObject.attr("y"));
            // $scope.foreignObject.attr("x", x - x);
            // $scope.foreignObject.attr("y", y - y);
            ev.stopPropagation();
          }

          function onChangeContent(e) {
            $scope.context.layer.text = tinymce.activeEditor.getContent();
            $scope.$apply();
          }

          function onQuitWysiwyg(e) {
            if($element.find("p").tinymce() != undefined) {
              $element.find("p").tinymce().remove();
            }
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

          function initWysiwig(){
            $element.find("p").tinymce({
              plugins : "pagebreak,table,save,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,template",
              toolbar: "false",
              menubar:"false",
              resize: "both",
              height:$scope.layer.size.height,
              width:$scope.layer.size.width,
              setup : function(ed) {         
                ed.on("blur", onChangeContent)
                ed.on("PostRender", onPostRender);
                $(".mce-tinymce").draggable();
              }
            }); 
          } 

          createElement();
          $scope.group.drag(onMove);
          $("#canvas").click(onQuitWysiwyg);
          $element.find("p").dblclick(initWysiwig);
          initWysiwig();


        }
      }
  }]);