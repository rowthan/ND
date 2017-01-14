/**
 * Created by rowthan on 2016/4/17 0017.
 */
/**
 * Created by rowthan on 2016/2/26 0026.
 */

/**
 * Created by luhuijian on 15/5/21.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;



var evaluateSchema = new Schema({
    postid:{
        type:ObjectId,
        ref:'Post',
        index:true,
        unique:true,
        required:true
    },
    createAt: {
        type: Date
    },
    updateAt: {
        type: Date
    },
    like:[{
        type:ObjectId,
        ref: 'User'
    }],
    genius:[{
        type:ObjectId,
        ref:'User'
    }],
    crazy:[{
        type:ObjectId,
        ref:'User'
    }]

}/*{autoIndex: false},*/);


evaluateSchema.pre('save',function(next){
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

evaluateSchema.pre('insert',function(next){
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

module.exports =  evaluateSchema;
