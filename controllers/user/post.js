/**
 * Created by rowthan on 2016/2/26 0026.
 */

var Post = require('../../models/Post');
var Tag = require('../../models/Tag');
var Async = require("async");
var PostPro = require('../../proxy/post');
var Notification = require('../../proxy/notification');
var UserPro = require('../../proxy/user');
var Column = require('../../proxy/column');

var moment = require('moment');

var qiniu = require("qiniu");
qiniu.conf.ACCESS_KEY = 'kqEmOTdl0THyuN67EGc_AnliypmTVXmZd3aXGgX9';
qiniu.conf.SECRET_KEY = 'Mo_Q8lnt8M_nWEa8swnhuLY5kigLTnnbnCD8OEIF';

exports.post = function (req, res) {
    Tag.find({}, function (err, tags) {
        Column.getColumn(function (err,colunms) {
            res.render('post', {
                title: 'post',
                tags: tags,
                columns:colunms
            });
        });
       
    })
};

exports.save = function (req, res) {
    var post = req.body.post;
    post.userId = req.user; //之前删除了这一句 导致未能存储userid  /<img src=\"([^\"]*?)\">/gi g全文匹配 i忽略大小写   /<img[^>]+>/i
    var nostyle=post.postbody.replace(/style=.+?"/gi,"");
    post.abstract=nostyle.replace(/<\/?.+?>/gi,"").substr(0,70);//删除所有html标签

    nostyle.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {//是一个循环输出 得到的结果并不是一个数组
        post.postpic = capture;
    });

    // var http = nostyle.match(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi);
    // console.log('http'+http);

    // var img = nostyle.match(/<img.*?(?:>|\/>)/gi);
    // var src = img[0].match(/src=['"]?([^'"]*)['"]?/i)[0];
    // var http=src.replace(/src="/i,"");//匹配结果最后还是有个“h
    // console.log('src is'+http);




    // var img = nostyle.match(/<img.*?(?:>|\/>)/gi)[0];
    // var img =nostyle.replace(/alt=.+?"|width=.+?"|height=.+?"/gi,"").match( /<img[^>]+>/i);//nostyle.match(/<img src="([^"]*)"/gi); alt值可能不存在 所以是*匹配0次货多次
    // console.log('img is'+img);
    // if(img){
    //     // var pic = img.replace(/\?imageView2.+?"/i,"?imageView2/2/w/300/h/150").match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i);
    //     // var url = pic.replace(/src=/i, "");
    //     post.postpic = url;
    // }
    //这一句最理想 但是出现问题保证substr后div标签还成对出现 如果不成对 会导致div匹配问题 格局混乱
    // post.abstract = post.postbody.replace(/<a[^>]+>|<\/a>|style\=".+?"|class\=".+?"|<font[^>]+>|<\/font>|<span[^>]+>|<\/span>|<p[^>]+>|<\/p>/g,"").substr(0,250);//|<font[^>]+>|<\/font>"|color.*"

    // post.abstract = post.postbody.replace(/[^style="]."/g,"").substr(0,250);//有待进一步优化。除br span
    // post.abstract = post.postbody.replace(/<script>[.\n\r]*<\/script>|<style>[.\n\r]*<\/style>/gi, '').replace(/<[^>].*?>/g,"").substr(0,250);
    var tagName = req.body.post.tagName;
    PostPro.savePost(post,function (err,post) {
        if(tagName){
            PostPro.saveTag(tagName,function (err,tag) {
                if(err){
                    console.log(err);
                    req.flash('errors', {msg: '发布失败！'});
                    res.redirect('/post');
                }
                PostPro.insertTag(post._id,tag._id,function (err,number) {
                    console.log('tag'+number.nModified);
                    if(err || !number.nModified){
                        console.log(err);
                        req.flash('success', {msg: '发布成功，！'});
                        res.redirect('/detail/'+post._id);
                    }
                    else{
                        req.flash('success', {msg: '发布成功！'});
                        res.redirect('/detail/'+post._id);
                    }
                });

            })
        }
        else{
            if(err){
                console.log(err);
                req.flash('errors', {msg: '发布失败！'});
                res.redirect('/post');
            }
            else{
                req.flash('success', {msg: '发布成功！'});
                res.redirect('/detail/'+post._id);
            }
        }
    });

};

exports.savePic = function (req, res) {
    console.log('this is save pic in post');

//要上传的空间
    bucket = 'test';
//构建上传策略函数
    function uptoken(bucket, key) {
        var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
        return putPolicy.token();
    }

//要上传文件的本地路径
    filePath = req.files.picture.path;
//上传到七牛后保存的文件名
    var timestamp = Date.now();//时间戳
    var pic = req.files.picture.originalFilename;
    key = pic+timestamp;
//生成上传 Token
    token = uptoken(bucket, key);
//构造上传函数
    function uploadFile(uptoken, key, localFile) {
        var extra = new qiniu.io.PutExtra();
        qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
            if(err){
                res.json({code:-1});
            }
            else{
                res.json({code:1,url:'http://7xr4l3.com1.z0.glb.clouddn.com/'+key});
            }
        });
    }

