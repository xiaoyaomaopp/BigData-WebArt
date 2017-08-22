var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cronJob = require('cron').CronJob;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var index = require('./routes/index');
var api = require('./routes/api');
var wxapi = require('./routes/wxapi');
var mng = require('./routes/mng');
var fileupload = require('./routes/fileupload');
var dailyService = require('./server/dailyService.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 10 //过期时间设置(单位毫秒)
	}
}));
app.use('/', index);
app.use('/api', api);
app.use('/wxapi', wxapi);
app.use('/mng', mng);
app.use('/upload', fileupload);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

new cronJob('1 0 5 * * *',function(){
    console.log('daily for art job start...');
    dailyService.updateDailyArt().then(res=>{
        console.log(res);
    });
    console.log('daily for art job end...');
},null,true,'Asia/Shanghai');

module.exports = app;
