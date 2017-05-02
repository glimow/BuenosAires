var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var JsonDB = require('node-json-db');
//var restberry = require('./models/models.js');
var metas = new JsonDB("metaDataBase", true, true);

var token = metas.getData("/authentication/token");
//Mongoose config, mongoose is used to speak to the database (MongoDB)
mongoose.Promise = global.Promise;

var authenticate = function (req, res, next) {
	if (req.get("authorization")==token) {
		console.log('Request authenticated');
		next();
	} else {
		console.log('Access Denied')
		res.json({error:{title:"authentification failed",text:"invalid credentials"}});
	}
};


var viewCounter = function (req, res , next){
	next();
	var count = metas.getData("/stats/nb-visites");
	metas.push("/stats/nb-visites", count);
};

//Trying to launch mongodb :
var sys = require('sys')
var exec = require('child_process').exec;
try {
function puts(error, stdout, stderr) { sys.puts(stdout) }
exec("mongod -dbpath ./db > /dev/null", puts);
} catch(err) {console.log("Failed to start mongod daemon, is it already running ? \n Error :", err)}

var index = require('./routes/index');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(viewCounter);

app.use('/', index);
app.use(authenticate);
app.use('/api/v1', api);

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

module.exports = app;