//调用uploadFile上传
    uploadFile(token, key, filePath);
};

exports.detail = function (req, res) {
    var id = req.params.token;

    var notifiId = req.query.notifiId;
    if(notifiId){
        var userid=req.user._id;
        Notification.deleteSingleNotifi(userid,notifiId,function (err,results) {
        })
    }
    if (id) {
        Async.auto({
            update:function (cb) {//如果不存在id直接在此处就报错 但是如果只修改一位数字 将不能报错，，所以
                PostPro.addpv(id,function (err,result) {
                    cb(err,result)
                });
            },
            tags:function (cb) {
                PostPro.getTags(100,function (err,tags) {
                    cb(err,tags);
                })
            },
            post:function (cb) {
                PostPro.postdetail(id,function (err,post) {
                    if(post){
                        cb(err,post);
                    }
                    else{
                        cb('no post even length is right but update can not check it out when add pv',post);
                    }
                })
            },
            comments:['post',function (cb,results) {
                PostPro.getcomments(results.post._id,function (err,comments) {
                    console.log('postdetail11'+err);
                    cb(err,comments);
                })
            }]

        },function (err,results) {
            if(err){
                console.log(err);
                return res.send('该页面不存在!');
            }
            res.render('detail', {
                title: results.post.posttitle,
                post: results.post,
                comments: results.comments,
                tags: results.tags,
                starttime: Date.now()
            })

          }
        )
    }
    else{
        res.redirect('back');
    }

};

exports.getupdatePost = function (req, res) {
    var id = req.params.token;

    if (id) {
        Async.auto({
                    post:function (cb) {
                        PostPro.postAlldetail(id,function (err,post) {
                            if(post){
                                cb(err,post);
                            }
                            else{
                                cb('no post even length is right but update can not check it out when add pv',post);
                            }
                        })
                    },
                    comments:['post',function (cb,results) {
                        PostPro.getcomments(results.post._id,function (err,comments) {
                            console.log('postdetail11'+err);
                            cb(err,comments);
                        })
                    }]

                },function (err,results) {
                    if(err){
                        console.log(err);
                        return res.send('该页面不存在!');
                    }
                    res.render('updatepost', {
                        title: results.post.posttitle,
                        post: results.post,
                        comments: results.comments
                    })

                }
        )
    }
    else{
        res.redirect('back');
    }

};

exports.updatePost = function (req,res) {
    var postid = req.query.postid;
    var type=req.query.type;
    if(!postid||!type){
        return;
    }
    var data = req.body.data;
    if(type=="title"){
        PostPro.updatePostTitle(postid,data,function (err,result) {
            if(err){
                return null;
            }
            return res.json({update:result});
        });
    }
    if(type=="postbody"){
        var data = moment(Date.now()).format('YYYY/MM-HH:mm')+data;
        PostPro.updatePostbody(postid,data,function (err,result) {
            if(err){
                console.log(err,result);
                return null;
            }
            return res.json({update:result});
        });
    }
    if(type=="abstract"){
        PostPro.updateAbstract(postid,data,function (err,result) {
            if(err){
                console.log(err,result);
                return null;
            }
            return res.json({update:result});
        })
    }


};

exports.like = function (req, res) {
    var id = req.query.postid;
    var user = req.user._id;
    if(!id){
        return null;
    }
    PostPro.checkEvaluatePost(id,function (err,result) {
            if(result){
                PostPro.likePost(user,id,function (err,like) {
                    if(!like){
                        PostPro.dislikePost(user,id,function (err,dislike) {
                            if(err){
                                console.log(err);
                            }
                            if(dislike){
                                PostPro.addLike(id,-1,function (err,result) {
                                    console.log('dislike is '+result);
                                    res.json({dislike:result});
                                })
                            }
                        })
                    }
                    else{
                        PostPro.addLike(id,1,function (err,result) {
                            res.json({like:result});
                        })
                    }
                })
            }
            else{
                var evaluate = {
                    postid:id,
                    like:req.user._id
                };
                PostPro.addEvaluate(evaluate,function (err,result) {
                    if(err){
                        console.log(err);
                    }
                    if(result){
                        PostPro.addLike(id,1,function (err,result) {
                            console.log('the add like rsutl is '+result);
                            if(err){
                                console.log('1'+err);
                            }
                            res.json({like:result});
                        })
                    }
                })
            }
        });
};

