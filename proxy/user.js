/**
 * Created by rowthan on 2016/4/1 0001.
 */
// var models  = require('../models');
// var User    = models.User;

var User = require('../models/User');
var Post = require('../models/Post');
var Message = require('../models/Message');
var Collection = require('../models/Collection');

exports.judgeEmailExist = function (email, callback) {
    // if (email.length === 0) {
    //     return callback(null, []);
    // }
    User.findOne({ email: email },'_id', callback);
};

exports.checkUserNameExist = function (username,callback) {
  User.findOne({'profile.name':username},'_id',callback);
};

exports.judgeUserExist = function (userid,callback) {
    User.findOne({_id:userid},'_id',callback);
};

exports.checkUserRole = function (userid,callback) {
  User.findOne({_id:userid},'role',callback)
};

exports.getUsersByEmail = function (email, callback) {
    if (email.length === 0) {
        return callback(null, []);
    }
    User.findOne({ email: email }, callback);
};

exports.signUpByEmail = function (user,callback) {
    var user = new User(user);
    user.save(callback)
};

exports.updateProfile = function (userid,profile,callback) {
    User.findById(userid, function (err, user) {
        if(user){
            profile.picture=user.profile.picture;
            // console.log('user.profile'+n);
            User.update({_id:userid},{$set:{"profile":profile}},function (err,number) {
                callback(err,number);
            });
        }
        else{
            callback(err,null);
        }
    })
};

exports.savePic = function (userid,url,callback) {
    User.update({_id:userid},{$set:{"profile.picture":url}},function (err,result) {
       callback(err,result);
    });
};

exports.updatePassword = function (userid,newpass,callback) {
    User.update({_id:userid},{$set:{password:newpass}},callback);
};

exports.getUserinfo = function (userid,callback) {
  User.findById(userid,function (err,userinfo) {
      callback(err,userinfo);
  })  
};

exports.getuserPosts = function (userid,callback) {//待做优化 选择有用信息
    Post.find({userId:userid},"-postbody",function (err,posts) {
        callback(err,posts);
    })
};

exports.sendMessage = function (sendbody,callback) {
    var message = new Message(sendbody);
    message.save(callback);
};

exports.getMessage = function (userid,callback) {
    Message
            .find({to:userid})
            .populate('from','profile.name profile.picture')
            .exec(function (err,message) {
                callback(err,message);
            })
};

exports.checkUserExistInCollect = function (userid,callback) {
    if(!userid){
        return callback(null,null);
    }
    Collection.findOne({userid:userid},'_id',callback);
};

exports.createUserInCollect = function (userid,callback) {
    if(!userid){
        return callback(null,null);
    }
    else{
        var collection = new Collection({
            userid:userid
        });
        collection.save(callback);
    }
};

exports.getUserCollections = function (userid,callback) {
  Collection
          .findOne({userid:userid},'postid')
          .populate('postid','posttitle')
          .exec(function (err,posts) {
              callback(err,posts);
          })
};

exports.getUsers = function (callback) {
  User.find({},callback);
};