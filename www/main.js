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
                        color: "blue"
                    }
                }
            },
            {
                name: "Task2",
                icon: {
                    name: "fa fa-heart",
                    style: {
                        color: "red"
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
/*global angular, console, alert*/
(function taskDirective() {
    'use strict';
    
    var ngTask = function () {
        return {
            restrict: 'A',
            link: function (scope, elm, att) {
                var startX, endX;
                
                elm.bind('touchstart', function (e) {
                    
                    startX = e.changedTouches[0].clientX;
                    elm[0].style.position = "relative";
                    
                });
                
                elm.bind('touchmove', function (e) {
                    
                    endX = e.changedTouches[0].clientX - startX;
                    
                    elm[0].style.left = endX + "px";
                });
                
                elm.bind('touchend', function (e) {
                    if ((e.changedTouches[0].clientX - startX) > (elm[0].clientWidth / 2)) {
                        alert("Finalizado!");
                    } else if ((startX - e.changedTouches[0].clientX) > (elm[0].clientWidth / 2)) {
                        alert("Excluido!");
                    }
                    elm[0].style.left = '';
                });
            }
        };
    };
    
    //ngTask.$inject = [];
    
    angular.module("Todo").directive('ngTask', ngTask);
}());