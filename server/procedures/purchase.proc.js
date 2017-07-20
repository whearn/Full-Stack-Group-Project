var db = require('../config/db');

//match to DB stored procedure for new purchase
exports.create = function(purchaseamount, purchaseid) {
    return db.row('InsertPurchase', [purchaseamount, purchaseid])
}