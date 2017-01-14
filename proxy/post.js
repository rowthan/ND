/**
 * Created by rowthan on 2016/4/1 0001.
 */

var Post = require('../models/Post');
var Tag = require('../models/Tag');
var Comment = require('../models/Comment');
var Collection = require('../models/Collection');
var Evaluate = require('../models/Evaluate');

//首页

//最新 时间排序

exports.ajax_getpost= function (number,page,callback) {
    if(!number){
      start=6;
    }
    if(!page){
        page=1;
    }
    Post.find({}).sort('-updateAt').skip(number*(page-1)).limit(number)
        .populate('userId','profile.name profile.picture')
        .populate('tags','name')
        .exec(function (err,posts) {
            callback(err,posts);
        })
};

exports.getColumnPost = function (type,number,page,callback) {
    var columnId = type;
    Post.find({"column":columnId})
      .sort('-updateAt')
      .skip(number*(page-1)).limit(number)
      .populate('userId','profile.name profile.picture')
      .populate('tags','name')
      .exec(function (err,posts) {
          console.log("err"+err+posts);
          callback(err,posts);
      })
};

exports.getlatestpost = function (number,callback) {
    if(!number){
        number=10;
    }
    Post
        .find({},'-postbody -createAt',{sort:{"updateAt":-1},limit:number})
        .populate('userId','profile.name profile.picture')
        .populate('tags','name')
        .exec(function(err,latest){
            if (err) {
                console.log(err)
            }
            callback(err,latest);
        })
};

//最热 留言数排序
exports.getHottestPost = function (number,callback) {
    Post
        .find({},'-postbody -createAt')
        .sort('-comment_count')
        .limit(number)
        .populate('userId','profile.name')
        .exec(function(err,latest){
            if (err) {
                console.log(err)
            }
            callback(err,latest);
        })
};

exports.getFrontPost = function (number,callback) {
  Post
      .find({front:true},'-postbody')
      .populate("userId","profile.name profile.picture")
      .exec(function (err,fronts) {
          callback(err,fronts);
      })

};


//ajax获取帖子 天才类
exports.ajax_mostview = function (number,callback) {
    Post
        .find({"$where" :  "this.genius_count > this.crazy_count"},'-postbody')
        .sort('-pv')
        .limit(number)
        .populate('userId','profile.name')
        .populate('tags','name')
        .exec(function(err,mostview){
            callback(err,mostview);
        })
};

exports.ajax_mostlike = function (number,callback) {
    Post
        .find({"$where" :  "this.genius_count > this.crazy_count"},'-postbody')
        .sort('-like_count')
        .limit(number)
        .populate('userId','profile.name')
        .exec(function (err,like) {
               callback(err,like);
        })
};

//获取postbody 首页获取ajax
exports.ajax_getpostbody = function (postid,callback) {
  Post.findOne({_id:postid},'postbody',function (err,result) {
      callback(err,result);
  })
};


//搜索
exports.searchPosttitle = function (q,callback) {
    Post
        .find({posttitle: new RegExp(q + '.*', 'i')},'posttitle') //通过正则 模糊查询
        .exec(function (err, posts) {
            callback(err,posts);
        })
};

exports.searchPostbody = function (q,callback) {
    Post
        .find({postbody: new RegExp(q + '.*', 'i')},'posttitle') //通过正则 模糊查询
        .exec(function (err, posts) {
            callback(err,posts);
        })
};

exports.searchTag = function (q,callback) {
    Tag
        .find({name: new RegExp(q + '.*', 'i')},'name') //通过正则 模糊查询
        .exec(function (err, tags) {
            callback(err,tags);
        })
};

exports.searchUser = function (q,callback) {
    callback(err,null);
};

//详情页 detail page
exports.addpv = function (id,callback) {
    Post.update({_id: id}, {$inc: {pv: 1}},function (err,result) {
        callback(err,result);
    })
};

