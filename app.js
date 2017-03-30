var express = require('express'); // imports framework into app
var path = require('path'); // path is a Node module for working with and handling paths
//var favicon = require('serve-favicon');
var logger = require('morgan'); // Express middleware for logging requests and responses. Can be removed
//var cookieParser = require('cookie-parser'); 
var bodyParser = require('body-parser'); // adds a body object to your request so that you can access POST parameters

// paths to routers
var index = require('./routes/index');
var directory = require('./routes/directory');
var contribute = require('./routes/contribute');
var contact = require('./routes/contact');
var glossary = require('./routes/glossary');
var about = require('./routes/about');
var allstandards = require('./routes/all-standards');
var inventorySearch = require('./routes/inventory-search');
var create = require('./routes/create-standard');
var post = require('./routes/post');

var app = express();
app.use(express.static(path.join(__dirname, 'public'))); // tells app to use the /public directory

// view engine setup
app.set('views', path.join(__dirname, 'views')); // path.join() normalises all the arguments into a path string. _dirname = global and 'views' = file/folder name
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html'); // set the view engine to html

//.use() tells app to use the given parameters

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); // logs the requests to the console
app.use(bodyParser.json()); // gives app the ability to parse JSON
app.use(bodyParser.urlencoded({ extended: false })); // allows app to read data from URLs
// app.use(cookieParser()); // adds cookie object to all requests you get


// create routes from the above paths to the following html pages 
app.use('/index', index); 
app.use('/directory', directory);
app.use('/contribute', contribute);
app.use('/contact', contact);
app.use('/glossary', glossary);
app.use('/about', about);
app.use('/inventory', allstandards);
app.use('/inventory-search', inventorySearch);
app.use('/contribute', create);
app.use('/contribute', post);
app.use('/contact', post);

/*
app.get('/get', function(req, res){
	var val = req.query.search;
 	res.send(val);
});*/

// catch 404 and forward to error handler. 404 error indicates the app ran out of options
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.render('error.jade')
  //res.send("Sorry can't find that!")
  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
