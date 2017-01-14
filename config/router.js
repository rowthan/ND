/**
 * Created by rowthan on 2016/2/25 0025.
 */
var homeController = require('../controllers/home');
var userController = require('../controllers/user/user');
var postController = require('../controllers/user/post');
var apiController = require('../controllers/api');
var contactController = require('../controllers/contact_byemail');
var suggestController = require('../controllers/suggest');
var commentController = require('../controllers/user/comment.js');
var adminController = require('../controllers/admin/admin');
var passportConf = require('./../middlewares/passportConf.js');
var passport = require('passport');

var public = require('../controllers/public');

var path = require('path');
var multer = require('multer');
var upload = multer({ dest: path.join(__dirname, 'uploads') });

module.exports = function (app) {
    app.use(function(req, res, next) {
        // console.log('每一次路由通过都要格式化 this is app.use by router set session'+JSON.stringify(req.session));
        app.locals.user = req.user;// req.user is passport's instead of req.session.user. res.locals.user 设定后 可以在jade中直接使用user进行判断
        // console.log('the req.user is!!!!!!!!!!!!!!!!!!!!!------------------------------------'+req.user);
        return next();
    });


    app.get('/getuser',public.getUsers);
    app.get('/getpost',public.getPosts);
    app.get('/test',homeController.test);


    app.get('/', userController.setUserNotificationNumber,homeController.index);
    //获取详细信息
    app.get('/userinfo/:token',userController.setUserNotificationNumber,userController.getSingleuserinfo);
    app.post('/sendMessage',passportConf.isAuthenticated,userController.sendMessage);

    app.get('/detail/:token',userController.setUserNotificationNumber,postController.detail);
    app.get('/updatepost/:token',passportConf.isAuthenticated,passportConf.isAuthor,postController.getupdatePost);
    app.post('/updatepost/',passportConf.isAuthenticated,passportConf.isAuthor,postController.updatePost);

    app.post('/comment',passportConf.isAuthenticated,commentController.save);

    app.get('/login', userController.getLogin);
    app.post('/login', userController.postLogin);
    app.get('/logout', userController.logout);
    app.get('/forgot', userController.getForgot);
    app.post('/forgot', userController.postForgot);
    app.get('/signup', userController.getSignup);
    app.post('/signup', userController.postSignup);
    app.get('/reset/:token', userController.getReset);
    app.post('/reset/:token', userController.postReset);

    app.get('/post',passportConf.isAuthenticated,userController.setUserNotificationNumber,postController.post);
    app.post('/post',passportConf.isAuthenticated,postController.save);
    app.post('/post/pic',passportConf.isAuthenticated,postController.savePic);

    //ajax 点赞喜欢收藏
    app.get('/post/like',passportConf.isAuthenticated,postController.like);
    app.get('/post/vote',passportConf.isAuthenticated,postController.vote);
    app.get('/collect',passportConf.isAuthenticated,postController.collect);
    app.get('/comment/agree',commentController.agree);
    app.post('/comment/pic',passportConf.isAuthenticated,commentController.savePic);
    //ajax请求
    app.get('/home/ajax_getpost',homeController.ajax_getpost);
    app.get('/ajax_getpostbody',homeController.ajax_getpostbody);
    


    app.get('/search',homeController.search);

    //分类查看
    app.get('/tagsview',userController.setUserNotificationNumber,postController.tagsview);
    app.get('/crazy',userController.setUserNotificationNumber,postController.crazy);
    app.get('/genius',userController.setUserNotificationNumber,postController.genius);
    
   


    app.get('/account',passportConf.isAuthenticated,userController.getAccount);
    app.get('/account/notifiManage',passportConf.isAuthenticated,userController.getNotifiManage);

    app.get('/deleteNotifi',passportConf.isAuthenticated,userController.deleteNotifi);
    app.get('/deleteSingleNotifi',passportConf.isAuthenticated,userController.deleteSingleNotifi);

    app.get('/account/ajax_getmine',passportConf.isAuthenticated,userController.ajaxGetMine);
    app.get('/account/ajax_clearnotifi',passportConf.isAuthenticated,userController.deleteNotifi);
    app.get('/account/ajax_getnotifi',passportConf.isAuthenticated,userController.getUserNotifis);
    app.get('/account/profile',passportConf.isAuthenticated,userController.getProfile);
    app.post('/account/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
    app.post('/account/pic',passportConf.isAuthenticated,userController.savePic);
    app.post('/account/password', passportConf.isAuthenticated, userController.postUpdatePassword);
    app.post('/account/delete', passportConf.isAuthenticated, userController.postDeleteAccount);
    app.get('/account/unlink/:provider', passportConf.isAuthenticated, userController.getOauthUnlink);
    // app.get('/contact', contactController.getContact);
    // app.post('/contact', contactController.postContact);
    
    app.get('/suggest',userController.setUserNotificationNumber,suggestController.getSuggset);
    app.post('/suggest',suggestController.postSuggest);


    

    app.get('/admin/postlist',passportConf.isAuthenticated,passportConf.isAdmin,adminController.getPosts);
    app.get('/admin/userlist',passportConf.isAuthenticated,passportConf.isAdmin,adminController.getUsers);
    app.get('/admin/taglist',passportConf.isAuthenticated,passportConf.isAdmin,adminController.getTags);
    app.get('/admin/column',passportConf.isAuthenticated,passportConf.isAdmin,adminController.getColumn);
    app.post('/admin/column',passportConf.isAuthenticated,passportConf.isAdmin,adminController.addColumn);

    app.get('/admin/suggest',passportConf.isAuthenticated,passportConf.isAdmin,adminController.getSuggset);
    app.get('/admin/email',passportConf.isAuthenticated,passportConf.isAdmin,adminController.getEmail);
    app.post('/admin/email',passportConf.isAuthenticated,passportConf.isAdmin,adminController.postEmail);
    
    app.get('/admin/deletePost',passportConf.isAuthenticated,passportConf.isAdmin,adminController.deletePost);
    app.get('/admin/deleteTag',passportConf.isAuthenticated,passportConf.isAdmin,adminController.deleteTag);


    app.get('/superadmin/setadmin',passportConf.isSuperAdmin,adminController.setAdmin);
    app.get('/superadmin/canceladmin',passportConf.isSuperAdmin,adminController.cancelAdmin);

    app.get('/admin/setfront',passportConf.isAdmin,adminController.setFront);
    app.get('/admin/cancelfront',passportConf.isAdmin,adminController.cancelFront);
    app.get('/admin/forbid',passportConf.isAdmin,adminController.forbidUser);
    app.get('/admin/permit',passportConf.isAdmin,adminController.permitUser);

    /**
     * API examples routes.
     */
    app.get('/api', apiController.getApi);
    app.get('/api/lastfm', apiController.getLastfm);
    app.get('/api/nyt', apiController.getNewYorkTimes);
    app.get('/api/aviary', apiController.getAviary);
    app.get('/api/steam', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getSteam);
    app.get('/api/stripe', apiController.getStripe);
    app.post('/api/stripe', apiController.postStripe);
    app.get('/api/scraping', apiController.getScraping);
    app.get('/api/twilio', apiController.getTwilio);
    app.post('/api/twilio', apiController.postTwilio);
    app.get('/api/clockwork', apiController.getClockwork);
    app.post('/api/clockwork', apiController.postClockwork);
    app.get('/api/foursquare', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getFoursquare);
    app.get('/api/tumblr', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getTumblr);
    app.get('/api/facebook', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getFacebook);
    app.get('/api/github', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getGithub);
    app.get('/api/twitter', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getTwitter);
    app.post('/api/twitter', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.postTwitter);
    app.get('/api/venmo', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getVenmo);
    app.post('/api/venmo', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.postVenmo);
    app.get('/api/linkedin', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getLinkedin);
    app.get('/api/instagram', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getInstagram);
    app.get('/api/yahoo', apiController.getYahoo);
    app.get('/api/paypal', apiController.getPayPal);
    app.get('/api/paypal/success', apiController.getPayPalSuccess);
    app.get('/api/paypal/cancel', apiController.getPayPalCancel);
    app.get('/api/lob', apiController.getLob);
    app.get('/api/bitgo', apiController.getBitGo);
    app.post('/api/bitgo', apiController.postBitGo);
    app.get('/api/upload', apiController.getFileUpload);
    app.post('/api/upload', upload.single('myFile'), apiController.postFileUpload);//文件上传之后 格式发生改变，，，，需要解决

    /**
     * OAuth authentication routes. (Sign in)
     */
    app.get('/auth/instagram', passport.authenticate('instagram'));
    app.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login' }), function(req, res) {
        res.redirect(req.session.returnTo || '/');
    });
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
        res.redirect(req.session.returnTo || '/');
    });
    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
        res.redirect(req.session.returnTo || '/');
    });
    app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
        res.redirect(req.session.returnTo || '/');
    });
    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
        res.redirect(req.session.returnTo || '/');
    });
    app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), function(req, res) {
        res.redirect(req.session.returnTo || '/');
    });

    /**
     * OAuth authorization routes. (API examples)
     */
    app.get('/auth/foursquare', passport.authorize('foursquare'));
    app.get('/auth/foursquare/callback', passport.authorize('foursquare', { failureRedirect: '/api' }), function(req, res) {
        res.redirect('/api/foursquare');
    });
    app.get('/auth/tumblr', passport.authorize('tumblr'));
    app.get('/auth/tumblr/callback', passport.authorize('tumblr', { failureRedirect: '/api' }), function(req, res) {
        res.redirect('/api/tumblr');
    });
    app.get('/auth/venmo', passport.authorize('venmo', { scope: 'make_payments access_profile access_balance access_email access_phone' }));
    app.get('/auth/venmo/callback', passport.authorize('venmo', { failureRedirect: '/api' }), function(req, res) {
        res.redirect('/api/venmo');
    });
    app.get('/auth/steam', passport.authorize('openid', { state: 'SOME STATE' }));
    app.get('/auth/steam/callback', passport.authorize('openid', { failureRedirect: '/login' }), function(req, res) {
        res.redirect(req.session.returnTo || '/');
    });

    app.get('*',function(req,res){//采用通配符的方式获取404
        // res.send('no page exist')
        res.render('404', {
            title: '页面不存在'
        });
    });
    app.use(function(req, res) {
        // res.status(404).send('页面不存在!');
        res.status(404).render('404', {
            title: '页面不存在404'
        });
    });
    app.use(function(req, res) {//然并卵
        res.status(500).send('发生了错误!');
    });
    app.use(function (req,res) {//并没有什么用！！
        res.status(403).send('资源不可用');
    });
};