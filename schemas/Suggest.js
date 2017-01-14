/**
 * Created by rowthan on 2016/2/28 0028.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId //objectid 即默认主键 _id
var suggestSchema = new Schema({
    title:{
        type:String
    },
    message:{
        type:String,
        required:true
    },
    userId:{
        type: ObjectId,
        ref: 'User'
    },
    email:{
        type:String,
        lowercase: true
    },
    createAt: {
        type: Date
    },
    updateAt: {
        type: Date
    }
});
suggestSchema.pre('save',function(next){
    if(this.isNew){
        this.createAt = this.updateAt = Date.now();
    }else
    {
        this.updateAt=Date.now();
    }
    next();
});

suggestSchema.statics = {//静态方法
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

module.exports =  suggestSchema;