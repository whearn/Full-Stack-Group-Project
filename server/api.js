var express = require('express');
var products = require('./controllers/products.ctrl');
var purchase = require('./controllers/purchase.ctrl');
var categories = require('./controllers/categories.ctrl');

var router = express.Router();

router.use('/products', products);
router.use('/purchase', purchase);
router.use('/categories', categories);

module.exports = router;