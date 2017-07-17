angular.module('storeApp', ['storeApp.controllers', 'storeApp.factories', 'storeApp.services', 'ngRoute', 'ngResource'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'views/welcome.html',
            controller: 'WelcomeController'
        })
        .when('/apparel', {
            templateUrl: 'views/apparel.html',
            controller: 'ApparelController'
        })
        .when('/misc', {
            templateUrl: 'views/misc.html',
            controller: 'MiscController'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactController'
        })
        .when('/checkout', {
            templateUrl: 'views/checkout.html',
            controller: 'CheckoutController',
        })
        .when('/:id', {
            templateUrl: 'views/single_page.html',
            controller: 'ProductController'
        })
        .otherwise({
            redirectTo: '/'
        });
        
}]);