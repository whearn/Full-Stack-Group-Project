var express = require('express');
var stripeSvc = require('../services/stripe.svc');

var router = express.Router();

router.post('/', function(req, res) {
    stripeSvc.charge(req.body.token, req.body.amount)
    .then(function(response) {
        console.log(response);
        res.sendStatus(201);
    }).catch(function(err) {
        console.log(err);
        res.sendStatus(500);
    });
})

module.exports = router;