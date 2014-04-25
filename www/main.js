/*global angular*/

(function Todo() {
    'use strict';
    
    angular.module('Todo', ['ngRoute']);
    
    angular.module('Todo').config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when("/home", { templateUrl: "home.html", controller: "HomeController as Home"});
        $routeProvider.otherwise({ redirectTo: "/home" });
        
    }]);
}());
/*global angular, alert*/
(function HomeController() {
    'use strict';
    
    var Home = function () {
        this.tasks = [
            {
                name: "Aniversario ",
                icon: {
                    name: "fa fa-thumb-tack",
                    style: {
                        color: "red"
                    }
                }
            },
            {
                name: "Task2",
                icon: {
                    name: "fa fa-heart",
                    style: {
                        color: "green"
                    }
                }
            }
        ];//fim tasks
    };
    
    Home.prototype.setHello = function () {
        this.hello = false;
    };
    
    
    angular.module("Todo").controller('HomeController', Home);
    
}());
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
                    elm[0].style.left = e.changedTouches[0].clientX + "px";
                });
                
                elm.bind('touchend', function (e) {
                    endX = e.changedTouches[0].clientX;
                    //elm[0].style.left = "";
                    // elm[0].style.right = "";
                    
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