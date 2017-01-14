/**
 * Created by rowthan on 2016/4/24 0024.
 */
var User = require('../models/User');
var Post = require('../models/Post');

exports.setAdmin = function (userid,callback) {
  User.findOneAndUpdate({_id:userid},{$set:{role:1}},function (err,number) {
      callback(err,number.nModified);
  })
};

exports.cancelAdmin = function (userid,callback) {
    User.findOneAndUpdate({_id:userid},{$set:{role:0}},function (err,number) {
        callback(err,number.nModified);
    })
};


exports.setFront = function (postid,callback) {
    Post.findOneAndUpdate({_id:postid},{$set:{front:true}},function (err,number) {
        callback(err,number.nModified);
    })
};

exports.cancelFront = function (postid,callback) {
    Post.findOneAndUpdate({_id:postid},{$set:{front:false}},function (err,number) {
        callback(err,number.nModified);
    })
};


exports.forbidUser = function (userid,callback) {
    User.findOneAndUpdate({_id:userid},{$set:{forbid:true}},function (err,number) {
        callback(err,number.nModified);
    })
};

exports.permitUser = function (userid,callback) {
    User.findOneAndUpdate({_id:userid},{$set:{forbid:false}},function (err,number) {
        callback(err,number.nModified);
    })
};