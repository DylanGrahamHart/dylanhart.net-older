// Define angular app
app = angular.module('dylanHart', ['ngRoute']);


/**
 * Routes
 */
app.config(function($routeProvider, $locationProvider){

    $locationProvider.html5Mode({
    	enabled: true,
    });

    $routeProvider

        // Home
        .when('/', {
            templateUrl: '/app/html/pages/portfolio.html',
            controller: 'portfolioCtrl'
        })

        // Grades
        .when('/grades', {
            templateUrl: '/app/html/pages/grades.html',
            controller: 'gradesCtrl'
        })

        // For Fun
        .when('/for-fun', {
            templateUrl: '/app/html/pages/for-fun.html',
            controller: 'forfunCtrl'
        })

        // For Fun
        .when('/side-projects', {
            templateUrl: '/app/html/pages/side-projects.html',
            controller: 'sideProjectsCtrl'
        })

});