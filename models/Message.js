/**
 * Created by rowthan on 2016/2/28 0028.
 */

var mongoose = require('mongoose');
var messageSchema = require('../schemas/Message');
module.exports = mongoose.model('Message', messageSchema);