exports.vote = function (req, res) {
    var id = req.query.postid;
    var type = req.query.type;
    var user = req.user._id;
    if(id&&user){
        PostPro.checkEvaluatePost(id,function (err,result) {
            if(result) {
                if (type == "genius") {
                    PostPro.checkGeniusUser(user, id, function (err, result) {
                        if (result) {//已经存在
                            res.json({change: 0, inc: 0})
                        }
                        else {
                            PostPro.geniusPost(user, id, function (err, result) {
                                if (result) {//添加成功
                                    PostPro.addGenius(id, 1, function (err, result) {
                                        PostPro.noCrazyPost(user, id, function (err, result) {
                                            if (result) {//减少
                                                PostPro.addCrazy(id, -1, function (err, result) {
                                                    if (result) {
                                                        res.json({change: 1, inc: 1,dec:1})
                                                    }
                                                });
                                            }
                                            else{
                                                res.json({change:1,inc:1,dec:0})
                                            }
                                        });
                                    });
                                }
                                else {//添加失败
                                    res.json({change: 0, inc: 0,false:1})
                                }
                            })
                        }
                    });
                }
                else if (type == "crazy") {
                    PostPro.checkCrazyUser(user, id, function (err, result) {
                        if (result) {//已经存在
                            res.json({change: 0, inc: 0})
                        }
                        else {
                            PostPro.crazyPost(user, id, function (err, result) {
                                if (result) {//添加成功
                                    PostPro.addCrazy(id, 1, function (err, result) {
                                        if (result) {//数量增加成功
                                            PostPro.noGeniusPost(user, id, function (err, result) {
                                                if (result) {//减少
                                                    PostPro.addGenius(id, -1, function (err, result) {
                                                        if (result) {
                                                            res.json({change: 1, inc: 1,dec:1})
                                                        }
                                                    });
                                                }
                                                else{
                                                    res.json({change:1,inc:1,dec:0})
                                                }
                                            });
                                        }
                                    });
                                }
                                else {//添加失败
                                    res.json({change: 0, inc: 0,false:1})
                                }
                            })
                        }
                    });
                }
            }
            else{
                var evaluate = {
                    postid:id
                };
                PostPro.addEvaluate(evaluate,function (err,result) {
                    if(err){
                        console.log(err);
                    }
                    if(result){
                        if(type=="genius"){
                            PostPro.geniusPost(user,id,function (err,result) {
                                if(result){
                                    PostPro.addGenius(id,1,function (err,rsult) {
                                        res.json({change:1,inc:1})
                                    });

                                }
                            })
                        }
                        if(type=="crazy"){
                            PostPro.crazyPost(user,id,function (err,result) {
                                if(result){
                                    PostPro.addCrazy(id,1,function (err,result) {
                                        if(result){
                                            res.json({change:1,inc:1})
                                        }
                                    });
                                }
                            })
                        }
                    }
                })
            }
        });
    }
};

exports.collect = function (req, res) {
    var postid= req.query.postid;

    var userid = req.user._id;
    UserPro.checkUserExistInCollect(userid,function (err,user) {
        if(user){
            PostPro.collectPost(userid,postid,function (err,addAffected) {
                if(err){
                    console.log('there is someting '+err);
                }
                res.json({ 'collect':addAffected.nModified})
            });
        }
        else{
            UserPro.createUserInCollect(userid,function (err,collection) {
                PostPro.collectPost(userid,postid,function (err,addAffected) {
                    res.json({ 'collect':addAffected.nModified})
                })
            });
        }

    });
};

exports.tagsview = function (req,res) {
    var  tag = req.query.tag;
    Async.auto({
                tags:function (cb) {
                    PostPro.getTags(100,function (err,tags) {
                        cb(err,tags);
                    })
                },
                tagid:function(cb){
                    if(!tag){
                        cb(null,null);
                    }
                    else{
                        PostPro.getTagIdByName(tag,function (err,tagid) {
                            if(tagid){
                                cb(err,tagid);
                            }
                            else{
                                cb('no id');
                            }

                        })
                    }
                },
                post:['tagid',function (cb,results) {
                    if(results.tagid){
                        PostPro.getPostsByTag(results.tagid, function (err, tag_posts) {
                            cb(err, tag_posts);
                        })
                    }
                    else{
                        PostPro.getlatestpost(20,function (err,posts) {
                            cb(err,posts);
                        })
                    }
                }]
    },
             function (err,results) {
                 var tagid=1;
                 if(err=='no id'){
                     tagid=0
                 }
                 res.render('tagsview', {
                     title: 'tagsview',
                     tag:tag||'',
                     tags: results.tags,
                     tag_post: results.post,
                     tagid:tagid
                 })

            }
    )
};

exports.crazy = function (req,res) {
    PostPro.crazy(100,function (err,crazy) {
        res.render('crazy',{
            title:'crazy',
            crazy:crazy
        })
    })

};

exports.genius = function (req,res) {
    PostPro.genius(100,function (err,genius) {
        res.render('genius',{
            title:'genius',
            genius:genius
        })
    })
};