/**
 * Created by rowthan on 2016/2/28 0028.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId //objectid 即默认主键 _id
var notificationSchema = new Schema({
    to:{
        type: ObjectId,
        ref: 'User',
        required:true,
        unique:true
    },
    notification:[
        {
            type:{
                type:String
            },
            from:{
                type: ObjectId,
                ref: 'User',
                required:true
            },
            message:{
                type:String
            },
            post_target:{
                type: ObjectId,
                ref: 'Post'
            },
            comment_target:{
                type:ObjectId,
                ref:'Comment'
            },
            createAt: {
                type: Date
            }
        }
    ],
    createAt: {
        type: Date
    },
    updateAt: {
        type: Date
    },
    notifiCount:{
        type:Number,
        default:0
    }
});

notificationSchema.pre('save',function(next){
    this.notifiCount = this.notification.length;
    if(this.isNew){
        this.createAt = this.updateAt = Date.now();
    }else
    {
        this.updateAt=Date.now();
    }
    next();
});

notificationSchema.statics = {//静态方法
    fetch: function(cb) {//取出目前数据库所有的数据
        return this.find({})
                .sort('meta.updateAt')
                .exec(cb);
    },
    findById: function(id, cb) {

        return this
                .findOne({
                    _id: id
                }).exec(cb);
    }
};
module.exports =  notificationSchema;