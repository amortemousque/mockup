angular.module('mockupApp').
  directive('element', function() {
      return {
        restrict: 'E',
        transclude: false,
        scope: {},
        replace: false,
        controller: function($scope, $element) {
          $scope.mouseenterElem = function(){
            var elem = $(this);
              elem.find(".btn-remove").removeClass("hide");
              $("#field-style").val(elem.attr("style"));
          }

          $scope.mouseleaveElem = function(){
            $(this).find(".btn-remove").addClass("hide");
          } 

          $scope.clickElem = function() {
            $(".canvas .elem").removeClass("active");
            $(this).addClass("active");
          }

          $scope.getActiveTool = function(){
            return $(".list-tools .btn.active").data("tool");
          }

          $scope.getActiveElem = function(){
            return $(".canvas .elem.active");
          }

          $scope.getActiveLayer = function(){
            return $(".canvas .layer.active");
          }
            
          $scope.dblClickTextElem = function(){
            console.log("dblclickHandler",this);
              if($(this).find("textarea").length != 0){
              $(this).find("textarea").removeClass("hide");
            }
          }

          $scope.blurTextElem = function(){
            console.log("blurTextElem");
            var textArea = $($(this).find("textarea"))
            .addClass("hide");
            $(this).find(".elem-content").html(textArea.val());
          }

          $scope.clickRemoveElement = function(){
            $(this).parent().remove();
            return false;
          }
          
          $scope.keyupFieldStyle = function(){
            var elem = getActiveElem();
            elem.attr("style", $(this).val());
          }


          canvasPosition = $("#canvas").offset();
          var topPosition =  window.mouseY - canvasPosition.top;
          var leftPosition =  window.mouseX - canvasPosition.left;

          var startX = 0, startY = 0, x = 0, y = 0;
          var paramsDraggable = { containment: "#canvas", scroll: false };

          $element.css({
           position: 'absolute',
           top: topPosition,
           left: leftPosition,
           cursor: 'pointer',
           width: 40,
           height: 40,
           border: "solid 1px #fff"
           }).addClass("elem")
          .resizable()
          .draggable()
          .append("<div class='elem-content'>")
          .focusout(blurTextElem)
          .mouseenter(mouseenterElem)
          .mouseleave(mouseleaveElem)
          .click(clickElem);

          var btnRemove = 
                $("<button>").addClass("btn")
                .addClass("btn-remove")
                .click(clickRemoveElement)
                .append("<i class='glyphicon glyphicon-trash'></i>")
                .appendTo(elem);
        }
      }
    
  });