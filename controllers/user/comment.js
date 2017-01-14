/**
 * Created by rowthan on 2016/1/8 0008.
 */

var Comment = require("../../proxy/comment");
var Post = require('../../proxy/post');
var Notification = require('../../proxy/notification');
var Async = require('Async');

var qiniuconfig = require('../../config/config').qiniuyun;

var qiniu = require("qiniu");
qiniu.conf.ACCESS_KEY = qiniuconfig.ACCESS_KEY;
qiniu.conf.SECRET_KEY = qiniuconfig.SECRET_KEY;

exports.save = function(req,res){//回复中间件！！！！！！！！
    var _comment = req.body.comment;
    var _message = _comment.content.substr(0,20);
    if(_comment.cid) {//叠楼回复
        _comment.from = req.user._id;
        Async.series({
            saveReply:function (callback) {
                var replyinfo = {
                    from: _comment.from,
                    to: _comment.tid,
                    content: _comment.content,
                    cid:_comment.cid
                };
                Comment.saveReply(replyinfo,function (err,reply) {
                    callback(err,reply);
                });
            },
            notifi:function (callback) {
                if(_comment.from!=_comment.tid){
                    var notification = {
                        to:_comment.tid,
                        notification:{
                            from:req.user._id,
                            type:'reply',
                            message:_message,
                            comment_target:_comment.cid,
                            post_target:_comment.post,
                            createAt:Date.now()
                        }
                    };
                    Notification.saveNotification(notification,function (err,notifi) {
                        callback(err,notifi);
                    })
                }
                else{
                    callback();
                }
            }
        },function (err,result) {
            console.log('over');
            if(err){
                req.flash('errors',{ msg: '回复叠楼失败！' });
                res.redirect('back');
            }
            else{
                req.flash('success',{ msg: '回复成功！' });
                res.redirect('back');
            }
        });
    }
    else{//回复楼主
        Async.auto({
            savecomment:function (callback) {
                var comment={
                    post:_comment.post,
                    from:_comment.from,
                    content:_comment.content
                };
                Comment.saveComment(comment,function (err,comment) {
                    callback(err,comment);
                });
            },
            updatepost:['savecomment',function (callback) {
                Post.addComment(_comment.post,1,function (err,result) {
                    callback(err,result);
                });
            }],
            notification:['savecomment',function (callback,results) {
                Post.getPostAuthor(_comment.post,function (err,userid) {
                    if(_comment.from!=userid.userId._id){
                        var notification = {
                            to:userid.userId._id,
                            notification:{
                                from:req.user._id,
                                type:'comment',
                                message:_message,
                                post_target:_comment.post,
                                createAt:Date.now()
                            }
                        };
                        Notification.saveNotification(notification,function (err,result) {
                            callback(err,result)
                        });
                    }
                    else{
                        callback(err,results)
                    }
                });
            }]
        },function (err,results) {
            if(err){
                req.flash('errors',{ msg: '回复失败！' });
                res.redirect('back');
            }
            else{
                req.flash('success',{ msg: '回复成功！' });
                res.redirect('back');
            }
        })
    }
};

exports.savePic = function (req, res) {
    console.log('this is save pic in comment');

//要上传的空间
    bucket = 'test';
//构建上传策略函数
    function uptoken(bucket, key) {
        var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
        return putPolicy.token();
    }

//要上传文件的本地路径
    filePath = req.files.picture.path;
//上传到七牛后保存的文件名
    var timestamp = Date.now();//时间戳
    var pic = req.files.picture.originalFilename;
    key = pic+timestamp;
//生成上传 Token
    token = uptoken(bucket, key);
//构造上传函数
    function uploadFile(uptoken, key, localFile) {
        var extra = new qiniu.io.PutExtra();
        qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
          if(err){
              res.json({code:-1});
          }
            else{
              res.json({code:1,url:qiniuconfig.site+key});//+'?imageView2/1/w/200/h/200'
          }
        });
    }

//调用uploadFile上传
    uploadFile(token, key, filePath);
};

exports.agree = function (req,res) {
    var commentid = req.query.commentid;
    var user = req.user._id;
    if (commentid) {
        Comment.agree(user,commentid,function (err,agree) {
            if(err){
                return res.json({err:err})
            }
            console.log('this agree is'+agree);
            if(!agree){
                Comment.disagree(user,commentid,function (err,disagree) {
                    res.json({disagree:disagree});
                })
            }
            else{
                res.json({ agree:agree});
            }
        });
    }
};