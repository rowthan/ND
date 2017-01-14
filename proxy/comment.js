/**
 * Created by rowthan on 2016/4/21 0021.
 */

var Comment = require('../models/Comment');

exports.agree = function (user,commentid,callback) {
    Comment.update({_id:commentid},{$addToSet:{agree:user}},function (err,numberAffected) {
        callback(err,numberAffected.nModified);
    })
};

exports.disagree = function (user,commentid,callback) {
    Comment.update({_id:commentid},{$pull:{agree:user}},function (err,numberAffected) {
        callback(err,numberAffected.nModified);
    })
};

exports.saveReply = function (reply,callback) {
    Comment.findById(reply.cid,function (err,comment) {
        comment.reply.push(reply);
        comment.reply_count++;
        comment.save(function (err,reply) {
            console.log(err);
            callback(err,reply);
        })
    })
};

exports.saveComment = function (_comment,callback) {
    var comment = new Comment(_comment);
    comment.save(function (err,comment) {
        callback(err,comment);
    })
};