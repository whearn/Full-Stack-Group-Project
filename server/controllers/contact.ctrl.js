var express = require('express');
var mailService = require('../services/email.svc');

var router = express.Router();

router.post('/', function(req, res) {
    let content = `<h3>You have a new message from ${req.body.name}</h3>
                    <h5>From:${req.body.email}</h5>
                    <p>${req.body.message}</p>`;

    mailService.sendEmail('no-reply@covalence.io', 'no-reply@customer.com', 'New Customer Question', content)
    .then(function(success) {
        console.log(success);
        res.sendStatus(201);
    }).catch(function(err) {
        console.log(err);
        res.sendStatus(500);
    });
});

module.exports = router;
