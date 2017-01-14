/**
 * Created by rowthan on 2016/1/8 0008.
 */

var Notification = require('../models/Notifi');
var Post = require('../models/Post');

exports.countNotification = function (userid,callback) {
    // Notification.count({to:userid},function (err,number) {
    //     if(err){
    //         console.log(err);
    //     }
    //     callback(err,number);
    // })
    Notification.findOne({to:userid},function (err,number) {
        var result ;
        if(number){
            result = number.notifiCount;
        }
        callback(err,result);
    });

};


exports.countGenius = function (callback) {
     Post.count({"$where" :  "this.genius_count > this.crazy_count" },function (err,number) {
         callback(err,number);
     });
};

exports.countCrazy = function (callback) {
    Post.count({"$where" :  "this.genius_count < this.crazy_count" },function (err,number) {
        callback(err,number);
    });
};
//用户回复 提醒查询

exports.getUserNotifis = function (userid,type,callback) {
    var type = type;
    Notification.aggregate().unwind('notification')
        .match({'notification.type':type,"to":userid})
        .group({_id:"$_id",notification:{$push:"$notification"}})
        .exec()
        .then(function (notification) {
            return Notification.populate(notification,{path:"notification.from",select:"profile.name profile.picture"})
        })
        .then(function (notification) {
            callback(null,notification)
        });
};

exports.getUserReplyNotif = function (userid,callback) {
    // Notification.find({'notification':[{'type':'comment'}]},'notification')
    //     .populate('notification.from','profile.name profile.picture')
    //     .exec(function (err,results) {
    //         console.log('reply'+results);
    //         callback(err,results);
    //     })
    Notification.aggregate().unwind('notification')
                    .match({'notification.type':{"$in":["comment"]},"to":userid})
                    .group({_id:"$_id",notification:{$push:"$notification"}})
                    .exec()
                    .then(function (notification) {
                        return Notification.populate(notification,{path:"notification.from",select:"profile.name profile.picture"})
                    })
                    .then(function (notification) {
                        // console.log(JSON.stringify(notification));
                        callback(null,notification)
                    });
};

//获取留言提醒
exports.getUserMessageNotif = function (userid,callback) {
    Notification.aggregate().unwind('notification')
            .match({'notification.type':"message","to":userid})
            .group({_id:"$_id",notification:{$push:"$notification"}})
            .exec()
            .then(function (notification) {
                return Notification.populate(notification,{path:"notification.from",select:"profile.name profile.picture"})
            })
            .then(function (notification) {
                // console.log(JSON.stringify(notification));
                callback(null,notification)
            });
};

//删除所有提醒
exports.deleteNotifi = function (userid,callback) {
    Notification.remove({to:userid},function (err,results) {
        callback(err,results);
    })
};

//删除单条提醒
exports.deleteSingleNotifi = function (userid,notifiId,callback) {
    Notification.findOne({to:userid},function (err,notifi) {
        if(!notifi){
            return callback(err,null);
        }
        // Notification.findOneAndUpdate({to:userid},{$inc:{notifiCount: -1},$pull:{'notification':{$elemMatch:{_id:notifiId}}}},function (err,number) {
        //     callback(err,number.nModified);
        // })
        notifi.update({$inc:{notifiCount:-1},$pull:{notification:{_id:notifiId}}},function (err,result) {
            console.log(err,result);
            callback(err,result.nModified);
        });
    })
        // Notification.update({to:userid},{$pull:{'notification.$._id':notifiId}},function (err,result) {
        //     console.log(err,result);
        //     callback(err,result.nModified);
        // });
    // Notification.findOneAndUpdate({to:userid},{$inc:{notifiCount: -1},$pull:{'notification':{$elemMatch:{_id:notifiId}}}},function (err,number) {
    //     callback(err,number.nModified);
    // })
};

//存入提醒
exports.saveNotification = function (notification,callback) {
    Notification.findOne({to:notification.to},function (err,notifi) {
       if(notifi){
           notifi.update({$inc: {notifiCount: 1},$addToSet:{notification:notification.notification}},function (err,number) {
               callback(err,number.nModified);
           })
       }
        else{
           var new_notification = new Notification(notification);
           new_notification.save(function (err,notification) {
               callback(err,notification);
           });
       }
    });

};