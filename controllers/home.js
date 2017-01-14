/**
 * GET /
 * Home page.
 */


var Async = require('async');

var PostPro = require('../proxy/post');

var Column = require('../proxy/column');


exports.test = function (req,res) {
    res.render('test', {
                title: 'test'
            });
};

exports.index = function(req, res) {
    var deviceAgent = req.headers["user-agent"].toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    if(agentID){
        Async.parallel({
            latest: function (cb) {
                PostPro.getlatestpost(6,function (err,latest) {
                    cb(err,latest);
                });
            },
            colunm: function (cb) {
                Column.getColumn(function (err,column) {
                    cb(err,column);
                })
            }
        },function(err,results){
            res.render('home_phone', {
                title: '脑洞网-手机',
                latest:results.latest,
                column:results.colunm
            });
        })
    }else{
        Async.parallel({
            latest: function (cb) {
                PostPro.getlatestpost(6,function (err,latest) {
                    cb(err,latest);
                });
            },
            colunm: function (cb) {
                Column.getColumn(function (err,column) {
                    cb(err,column);
                })
            }

        },function(err,results){
            res.render('home', {
                title: '脑洞网-电脑',
                latest:results.latest,
                column:results.colunm
            });
        })
    }


};

exports.ajax_getpost = function (req,res) {
    var type = req.query.type;
    var number = Number(req.query.number);

    if(type=='mostview'){
        PostPro.ajax_mostview(number,function (err,mostview) {
            res.json({data: mostview, code:0,msg: "success"});
        });
    }
    if(type=='mostlike'){
        PostPro.ajax_mostlike(number,function (err,like) {
            res.json({data: like, code:0,msg: "success"});
        })
    }
    else return 'no type';
};

exports.ajax_getpostbody = function (req,res) {
    var postid = req.query.postid;
    var ifComment = req.query.comment;
    PostPro.ajax_getpostbody(postid,function (err,postbody) {
        if(err){
            res.json({err:err});
        }

        else{
            if(ifComment=="yes"){
                PostPro.getRootComments(postid,function (err,comments) {
                    res.json({postbody:postbody.postbody,comments:comments});
                })
            }
            else{
                res.json({postbody:postbody.postbody});
            }
        }
    })
    
};

exports.search = function (req, res) {
    var q = req.query.q.trim();
    var page = parseInt(req.query.p) || 0 ;//默认0
    var count = 10;
    var index = page * count;
    if(!q){
        req.flash('info',{"msg":"还未输入搜索项"});
        return res.redirect('back');
    }

    Async.parallel({
        posttitle:function (cb) {
            PostPro.searchPosttitle(q,function (err,post) {
                cb(err,post)
            })
        },
        tag:function (cb) {
            PostPro.searchTag(q,function (err,tags) {
                cb(err,tags);
            })
        },
        postbody:function (cb) {
            PostPro.searchPostbody(q,function (err,post) {
                cb(err,post);
            })
        }
    },
    function (err,result) {
        res.render('result', {
            title: ' 结果列表页',
            keyword: q,
            posttitle:result.posttitle,
            postbody: result.postbody,
            tags:result.tag
        })
    });



    // Post
    // //.find({title:q}) //完全匹配
    //     .find({posttitle: new RegExp(q + '.*', 'i')}) //通过正则 模糊查询
    //     .exec(function (err, posts) {
    //         if (err) {
    //             console.log(err)
    //         }
    //         var result = posts.slice(index, index + count)
    //
    //         res.render('result', {
    //             title: ' 结果列表页',
    //             keyword: q,
    //             posts:result,
    //             currentPage: ( page + 1 ),
    //             totalPage: Math.ceil(posts.length / count)
    //             //query: 'cat=' + catId,
    //         })
    //     })
};


exports.nopage = function (req,res) {
    res.render('404',{
        title:'404'
    })
};