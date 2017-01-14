/**
 * Module dependencies.
 */
// var _ = require('lodash');
var express = require('express');
var compress = require('compression');//gzip 压缩
var favicon = require('serve-favicon');
// var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var notifier = require('node-notifier');
var lusca = require('lusca');
// var methodOverride = require('method-override');
var dotenv = require('dotenv');
var MongoStore = require('connect-mongo/es5')(session);
var flash = require('express-flash');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var expressValidator = require('express-validator');
// var sass = require('node-sass-middleware');
var multipart = require('connect-multiparty');
var config = require('./config/config').config;
var dburl = config.dburl;
var option = config.dboptions;

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 *
 * Default path: .env (You can remove the path argument entirely, after renaming `.env.example` to `.env`)
 */
dotenv.load({path: '.env.example'});


/**
 * Create Express server.
 */
var app = express();


/*时间格式化中间件*/
app.locals.moment = require('moment');
/**
 * Connect to MongoDB.
 */
mongoose.connect(dburl,option);
mongoose.connection.on('error', function () {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

/**
 * Express configuration.
 */
app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compress());
// app.use(sass({
//     src: path.join(__dirname, 'public'),
//     dest: path.join(__dirname, 'public'),
//     sourceMap: true
// }));
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator()); //验证
// app.use(methodOverride());

// app.use(cookieParser());//不需要也能够实现
app.use(session({
    resave: true,
    name:'nd',//cookiename
    cookie: {maxAge: 60*60*24*1000 },
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({//mongoStore CONNET-COONGO中间件
        url: dburl,
        autoReconnect: true
    })
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(multipart());//中间件 处理文件类型 enctype="multipart/form-data"
app.use(flash());
app.use(function (req, res, next) {
    if (req.path === '/api/upload') {
        next();
    } else {
        lusca.csrf()(req, res, next);//csrf
    }
});


app.use(function (req, res, next) {
    if (/api/i.test(req.path)) {
        req.session.returnTo = req.path;
    }
    next();
});
app.use(express.static(path.join(__dirname, config.static_res), {maxAge: 31557600000}));

app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
require('./config/router')(app);


var env = process.env.NODE_ENV || 'development';
if('development' === env){
    // app.set('showStackError',true);//打印错误信息 express自带
    //app.use(morgan(':method :url :status'))  //打印请求等信息
    app.locals.pretty = true; //配置源文件 格式化 、、查看源代码文件 时 会更具可读性
    mongoose.set('debug',true) //打印数据库请求状态等信息
    app.use(errorHandler({log: errorNotification}));
}

// app.use(errorHandler({ showStack: true, dumpExceptions: true }));
function errorNotification(err, str, req) {
    var title = '错误发生在 ' + req.method + ' ' + req.url;
    notifier.notify({
        title: title,
        message: str
    });
}
/**
 * Start Express server.
 */
app.listen(app.get('port'), function () {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
