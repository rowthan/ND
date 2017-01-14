var _ = require('lodash');
var async = require('async');
var crypto = require('crypto');
var fs = require('fs');
var path = require('path');
var passport = require('passport');

var Userpro = require('../../proxy/user');
var Notification = require('../../proxy/notification');
var PostPro = require('../../proxy/post');
var nodemail = require('../../middlewares/nodemail');

var User = require('../../models/User');

var Async = require('async');

var qiniuyunconfig = require('../../config/config').qiniuyun;


var qiniu = require("qiniu");
qiniu.conf.ACCESS_KEY = qiniuyunconfig.ACCESS_KEY;
qiniu.conf.SECRET_KEY = qiniuyunconfig.SECRET_KEY;

/**
 * GET /login
 * Login page.
 */
exports.getLogin = function (req, res) {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('account/login',{
        title:'login'
    });
};

/**
 * POST /login
 * Sign in using email and password.
 */
exports.postLogin = function (req, res, next) {
    //req.assert('email', 'Email 格式不正确').isEmail();
    req.assert('password', '密码不能为空').notEmpty();
    req.assert('email', '用户名不能为空').notEmpty();
    var errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('back');
    }

    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('errors', {msg: info.message});
            return res.redirect('/login');
        }
        // var user0 = user;
        // console.log('the req.user before login!!!-------------------------------------------'+req.user);

        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            // console.log('the req.user0 is++++++++++++++++++++++++++++++++++++++++++++++++++++'+req.user0);
            // console.log('the req.user after login is'+req.user);
            req.flash('success', {msg: 'Success! 登陆成功.'});
            res.redirect( 'back');

            //res.redirect(req.session.returnTo || '/');
        });
        // res.user = user;
        //     res.redirect( '/');
    })(req, res, next);
};


/**
 * GET /logout
 * Log out.
 */
exports.logout = function (req, res) {
    req.logout();
    res.redirect('back');
};

/**
 * GET /signup
 * Signup page.
 */
exports.getSignup = function (req, res) {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('account/signup', {
        title: 'Create Account'
    });
};

/**
 * POST /signup
 * Create a new local account.
 */
exports.postSignup = function (req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', '密码不得少于6位').len(6);
    req.assert('confirmPassword', '两次密码不一样！请重新输入').equals(req.body.password);
    var errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/signup');
    }



    var _user = {
        email:req.body.email.toLowerCase().trim(),
        password: req.body.password.trim(),
        profile:{
            name:req.body.name || req.body.email.replace(/@.*/gi, ''),
            location:req.body.location || '',
            gender:req.body.gender || ''
        }
    };

    
    Userpro.judgeEmailExist(_user.email,function (err,user) {
        if(user){
            req.flash('errors', {msg: '该邮箱账户已经存在.'});
            return res.redirect('/signup');
        }
        else{
            Userpro.checkUserNameExist(_user.profile.name,function (err,user) {
               if(user){
                   _user.profile.name=_user.profile.name + Date.now();
                   Userpro.signUpByEmail(_user,function (err,result) {
                       if(result){
                           req.logIn(result,function (err) {
                               if (err) {
                                   return next(err);
                               }
                               req.flash('success', {msg: '注册成功，该用户名已经存在，为您自动生成用户名，可进入我的账户自行修改.'});
                               res.redirect('/');
                           });
                       }
                       else{
                           console.log(err);
                           req.flash('errors', {msg: '注册失败,该用户名已经存在，请重新取名.'});
                           res.redirect('/signup');
                       }
                   });
               }
                else{
                   Userpro.signUpByEmail(_user,function (err,result) {
                       if(result){
                           req.logIn(result,function (err) {
                               if (err) {
                                   return next(err);
                               }
                               res.redirect('/');
                           });
                       }
                       else{
                           console.log(err);
                           req.flash('errors', {msg: '注册失败,该用户名可能已经存在，请重新取名.'});
                           res.redirect('/signup');
                       }
                   });
               }

            });
        }
    });
};

/**
 * GET /account
 * Profile page.
 */
exports.getAccount = function (req, res) {
    Async.parallel({
        getMessage:function (cb) {
            Userpro.getMessage(req.user._id,function (err,messages) {
                cb(err,messages);
            })
        },
        countNotif:function (cb) {
            Notification.countNotification(req.user._id,function (err,number) {
                cb(err,number);
            });
        }
    },function (err,results) {
        res.render('account/account', {
            title: 'Account Management',
            notifi:results.countNotif,
            messages:results.getMessage
        });
    });
};

