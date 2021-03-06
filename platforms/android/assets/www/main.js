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
                },
                status: true
            },
            {
                name: "Task2",
                icon: {
                    name: "fa fa-heart",
                    style: {
                        color: "red"
                    }
                },
                status: true
            }
        ];//fim tasks
    };
    
    Home.prototype.setHello = function () {
        this.hello = false;
    };
    
    Home.prototype.finalizado = function (task) {
        var i = this.tasks.indexOf(task);
        this.tasks[i].status = false;
    };
    
    Home.prototype.excluir = function (task) {
        var i = this.tasks.indexOf(task);
        this.tasks.splice(i, 1);
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
                var startX, endX, transform = ['webkitTransform', 'MozTransform', 'msTransform', 'oTransform', 'Transform'];              
                elm.bind('touchstart', function (e) {
                    //ponto de partida
                    startX = e.changedTouches[0].clientX;
                    console.log(elm[0].style);
                });
                
                elm.bind('touchmove', function (e) {
                    //partida atual - inicial = o quanto deve andar
                    endX = e.changedTouches[0].clientX - startX;
                    
                    for (var i = 0; i < transform.length; i = i + 1) {
                       elm[0].style[transform[i]] = 'translate3d(' + endX + 'px,0,0)';
                    }
                });
                
                elm.bind('touchend', function (e) {
                    //se o ponto de partida final - o inicial for maior que metade da tela (andou para direita)
                    if ((e.changedTouches[0].clientX - startX) > (elm[0].clientWidth / 2)) {
                        scope.$apply(att.right);
                        //se o ponto de partida inicial - o final for maior que metade da tela (andou para esquerda)    
                    } else if ((startX - e.changedTouches[0].clientX) > (elm[0].clientWidth / 2)) {
                        scope.$apply(att.left);
                    }
                    for (var i = 0; i < transform.length; i = i + 1) {
                       elm[0].style[transform[i]] = 'translate3d(0,0,0)';
                    }
                    
                });
            }
        };
    };
    
    //ngTask.$inject = [];
    
    angular.module("Todo").directive('ngTask', ngTask);
}());