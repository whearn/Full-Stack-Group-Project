var express = require('express');
var procedures = require('../procedures/purchase.proc');

var router = express.Router();

router.route('/')
//get all items in cart
    .get(function(req, res) {
        procedures.all()
        .then(function (products) {
            res.send(products);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
//post cart items to db
    .post(function(req, res) {
        //must match front end
        procedures.create(req.body.productid, req.body.purchaseid)
        .then(function(id) {
            res.status(201).send(id);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        })
    })
//delete item from cart
    .delete(function(req, res) {
        procedures.destroy(req.params.id)
    .then(function() {
        res.sendStatus(204);
    }).catch(function(err) {
        console.log(err);
        res.sendStatus(500);
        });
    });


module.exports = router;