exports.getNotifiManage = function (req,res) {
    var userid = req.user._id;
    Async.parallel({
        commentNotifi:function(cb){
            Notification.getUserNotifis(userid,'comment',function (err,notifi) {
                cb(err,notifi);
            })
         },
        replyNotifi:function (cb) {
            Notification.getUserNotifis(userid,'reply',function (err,notifi) {
                cb(err,notifi);
            })
        },
        messageNotifi:function (cb) {
            Notification.getUserNotifis(userid,'message',function (err,notifi) {
                cb(err,notifi);
            })
        }
    },
    function (err,result) {
        if(err){
            console.log(err);
        }
        console.log('notifi'+result);
        res.render('account/notification',{
            title:'notifiManage',
            commentNotifi:result.commentNotifi,
            replyNotifi:result.replyNotifi,
            messageNotifi:result.messageNotifi
        })
    });

    // Notification.getUserReplyNotif(req.user._id,function (err,notifis) {
    //     Notification.getUserMessageNotif(req.user._id,function (err,message) {
    //         res.render('account/notification',{
    //             title:'notifiManage',
    //             replyNotif:notifis,
    //             messageNotif:message
    //         })
    //     });
    //
    // });
};

exports.getProfile = function (req,res) {
    Notification.countNotification(req.user._id,function (err,number) {
        res.render('account/profile', {
            title: 'profile',
            notifi:number
        });
    });
};


/**
 * POST /account/profile
 * Update profile information.
 */
exports.savePic = function (req, res) {
    console.log('this is savepis');

//要上传的空间
    bucket = 'test';
//构建上传策略函数
    function uptoken(bucket, key) {
        var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
        return putPolicy.token();
    }

//要上传文件的本地路径
    var filePath = req.files.picture.path;
//上传到七牛后保存的文件名
    var timestamp = Date.now();//时间戳
    // var pic = req.files.picture.originalFilename;
    key = req.user.profile.name+timestamp;
//生成上传 Token
    token = uptoken(bucket, key);
//构造上传函数
    function uploadFile(uptoken, key, localFile) {
        var extra = new qiniu.io.PutExtra();
        qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
            if(!err) {
                Userpro.savePic(req.user._id,qiniuyunconfig.site+key+qiniuyunconfig.size,function (err,result) {
                    if(err){
                        console.log(err);
                    }
                    else{
                        return res.redirect('back');
                    }
                });
               
//                 // 上传成功， 处理返回值
//                 console.log(ret.hash, ret.key, ret.persistentId);
//                 //构建私有空间的链接
//                 url = 'http://7xr4l3.com1.z0.glb.clouddn.com/'+key;
//                 var policy = new qiniu.rs.GetPolicy();
//
// //生成下载链接url
//                 var downloadUrl = policy.makeRequest(url);
//
// //打印下载的url
//                 console.log(downloadUrl);
//
//                 // return res.redirect('/account/profile');
            } else {
                // 上传失败， 处理返回代码
                console.log('qiniu'+err);
                return res.redirect('/');
            }
        });
    }

//调用uploadFile上传
    uploadFile(token, key, filePath);

    // var posterData = req.files.picture ;// 获得路径
    // var filePath = posterData.path;
    // var originalFilename = posterData.originalFilename ;//获取名字
    //     console.log('this filepath is '+filePath);
    // if (originalFilename) {//判断是否已经存在该文件 根据名字
    //     fs.readFile(filePath, function (err, data) {
    //         var timestamp = Date.now();//时间戳
    //         var type = posterData.type.split('/')[1];//获取类型 如jpg
    //         var pic = originalFilename + '_' + timestamp + '.' + type;
    //         var newPath = path.join(__dirname, '../../', 'public/upload/' + pic);//生成存储变量地址
    //
    //         fs.writeFile(newPath, data, function (err) {
    //             console.log('this is wirtefile');
    //             req.pic = pic;
    //             next()
    //         })
    //
    //     })
    // }
    // else {
    //     next()
    // }
};



exports.postUpdateProfile = function (req, res) {//暂且放一边
    var profile = req.body.profile;
    console.log('post profile is'+profile);
    Userpro.updateProfile(req.user._id,profile,function (err,number) {
        // console.log('after update profile'+number.nModified);
        if(err){
            console.log('save err'+err);
            req.flash('errors', {msg: '个人信息更新失败！.'});
            res.redirect('back');
        }
        else{
            req.flash('success', {msg: '个人信息已经成功更新！.'});
            res.redirect('back');
        }
    });
};

