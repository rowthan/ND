/**
 * Created by rowthan on 2016/3/3 0003.
 */
var mongoose = require('mongoose');
var tagSchema = require('../schemas/Tag');
module.exports = mongoose.model('Tag', tagSchema);


