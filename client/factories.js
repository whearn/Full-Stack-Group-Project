angular.module('storeApp.factories', [])
.factory('Post', ['$resource', function($resource) {
    return $resource('/api/products/:id', {id: '@id'}, {
    });
}]);