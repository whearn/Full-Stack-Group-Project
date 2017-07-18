var db = require('../config/db');

exports.all = function() {
    return db.rows('GetProducts');
}

exports.read = function(id) {
    return db.row('GetProduct', [id]);
}