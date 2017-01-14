/**
 * Created by rowthan on 2016/3/3 0003.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


var tagSchema = new Schema({
    name: {type:String,unique:true},//类别名称
    level:{type:Number,default:0},
    createAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    }
},{autoIndex: false});
tagSchema.pre('save',function(next){
    if(this.isNew){
        this.createdAt = this.updated = Date.now();
    }else
    {
        this.updatedAt=Date.now();
    }
    next();
});


//貌似不用静态方法也可以直接使用find findone方法
tagSchema.statics = {//静态方法
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
module.exports =  tagSchema;