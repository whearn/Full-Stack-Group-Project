var express = require('express');
var stripeSvc = require('../services/stripe.svc');
var mailService = require('../services/email.svc');
var procedures = require('../procedures/purchase.proc');

var router = express.Router();

router.post('/', function(req, res) {
    stripeSvc.charge(req.body.token, req.body.amount)
    .then(function(response) {
        console.log(response);
        return procedures.create(req.body.amount, response.id);
    })
    .then(function(response) {
    let content = `<h3>Thank you for shopping with Covalence</h3>`;
                    //loop through products
                    for(var i=0; i < req.body.products.length; i++){
                       content += `<p>${req.body.products[i].title} - $${req.body.products[i].price}</p>`;
                    }
                   content += `<p>----------------------</p>
                   <p>Your total:$ ${req.body.amount}</p>`;

    return mailService.sendEmail(req.body.email, 'no-reply@covalencemerch.io', 'Your Covalence Receipt', content);
    })
    .then(function(response) {
        res.status(201).send(response);
    })
    .catch(function(err) {
        console.log(err);
        res.sendStatus(500);
    });
    // let content = `<h3>Thank you for shopping with Covalence ${req.body.name}</h3>
    //                 <h5>${req.body.products}</h5>
    //                 <p>Your total: ${req.body.total}</p>`;

    // mailService.sendEmail(req.body.email, 'no-reply@covalencemerch.io', 'Your Covalence Receipt', content)
    // .then(function(success) {
    //     console.log(success);
    //     res.sendStatus(201);
    // }).catch(function(err) {
    //     console.log(err);
    //     res.sendStatus(500);
    // });
})

module.exports = router;