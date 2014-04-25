/*global angular, console*/
(function taskDirective() {
    'use strict';
    
    var ngTask = function () {
        return {
            restrict: 'A',
            scope: {
                ngTask: '='
            },
            template: '<i ng-class="ngTask.icon.name" ng-style="ngTask.icon.style"></i><span class="task" ng-bind="ngTask.name"></span>',
            link: function (scope, elm, att) {
                var startX, endX, i = 0;
                elm.bind('touchstart', function (e) {
                    startX = e.changedTouches[0].clientX;
                    elm[0].style.position = "relative";
                });
                
                elm.bind('touchmove', function (e) {
                    
                    
                    
                    i = (e.changedTouches[0].clientX < endX) ? i - 1 : i + 1;
                    
                    endX = e.changedTouches[0].clientX;
                    
                    elm[0].style.left = i + "px";
                });
                
                elm.bind('touchend', function (e) {
                    endX = e.changedTouches[0].clientX;
                    //elm[0].style.left = "";
                    // elm[0].style.right = "";
                    console.log(e.changedTouches[0]);
                    console.log(elm[0].style.left);
                    console.log(elm[0].style.right);
                    console.log(elm[0].style.position);
                    console.log(endX);
                });
            }
        };
    };
    
    //ngTask.$inject = [];
    
    angular.module("Todo").directive('ngTask', ngTask);
}());