exports.postdetail = function (id,callback) {
    Post.findOne({_id: id},'-abstract')
            .populate('userId', 'profile.name')
            .populate('tags', 'name -_id')
            .exec(function (err, post) {
                // console.log(err+'post'+post);
                callback(err,post);
            })
};

exports.postAlldetail = function (id,callback) {
    Post.findOne({_id: id})
        .populate('userId', 'profile.name')
        .populate('tags', 'name -_id')
        .exec(function (err, post) {
            // console.log(err+'post'+post);
            callback(err,post);
        })
};
//获取评论
exports.getcomments = function (postid,callback) {
    Comment
            .find({post: postid},'-updateAt')
            .sort('-updateAt')
            // .limit(5)
            .populate('from', 'profile.name profile.picture')
            .populate('reply.from reply.to', 'profile.name profile.picture')
            .exec(function (err, comments) {
                callback(err,comments);
            })
};

exports.getRootComments = function (postid,callback) {
    Comment
            .find({post: postid},'-updateAt')
            .sort('-updateAt')
            // .limit(5)
            .populate('from', 'profile.name profile.picture')
            .exec(function (err, comments) {
                callback(err,comments);
            })
};

//添加评论
exports.addComment = function (postid,number,callback) {
    Post.update({_id: postid}, {$inc: {comment_count: number},$set:{updateAt:Date.now()}},callback)
};


//通过tagid获取 帖子 一类
exports.getPostsByTag = function (tagid,callback) {
    Post
        .find({'tags':tagid},"-postbody")
        .populate('userId','profile.name')
        .populate('tags','name')
        .exec(function (err,tag_posts) {
            callback(err,tag_posts);
        })
};

exports.getPostByColumn = function (columnId,callback) {
  Post.
      find({'column':columnId},"-postbody")
      .populate('userid','profile.name')
      .populate('tags','name')
      .exec(function (err,column_post) {
          callback(err,column_post);
      })
};



exports.getTagIdByName = function (tagname,callback) {
    // posttitle: new RegExp(q + '.*', 'i')
    Tag.findOne({name:tagname},function (err,tagid) {
        callback(err,tagid);
    })
};

exports.crazy = function (number,callback) {
    Post.find( {"$where" :  "this.genius_count < this.crazy_count" },'-postbody',callback);
};

exports.genius = function (number,callback) {
    Post.find( {"$where" :  "this.genius_count > this.crazy_count" },callback);
};

exports.savePost = function (post,callback) {
    var post_new = new Post(post);
    post_new.save(function (err, post) {
       callback(err,post);
    })
};

exports.saveTag = function (tagName,callback) {
    Tag.findOne({name:tagName}, function (err,tag) {
        if(tag){
                callback(err,tag);
        }
        else{
            var tag_new = Tag({
                name: tagName
            });
            tag_new.save(function (err, tag) {
                    callback(err,tag);
            })
        }
    })
};

exports.getTags = function (number,callback) {
    Tag.find({},'name',{limit:number},function (err,tags) {
        callback(err,tags);
    })
};

exports.insertTag = function (postid,tagid,callback) {
    Post.update({_id:postid}, {$addToSet:{tags:tagid}} ,function (err,number) {
        callback(err,number);
    })
};

exports.deleteTag = function (tagid,callback) {
    Tag.remove({_id:tagid},function (err,number) {
        callback(err,number);
    })
};

exports.collectPost = function (userid,postid,callback) {
    Collection.update({userid:userid},{$addToSet:{postid:postid}},function (err,result) {
        callback(err,result);
    })
};

exports.getPostNameById = function (postid,callback) {
};

