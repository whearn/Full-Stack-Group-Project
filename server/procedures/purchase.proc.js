var db = require('../config/db');

//match to DB stored procedure for new purchase
exports.create = function(productid, purchaseid) {
    return db.row('InsertPurchase', [productid, purchaseid])
}