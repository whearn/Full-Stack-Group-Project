var db = require('../config/db');

//match to DB stored procedures
exports.all = function() {
    return db.rows('GetChart');
}
exports.destroy = function(id) {
    return db.empty('DeleteItem', [id]);
}
exports.create = function(productid, purchaseid) {
    return db.row('InsertPurchase', [productid, purchaseid])
}