//var _ = require('lodash');
//var async = require('async');
//var crypto = require('crypto');
//var nodemailer = require('nodemailer');
//var passport = require('passport');
var Post = require('../../models/Post');
// var User = require('../../models/User');
var Comment = require('../../models/comment');

var postPro = require('../../proxy/post');
var Suggest = require('../../proxy/suggest');

var Admin = require('../../proxy/admin');

var User = require('../../proxy/user');

var Column = require('../../proxy/Column');

var Nodemail = require('../../middlewares/nodemail');

/**
 * GET /login
 * Login page.
 */
exports.getPosts = function (req, res) {
    Post
        .find({})
        .populate('userId', 'profile.name')
        .exec(function (err, post) {
            if (err) {
                console.log(err)
            }
            res.render('admin/postlist', {
                title: 'postlist',
                posts: post
            });
        })
};

exports.getUsers = function (req, res) {
    User.getUsers(function (err,users) {
        if (err) {
            console.log(err);
        }
        res.render('admin/userlist', {
            title: 'userlist',
            users: users
        });
    })
};

exports.getTags = function (req,res) {
  postPro.getTags(100,function (err,tags) {
      res.render('admin/taglist',{
          title:'taglist',
          tags:tags
      })
  });
};

exports.getSuggset = function (req,res) {
    Suggest.getSuggset(function (err,suggest) {
        res.render('admin/suggest',{
            title:'suggest',
            suggest:suggest
        })
    })
};

exports.getEmail = function (req,res) {
    res.render('admin/email',{
        title:'email'
    })
};

exports.postEmail = function (req,res) {
    var title = req.body.title.trim();
    var content = req.body.content;
    var addressee = req.body.addressee.trim();
    if(!title||!content||!addressee){
        return null;
    }

    var addrs = new Array();
    addrs = addressee.split(";");

    for(i=0;i<addrs.length;i++){
        var count = addrs.length;
        Nodemail.sendEmail(addrs[i],title,content,function (err) {
            --count;
            console.log('count is '+count);
            if(!count){
                // req.flash("errors",{"msg":"邮件发送失败，可能邮件内容里包含不合法内容，如图片等"});
                res.redirect('back');
            }
        });
    }
};

exports.deletePost = function (req, res) {
    var id = req.query.id;
    if (!id) return;
    Post.remove({_id: id}, function (err, post) {
        Comment.remove({post: id}, function (err, comment) {
            if (err) {
                console.log(err);
            } else {
                //req.flash('success', {msg: '删除成功！'}); 由于是ajax传输 所以提示不会立即显示 会当下次刷新时显示
                res.json({code: 0, msg: "success"});
            }
        })
    });
};


exports.deleteTag = function (req,res) {
    var id = req.query.tagid;
    if(id){
        postPro.deleteTag(id,function (err,number) {
            // console.log('the remove number is '+number);
            // console.log('the remove json number is '+JSON.stringify(number)+'and'+JSON.stringify(number).n);
            // if(number.n){
            //     res.json({code: 1, msg: "success"});
            // }
            // else{
            //     res.json({code: 0, msg: "error"});
            // }
            if(err){
                console.log(err);
                res.json({code: 0, msg: "error"});
            }
            else{
                res.json({code: 1, msg: "success"});
            }

        })
    }
    else{
        res.json({code:-1,msg:"no id"})
    }

};


exports.setAdmin = function (req,res) {
    var userid = req.query.user;
    User.checkUserRole(userid,function (err,user) {
        if (user && req.user.role > user.role) {
            Admin.setAdmin(userid, function (err, number) {
                res.redirect('back');
            })
        }
        else {
            res.redirect('back');
        }
    })
};

exports.cancelAdmin = function (req,res) {
  var userid = req.query.user;
    User.checkUserRole(userid,function (err,user) {
        if (user && req.user.role > user.role) {
            Admin.cancelAdmin(userid, function (err, number) {
                res.redirect('back');
            })
        }
        else {
            res.redirect('back');
        }
    })
};

exports.setFront = function (req,res) {
    var postid= req.query.postid;
    Admin.setFront(postid,function (err,result) {
        res.redirect('back');
    })
};

exports.cancelFront = function (req,res) {
    var postid= req.query.postid;
    Admin.cancelFront(postid,function (err,result) {
        res.redirect('back');
    })
};

exports.forbidUser = function (req,res) {
    var userid = req.query.user;
    User.checkUserRole(userid,function (err,user) {
        if(user&&req.user.role>user.role){
            Admin.forbidUser(user._id,function (err,result) {
                if(result){
                    res.redirect('back');
                }
                else{
                    res.redirect('/account');
                }
            });
        }
        else{
            res.redirect('/account');
        }
    })
};

exports.permitUser = function (req,res) {
    var userid = req.query.user;
    User.checkUserRole(userid,function (err,user) {
        if(user&&req.user.role>user.role){
            Admin.permitUser(user._id,function (err,result) {
                if(result){
                    res.redirect('back');
                }
                else{
                    res.redirect('/account');
                }
            });
        }
        else{
            res.redirect('/account');
        }
    })
};


exports.getColumn = function (req,res) {
    Column.getColumn(function (err,columns) {
        res.render('admin/column',{
            title:'taglist',
            columns : columns
        })
    })
};

exports.addColumn = function (req,res) {
    var columnName = req.body.column;
    if(!columnName){
        res.redirect('back');
    }
    else{
        Column.addColumn(columnName,function (err,result) {
            if(err){
                res.redirect("back")
            }
            else{
                res.redirect("/")
            }
        })
    }
};


