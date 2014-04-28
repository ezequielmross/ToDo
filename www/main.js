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
                var startX, endX;
                
                elm.bind('touchstart', function (e) {
                    //ponto de partida
                    startX = e.changedTouches[0].clientX;
                    //atualizando seu tipo de posição
                    elm[0].style.position = "relative";
                    
                });
                
                elm.bind('touchmove', function (e) {
                    //partida atual - inicial
                    endX = e.changedTouches[0].clientX - startX;
                    //aplicando o estilo left
                    elm[0].style.left = endX + "px";
                    
                });
                
                elm.bind('touchend', function (e) {
                    //se o ponto de partida final - o inicial for maior que metade da tela (andou para direita)
                    if ((e.changedTouches[0].clientX - startX) > (elm[0].clientWidth / 2)) {
                        scope.$apply(att.right);
                    //se o ponto de partida inicial - o final for maior que metade da tela (andou para esquerda)    
                    } else if ((startX - e.changedTouches[0].clientX) > (elm[0].clientWidth / 2)) {
                        scope.$apply(att.left);
                    }
                    elm[0].style.left = '';
                    
                });
            }
        };
    };
    
    //ngTask.$inject = [];
    
    angular.module("Todo").directive('ngTask', ngTask);
}());