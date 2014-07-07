'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('myApp', [ 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider    
        .when('/', 
            {
            controller: 'myTasksCtrl',
            templateUrl: 'partials/myTasks.html'
            })
        .when('/todo',
        {
            controller: 'myTasksCtrl',
            templateUrl: 'partials/myTasks.html'
        })
        .when('/indTodo',
        {
            controller: 'myIndTasksCtrl',
            templateUrl: 'partials/myIndTasks.html'
        })
        .when('/about',
        {            
            templateUrl: 'partials/myAbout.html'
        })
        .otherwise({redirectTo: '/'});
}]);