exports.addEvaluate = function (evaluate,callback) {
    var Evaluate_new = new Evaluate(evaluate);
    Evaluate_new.save(function (err, evaluate) {
        callback(err,evaluate);
    })
};
//检查是否存在evaluate集合中是否存在post
exports.checkEvaluatePost = function (postid,callback) {
    Evaluate.findOne({postid:postid},function (err,postid) {
       callback(err,postid);
    })
};
//喜欢帖子
exports.likePost = function (userid,postid,callback) {
    Evaluate.update({postid:postid}, {$addToSet:{like:userid}} ,function (err,number) {
        callback(err,number.nModified);
    });
};
//取消喜欢
exports.dislikePost = function (userid,postid,callback) {
    Evaluate.update({postid:postid}, {$pull:{like:userid}} ,function (err,number) {
        callback(err,number.nModified);
    });
};
//对postlike数修改
exports.addLike = function (postid,number,callback) {
    Post.update({_id: postid}, {$inc: {like_count: number}},function (err,number) {
        callback(err,number.nModified);
    })
};

//判断是否已经投票为天才 ????检查有问题
exports.checkGeniusUser = function (userid,postid,callback) {
  Evaluate

          .findOne({postid:postid,genius:userid},'_id')
          // .where(userid).in(['57175801bfa44fc81c155d72'])
          .exec(function (err,result) {
              callback(err,result);
          })
};
exports.checkCrazyUser = function (userid,postid,callback) {
    Evaluate.findOne({postid:postid,crazy:userid},'_id')
            .exec(function (err,result) {
                callback(err,result);
            })
};
//天才判断
exports.geniusPost = function (userid,postid,callback) {
    Evaluate.update({postid:postid}, {$addToSet:{genius:userid}} ,function (err,number) {
        callback(err,number.nModified);
    });
};
//取消天才判断
exports.noGeniusPost = function (userid,postid,callback) {
    Evaluate.update({postid:postid}, {$pull:{genius:userid}} ,function (err,number) {
        callback(err,number.nModified);
    });
};
//帖子天才数目修改
exports.addGenius = function (postid,number,callback) {
    Post.update({_id: postid}, {$inc: {genius_count: number}},function (err,number) {
        callback(err,number.nModified);
    })
};
//疯子判断
exports.crazyPost = function (userid,postid,callback) {
    Evaluate.update({postid:postid}, {$addToSet:{crazy:userid}} ,function (err,number) {
        callback(err,number.nModified);
    });
};
//取消天才判断
exports.noCrazyPost = function (userid,postid,callback) {
    Evaluate.update({postid:postid}, {$pull:{crazy:userid}} ,function (err,number) {
        callback(err,number.nModified);
    });
};
//帖子疯子判断数目修改
exports.addCrazy = function (postid,number,callback) {
    Post.update({_id: postid}, {$inc: {crazy_count: number}},function (err,number) {
        callback(err,number.nModified);
    })
};


exports.getPostAuthor = function (postid,callback) {
    Post.findOne({_id:postid},'userId')
        .populate('userId','_id')
        .exec(function (err,userid) {
            if(err){
                console.log(err);
            }
            callback(err,userid);
        })
};


exports.updatePostTitle = function (postid,data,callback) {
    Post.update({_id:postid},{$set:{posttitle:data}},function (err,number) {
       return callback(err,number.nModified);
    })
};

exports.updatePostbody = function (postid,data,callback) {
    Post.findOne({_id:postid},function (err,post) {
        data = post.postbody+data;
        post.update({$set:{postbody:data}},function (err,number) {
            return callback(err,number.nModified);
        })
    });
    // Post.findOneAndUpdate({_id:postid},{$set:{postbody:this.postbody+data}},function (err,number) {
    //     callback(err,number.nModified);
    // })
};

exports.updateAbstract = function (postid,data,callback) {
    Post.update({_id:postid},{$set:{abstract:data}},function (err,number) {
        return callback(err,number.nModified);
    })
};

exports.test = function (cb) {
    Comment.find({},function (err,reslut) {
        if(err){
            console.log(err);
        }
        cb(err,reslut);
    });

};