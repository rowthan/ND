/**
 * Created by rowthan on 2016/4/1 0001.
 */
exports.config = {

    dburl:"mongodb://localhost/naodong2",
    dboptions : {
        server: {
            auto_reconnect: true,
            poolSize: 15
        }
    },
    port:80,
    static_res:'public'
};

exports.auth = {
    github:{
        clientID: '6f31b4c682a2d0d237e3a',
        clientSecret: 'aaaf54b221cf15fbda0b5dee307f56813280040ea',

        callbackURL: 'http://182.254.231.162/auth/github/callback'
    }
};

exports.email = {
    auth:{
        user:'****@163.com',
        pass:'*****'
    }
};
exports.qiniuyun ={
    site:"http://7xr4l3.com1.z0.glb.clouddn.com/",
    size:"?imageView2/1/w/50/h/50",

    ACCESS_KEY:'kqEmOTdl0THyuN67EGc_AnliypmTVXmZd3aXGgX9a',
    SECRET_KEY:'Mo_Q8lnt8M_nWEa8swnhuLY5kigLTnnbnCD8OEIFa'
} ;


exports.post ={
    postPic:"http://7xr4l3.com1.z0.glb.clouddn.com/2.png?imageView2/2/w/300/h/150"
};
exports.user ={
    userPic:"http://7xr4l3.com1.z0.glb.clouddn.com/qq.jpg",
    picSize:"?imageView2/1/w/100/h/100"
};