/**
 * Created by rowthan on 2016/3/3 0003.
 */
var mongoose = require('mongoose');
var columnSchema = require('../schemas/Column');
module.exports = mongoose.model('Column', columnSchema);

