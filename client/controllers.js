angular.module('storeApp.controllers', [])
.controller('WelcomeController', ['$scope', 'SEOService', '$location', function($scope, SEOService, $location) {
    SEOService.setSEO({
        title: 'Covalence Store',
        url: $location.url(),
        description: 'Welcome to the Covalence Store'
    })

}])
.controller('NavController', ['$scope', '$location', function($scope, $location) {
    if(localStorage.items === undefined) 
        localStorage.items = angular.toJson([]);
    $scope.cartTotal = angular.fromJson(localStorage.items).length;

    //look up rootscope.prodcast to refresh badge counter
    //create service for navbar if dont want to use above
}])
.controller('ApparelController', ['$scope', 'Apparel', 'SEOService', '$location', function($scope, Apparel, SEOService, $location) {
    $scope.apparels = Apparel.query();

    SEOService.setSEO({
        title: 'Apparel Page',
        url: $location.url(),
        description: 'Covalence Store - Apparel'
    })
}])
.controller('MiscController', ['$scope', 'Misc', 'SEOService', '$location', function($scope, Misc, SEOService, $location) {
    $scope.miscs = Misc.query();

    SEOService.setSEO({
        title: 'Covalence Store - Misc',
        url: $location.url(),
        description: 'Covalence Misc'
    })
}])
.controller('ProductController', ['$scope', 'Product', 'SEOService', '$location', '$routeParams', function($scope, Product, SEOService, $location, $routeParams) {
    $scope.product = Product.get({id: $routeParams.id});

    if(localStorage.items === undefined) 
        localStorage.items = JSON.stringify([]);

    $scope.addItem = function() {
        alert('Item added to Cart!');
        let cachedItems = JSON.parse(localStorage.items);// "[[title, description, image, price],[title, description, image, price]]"
        cachedItems.push($scope.product);// [[title, description, image, price],[title, description, image, price], ...]
        localStorage.items = JSON.stringify(cachedItems);// "[[title, description, image, price],[title, description, image, price], ...] "
        //localStorage.setItem('product', JSON.stringfy($scope.product)); <-previous way
    }

    SEOService.setSEO({
            title: $scope.product.title,
            url: $location.url(),
            description: 'Covalence Store'
    });

}])
.controller('ContactController', ['$scope', 'SEOService', 'Email', '$location', function($scope, SEOService, Email, $location) {
     $scope.contact = function() {
        var e = new Email ({
            name: $scope.name,
            email: $scope.email,
            message: $scope.message
        });
        e.$save(function(success) {
            window.history.back();
        });
    }

    SEOService.setSEO({
            title: 'Contact Us',
            url: $location.url(),
            description: 'Contact the Covalence Store'
    });
}])
.controller('CheckoutController', ['$scope', '$location', 'Checkout', 'SEOService', function($scope, $location, Checkout, SEOService) {
    //stripe global variable created in index.html

    if(localStorage.items === undefined) 
        localStorage.items = angular.toJson([]);

    $scope.cart = angular.fromJson(localStorage.items);  

    let total = 0;
    for (let i = 0; i < $scope.cart.length; i++) {
        total += $scope.cart[i].price;
    }
    $scope.total = total

    $scope.removeItem = function(product) {
        let index = $scope.cart.indexOf(product)
        
        if (index > -1) {
            $scope.cart.splice(index, 1);
        }

        localStorage.items = angular.toJson($scope.cart);
        $scope.total -= product.price;
    }

    let discountCode10 = 'ThunderCats';
    let discountCode20 = 'Garlic.io';
    let discountsToBeApplied = 1;

    $scope.applyDiscount = function() {
        if($scope.discountValue === discountCode10 && discountsToBeApplied >= 1) {
            $scope.total *= .9;
            discountsToBeApplied = 0;
        }

        if($scope.discountValue === discountCode20 && discountsToBeApplied >= 1) {
            $scope.total *= .8;
            discountsToBeApplied = 0;
        }
    }

    var elements = stripe.elements();
    var card = elements.create('card');
    card.mount('#card-field');

    //sets length to 0 so that .length === 0, and will not show until an error is created
    $scope.errorMessage = '';

    $scope.processCheckout = function() {
        stripe.createToken(card, {
            name: $scope.name,
            address_line1: $scope.line1,
            address_line2: $scope.line2,
            address_city: $scope.city,
            address_state: $scope.state,
            address_zip: $scope.zip,
            address_country: $scope.country
        }).then(function(result) {
            if (result.error) {
                $scope.errorMessage = result.error.message;
            } else {
                //result.token is the card token
                var d = new Checkout({
                    token: result.token.id,
                    amount: $scope.amount
                });
                d.$save(function() {
                    alert('Thank you for your purchase!');
                    $location.path('/apparel');
                }, function(err) {
                    console.log(err);
                });
            }
        });
    }


    SEOService.setSEO({
        title: 'Covalence Store - Checkout',
        url: $location.url(),
        description: 'Checkout from the Covalence Store!'
    })
}]);