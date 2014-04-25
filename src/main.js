/*global angular*/

(function Todo() {
    'use strict';
    
    angular.module('Todo', ['ngRoute']);
    
    angular.module('Todo').config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when("/home", { templateUrl: "home.html", controller: "HomeController"});
        $routeProvider.otherwise({ redirectTo: "/home" });
        
    }]);
}());
/*global angular*/
(function HomeController() {
    'use strict';
    
    var Home = function ($scope) {
        var hello = "Hello!";
    };
    Home.prototype.hello = function () {
        return this.hello;
    };
    
    Home.$inject = ['$scope'];
    
    angular.module("Todo").controller("HomeController", HomeController);
    
}());