/**
 * POST /account/password
 * Update current password.
 */
exports.postUpdatePassword = function (req, res, next) {
    req.assert('password', '密码至少长度大于6').len(6);
    req.assert('confirmPassword', '两次密码不相同，请检查！').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/account');
    }
    var newpass = req.body.password;
    var userid = req.user.id;
    Userpro.updatePassword(userid,newpass,function (err,result) {
        if(result){
            req.flash('success', {msg: '密码已被修改.'});
            res.redirect('/account');
        }
        else{
            req.flash('errors', {msg: '密码修改失败.'});
            res.redirect('/account');
        }
    });
};

/**
 * POST /account/delete
 * Delete user account.
 */
exports.postDeleteAccount = function (req, res, next) {
    // User.remove({_id: req.user.id}, function (err) {
    //     if (err) {
    //         return next(err);
    //     }
    //     req.logout();
    //     req.flash('info', {msg: '你账户已经被删除.'});
    //     res.redirect('/');
    // });
};

/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
exports.getOauthUnlink = function (req, res, next) {
    var provider = req.params.provider;
    User.findById(req.user.id, function (err, user) {
        if (err) {
            return next(err);
        }
        user[provider] = undefined;
        user.tokens = _.reject(user.tokens, function (token) {
            return token.kind === provider;
        });
        user.save(function (err) {
            if (err) return next(err);
            req.flash('info', {msg: provider + ' 已经关联账户！.'});
            res.redirect('/account');
        });
    });
};

/**
 * GET /reset/:token
 * Reset Password page.
 */
exports.getReset = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    User
        .findOne({resetPasswordToken: req.params.token})
        .where('resetPasswordExpires').gt(Date.now())
        .exec(function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                req.flash('errors', {msg: '密码重置密钥错误或已过期Password reset token is invalid or has expired.'});
                return res.redirect('/forgot');
            }
            res.render('account/reset', {
                title: 'Password Reset'
            });
        });
};

/**
 * POST /reset/:token
 * Process the reset password request.
 */
exports.postReset = function (req, res, next) {
    req.assert('password', '密码最少长度为6').len(6);
    req.assert('confirm', '密码两次输入不匹配.').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('back');
    }

    async.waterfall([
        function (done) {
            User
                    .findOne({resetPasswordToken: req.params.token})
                    .where('resetPasswordExpires').gt(Date.now())
                    .exec(function (err, user) {
                        if (err) {
                            return next(err);
                        }
                        if (!user) {
                            req.flash('errors', {msg: '密码重置密钥不正确或已经过期.'});
                            return res.redirect('back');
                        }
                        user.password = req.body.password;
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;
                        user.save(function (err) {
                            if (err) {
                                return next(err);
                            }
                            req.logIn(user, function (err) {
                                done(err, user);
                            });
                        });
                    });
        },
        function (user, done) {
            var text ='Hello,\n\n' +
                    '您在naodong中账户 ' + user.email + ' 密码已经修改.\n';
            nodemail.sendEmail(user.email,'重置密码成功',text,function (err) {
               if(!err){
                   req.flash('success', {msg: 'Success! 密码重置成功.'});
                   done(err);
               }
                else{
                   done(err);
               }
            });
        }
    ], function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};

/**
 * GET /forgot
 * Forgot Password page.
 */
exports.getForgot = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('account/forgot', {
        title: 'Forgot Password'
    });
};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
exports.postForgot = function (req, res, next) {
    req.assert('email', 'Please enter a valid email address.').isEmail();

    var errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/forgot');
    }
    //waterfall(tasks, [callback]) （多个函数依次执行，且前一个的输出为后一个的输入）
    async.waterfall([
        function (done) {
            crypto.randomBytes(16, function (err, buf) {
                var token = buf.toString('hex');//生成随机数
                done(err, token);
            });
        },
        function (token, done) {
            User.findOne({email: req.body.email.toLowerCase()}, function (err, user) {
                if (!user) {
                    req.flash('errors', {msg: '不存在该email账户！请重新输入！.'});
                    return res.redirect('/forgot');
                }
                user.resetPasswordToken = token;//生成重置密码密钥
                user.resetPasswordExpires = Date.now() + 3600000; // 有效期 1 hour
                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            var text =   '您收到这封邮件 用户重置您的密码.\n\n' +
            '点击该链接,或复制地址在浏览器中进入:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            '如果您未发送重置密码请求，请忽略本邮件.\n';

            nodemail.sendEmail(user.email,'重置您的密码 naodng',text,function (err) {
                if(!err){
                    req.flash('info', {msg: '邮件已经发送到您的邮箱 ' + user.email + ' 请查看！.'});
                    done(err, 'done');
                }
                else{
                    done(err);
                }
            });
        }
    ], function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/forgot');
    });
};


