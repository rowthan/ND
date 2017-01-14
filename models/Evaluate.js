/**
 * Created by rowthan on 2016/4/17 0017.
 */

var mongoose = require('mongoose');
var evaluateSchema = require('../schemas/Evaluate');
module.exports = mongoose.model('Evaluate', evaluateSchema);