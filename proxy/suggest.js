/**
 * Created by rowthan on 2016/4/18 0018.
 */
var Suggest = require('../models/Suggest');


exports.getSuggset = function (cb) {
    Suggest.find({},function (err,suggest) {
        cb(err,suggest);
    })
};