exports.getSingleuserinfo = function (req, res) {
    var id = req.params.token;//通过路由
    if (id) {
        Async.parallel({
            getUserinfo:function (cb) {
                Userpro.getUserinfo(id,function (err,userinfo) {
                    cb(err,userinfo);
                })
            },
            getMessage:function (cb) {
                Userpro.getMessage(id,function (err,messages) {
                    cb(err,messages);
                })
            },

            getUserPosts:function (cb) {
                Userpro.getuserPosts(id,function (err,posts) {
                    cb(err,posts);
                })
            }
        },function (err,results) {
            if(err){
                return res.send('该用户不存在');
            }
            else{
                res.render('userinfo/userinfo', {
                    title: 'userinfo',
                    userinfo: results.getUserinfo,
                    posts: results.getUserPosts,
                    messages:results.getMessage
                });
            }
        });
        // Userpro.getUserinfo(id,function (err,userinfo) {
        //     if (!userinfo) {
        //         return res.send('不存在该用户!');
        //     }
        //     Userpro.getuserPosts(userinfo._id,function (err,posts) {
        //
        //     });
        // });


    }
};

exports.sendMessage = function (req,res) {
    var sendbody={
        message : req.body.message,
        to : req.body.to,
        from:req.user._id
    };
    Userpro.sendMessage(sendbody,function (err,result) {
        var notification = {
            to:req.body.to,
            notification:{
                from:req.user._id,
                type:'message',
                message:req.body.message,
                createAt:Date.now()
            }
        };
        Notification.saveNotification(notification,function (err,result) {
            if(err){
                req.flash('errors', {msg: '留言失败.'});
            }
            req.flash('success', {msg: '留言成功.'});
            res.redirect('back');
        });
    });
};

exports.setUserNotificationNumber = function (req,res,next) {
    if(req.user){
        Notification.countNotification(req.user,function (err,number) {
            if(err){
                return next(err);
            }
            res.locals.message = number||'';
            next();
        });
    }
    else{
        return next();
    }

};




exports.ajaxGetMine = function (req,res) {
    var type = req.query.type;
    var number = Number(req.query.number);
    if(type=='myposts'){
        Userpro.getuserPosts(req.user._id,function (err,posts) {
            if(err){
                res.json({ code:-1,msg: "error get"});
            }
            if(posts){
                res.json({data: posts, code:1,msg: "success"});
            }
            else{
                res.json({ code:0,msg: "no data"});
            }
        })
    }
    if(type=='mycollections'){
        Userpro.getUserCollections(req.user._id,function (err,collections) {
            if(err){
                res.json({code:-1,msg:"error get"});
            }
            if(collections){
                // console.log('the collections is'+collections.postid);
                res.json({code:1,msg:"success",data:collections.postid});
            }
            else{
                res.json({code:0,msg:"no data"});
            }
        })
    }

};

exports.getUserNotifis = function (req,res) {
  Notification.getUserNotif(req.user._id,function (err,notifis) {
      if(err){
          res.json({code:-1});
      }
      else{
          res.json({notifis:notifis,code:1});
      }
  })
};

exports.deleteNotifi = function (req,res) {
    var userid = req.user._id;
    Notification.deleteNotifi(userid,function (err,result) {
        // console.log('result.n'+JSON.stringify(result.ok));
        if(err){
            console.log('something is wrong'+err);
            res.json({code:-1});
        }
        else{
            res.json({code:1});
        }
    })
};


exports.deleteSingleNotifi = function (req,res,next) {
    var notifiId= req.query.notifiId;
    var userid= req.user._id;
    Notification.deleteSingleNotifi(userid,notifiId,function (err,results) {
        if(results){
            res.json({code:1})
        }
        else{
            res.json({code:0})
        }
    })
};