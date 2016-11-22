'use strict';
var express = require('express');
var timeout = require('connect-timeout');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var todos = require('./routes/todos');
var AV = require('leanengine');
var weather = require('./weather');

var app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// 设置默认超时时间
app.use(timeout('15s'));

// 加载云函数定义
require('./cloud');
// 加载云引擎中间件
app.use(AV.express());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.get('/', function(req, res) {
    res.render('index', {
        currentTime: new Date()
    });
});

/**
* get the weather info .
* @type 查询类型　base 实时　all 一周天气预测
**/
app.get('/getWeather', function(req, res) {
    // var ip = URL.parse(req.url, true).query.ip;
    // 	if(ip){	//有参数请求
    var ip = ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    var type = req.query.type;
    if(!type){
      type='base';
    };
    weather.getIpInfo(ip, function(cityinfo) {
        var cityid = '320500'; //weather.getCityId(cityinfo[0], cityinfo[1]);
        weather.getWeatherInfo(cityid, type, function(weatherinfo) {
            res.writeHead(200, {
                "Content-Type": "text/html;charset:utf-8"
            });
            res.write(JSON.stringify(weatherinfo));
            res.end();
        });
    });
    console.log(ip);
});
// TODO: insert an product
/**
@image 照片
@score 评分： 0 - 10分
@weather 天气温度+ 0°~ 20°
**/
app.get('/saveWear',function(req , res ){
  var score = req.query.score;
  var weather = req.query.weather;
  var image = req.query.image;
  if(!image){
    image = '';
  }

  var Wear = AV.Object.extend('wears');
  var AVFile = AV.Object.extend('_File');

  var wear = new Wear();
  wear.set('image',new AV.File('ProductPic',image);
  wear.set('score',score);
  wear.set('weather',weather);

  wear.save().then(function(wear){
    //success
    console.log("save wave success ! ");
    res.writeHead(200, {
        "Content-Type": "text/html;charset:utf-8"
    });
    res.write(JSON.stringify(wear.toString()));
    res.end();
  },function(error){
    //some error occur .
    console.log("save wave failed #$$$$@@@@@----^^^^^^ ! ");
    res.write('error @');
    res.end();
  });
});
// 可以将一类的路由单独保存在一个文件中
app.use('/todos', todos);

app.use(function(req, res, next) {
    // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器
    if (!res.headersSent) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

// error handlers
app.use(function(err, req, res, next) { // jshint ignore:line
    if (req.timedout && req.headers.upgrade === 'websocket') {
        // 忽略 websocket 的超时
        return;
    }

    var statusCode = err.status || 500;
    if (statusCode === 500) {
        console.error(err.stack || err);
    }
    if (req.timedout) {
        console.error('请求超时: url=%s, timeout=%d, 请确认方法执行耗时很长，或没有正确的 response 回调。', req.originalUrl, err.timeout);
    }
    res.status(statusCode);
    // 默认不输出异常详情
    var error = {}
    if (app.get('env') === 'development') {
        // 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
        error = err;
    }
    res.render('error', {
        message: err.message,
        error: error
    });
});

module.exports = app;
