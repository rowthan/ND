/**
 * Created by rowthan on 2016/2/26 0026.
 */

/**
 * Created by luhuijian on 15/5/21.
 */
var mongoose = require('mongoose');
var postSchema = require('../schemas/Post');
module.exports = mongoose.model('Post', postSchema);

