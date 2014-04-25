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