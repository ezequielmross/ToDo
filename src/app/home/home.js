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