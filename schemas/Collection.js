/**
 * Created by rowthan on 2016/4/5 0005.
 */
/**
 * Created by rowthan on 2016/2/28 0028.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId //objectid 即默认主键 _id
var collectionSchema = new Schema({
    userid:{
       type: ObjectId, ref: 'User', required: true,unique:true,index: true
    },
    postid:[{
        type: ObjectId, ref: 'Post'
    }],
    createAt: {
        type: Date
    },
    updateAt: {
        type: Date
    }
});

collectionSchema.pre('save',function(next){
    if(this.isNew){
        this.createAt = this.updateAt = Date.now();
    }else
    {
        this.updateAt=Date.now();
    }
    next();
});

collectionSchema.statics = {//静态方法
    fetch: function(cb) {//取出目前数据库所有的数据
        return this.find({})
                .sort('updateAt')
                .exec(cb);
    },
    findById: function(id, cb) {
        return this
                .findOne({
                    _id: id
                }).exec(cb);
    }
};
module.exports = collectionSchema;