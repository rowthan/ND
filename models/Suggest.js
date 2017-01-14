/**
 * Created by rowthan on 2016/2/28 0028.
 */

var mongoose = require('mongoose');
var suggestSchema = require('../schemas/Suggest');
module.exports = mongoose.model('Suggest', suggestSchema);


