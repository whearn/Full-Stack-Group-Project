var stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);
// how to set to process.env.STRIPE_TEST_SECRET_KEY
//add group stripe key
exports.charge = function(token, amt) {
    return stripe.charges.create({
        source: token,
        amount: amt * 100,
        currency: 'usd',
        description: 'Covalence Online'
    });
}