var express = require('express');
var apparel = require('./controllers/apparel.ctrl');
var misc = require('./controllers/misc.ctrl');
var purchase = require('./controllers/purchase.ctrl');
var categories = require('./controllers/categories.ctrl');
var product = require('./controllers/product.ctrl');
var contact = require('./controllers/contact.ctrl');
var checkout = require('./controllers/checkout.ctrl');

var router = express.Router();

router.use('/apparel', apparel);
router.use('/misc', misc);
router.use('/purchase', purchase);
router.use('/product', product);
router.use('/categories', categories);
router.use('/contact', contact);
router.use('/checkout', checkout);

module.exports = router;