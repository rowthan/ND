/**
 * Created by rowthan on 2016/2/26 0026.
 */

/**
 * Created by luhuijian on 15/5/21.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var config = require('../config/config').post;


var postSchema = new Schema({
    posttitle:{
        type: String,
        required: true
    },
    postbody:{
        type: String,
        required: true
    },
    abstract:{
        type:String,
        required:true
    },
    postpic:{
        type:String,
        default:config.postPic
    },
    front:{
        type:Boolean,
        default:false
    },
    column:{
        type: ObjectId, ref: 'Column'
    },
    tags:[{
        type: ObjectId, ref: 'Tag'
    }],
    userId:{
        type: ObjectId,
        ref: 'User',
        required:true
    },
    createAt: {
        type: Date
    },
    updateAt: {
        type: Date
    },
    pv:{
        type:Number,
        default:0
    },
    like_count:{
        type:Number,
        default:0
    },
    comment_count:{
        type:Number,
        default:0
    },
    genius_count:{
        type:Number,
        default:0
    },
    crazy_count:{
        type:Number,
        default:0
    }

}/*{autoIndex: false},*/);

postSchema.index({updateAt:-1,comment_count:-1});

postSchema.pre('save',function(next){
    if(this.isNew){
        // console.log('this is a new post we define the time');
        this.createAt = this.updateAt = Date.now();

    }else
    {
        this.updateAt = Date.now();
        // console.log('this is not a new post we define the time');
    }
    next();
});

postSchema.pre('insert',function(next){
    if(this.isNew){
        // console.log('this is a new post insert we define the time');
        this.createAt = this.updateAt = Date.now();

    }else
    {
        this.updateAt = Date.now();
        // console.log('this is not a new post insert we define the time');
    }
    next();
});

//貌似不用静态方法也可以直接使用find findone方法
postSchema.statics = {//静态方法
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
module.exports =  postSchema;
