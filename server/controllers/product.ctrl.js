var express = require('express');
var procedures = require('../procedures/product.proc');

var router = express.Router();

//display single page product
router.route('/:id')
    .get(function(req,res) {
        procedures.read(req.params.id)
    .then(function(product) {
        res.send(product);
    }).catch(function(err) {
        console.log(err);
        res.sendStatus(500);
        });
    });


module.exports = router;