/**
 * Created by rowthan on 2016/2/28 0028.
 */

var mongoose = require('mongoose');
var commentSchema = require('../schemas/Comment');
module.exports = mongoose.model('Comment', commentSchema);

