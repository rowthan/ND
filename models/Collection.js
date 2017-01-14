/**
 * Created by rowthan on 2016/2/28 0028.
 */

var mongoose = require('mongoose');
var collectionSchema = require('../schemas/Collection');
module.exports = mongoose.model('Collection', collectionSchema);

