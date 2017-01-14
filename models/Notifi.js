/**
 * Created by rowthan on 2016/2/28 0028.
 */

var mongoose = require('mongoose');
var notifiSchema = require('../schemas/Notifi');
module.exports = mongoose.model('Notifi', notifiSchema);
