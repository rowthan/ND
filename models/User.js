var mongoose = require('mongoose');
var userSchema = require('../schemas/User');
module.exports = mongoose.model('User', userSchema);



