angular.module('storeApp.factories', [])
.factory('Product', ['$resource', function($resource) {
    return $resource('/api/product/:id', {id: '@id'}, {
    });
}])
.factory('Apparel', ['$resource', function($resource) {
    return $resource('/api/apparel/:id', {id: '@id'}, {
    });
}])
.factory('Misc', ['$resource', function($resource) {
    return $resource('/api/misc/:id', {id: '@id'}, {
    });
}])
.factory('Category', ['$resource', function($resource) {
    return $resource('/api/categories/:id');
}])
.factory('Email', ['$resource', function($resource) {
    return $resource('/api/contact/:id');
}]);
