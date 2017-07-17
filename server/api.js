var express = require('express');
var apparel = require('./controllers/apparel.ctrl');
var misc = require('./controllers/misc.ctrl');
var categories = require('./controllers/categories.ctrl');

var router = express.Router();

router.use('/apparel', apparel);
router.use('/misc', misc);
router.use('/categories', categories);

module.exports = router;