var db = require('../config/db');

exports.all = function() {
    return db.rows('GetMiscs');
}
exports.read = function(id) {
    return db.row('GetProduct', [id]);
}