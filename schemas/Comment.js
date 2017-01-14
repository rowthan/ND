/**
 * Created by rowthan on 2016/2/28 0028.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId ;//objectid 即默认主键 _id
var commentSchema = new Schema({
    post: {type: ObjectId, ref: 'Post', required: true,index:true,unique:true},
    from: {type: ObjectId, ref: 'User', required: true},
    content: {type: String, required: true},
    reply: [
        {
            from: {type: ObjectId, ref: 'User',required: true},//除objectid可以作为引用外 还可以使用number string buffer等 objectid推荐 无业务含义 不重复 默认主键,
            to: {type: ObjectId, ref: 'User',required: true},
            content: {type:String,required: true},
            replyAt:{type:Date}
        }
    ],
    reply_count:{
      type:Number,
      default:0
    },
    agree: [{
        type:ObjectId, ref:'User'
    }],

    createAt: {
        type: Date
    },
    updateAt: {
        type: Date
    }
});

commentSchema.pre('save',function(next){
    if(this.isNew){
        this.createAt = this.updateAt = Date.now();
    }else
    {
        this.updateAt=Date.now();
    }
    next();
});

commentSchema.statics = {//静态方法
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
module.exports = commentSchema;