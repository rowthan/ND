/**
 * Created by rowthan on 2016/4/2 0002.
 */

var notification = require('../proxy/notification');
var user = require('../proxy/user');
var post = require('../proxy/post');

exports.setGeniusCrazy = function (req,res,next) {
    notification.countGenius(function (err,genius) {
        notification.countCrazy(function (err,crazy) {
            res.locals.crazyN = crazy;
            res.locals.geniusN = genius;
            next();
        });
    });
};

exports.getUsers = function (req,res) {
    user.getUsers(function (err,users) {
        res.jsonp({users:users});
    })
};

exports.getPosts = function (req,res) {
    var number= Number(req.query.number);
    var page = Number(req.query.page);
    var type = req.query.type;
    if(type=="latest"){
        post.ajax_getpost(number,page,function (err,posts) {
            res.json({posts:posts})
        })
    }
    else{
        post.getColumnPost(type,number,page,function (err,posts) {
            console.log(posts);
            res.json({posts:posts});
        })
    }

};
