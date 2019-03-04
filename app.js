var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose');
var keys = require('./config/keys');
const cookieSession=require("cookie-session")
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var upCyclersRouter = require('./routes/Upcyclers/upcyclers');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var oneUpcyclerRouter = require('./routes/Upcyclers/oneUpcycler');
var passport=require("passport")
var passportSetup=require('./config/passport-setup');

// test connect to mongoDB
// mongoose.connect(keys.mongodb.dbURI,()=>{
//   console.log("connected to dbtest")
// })

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(keys.session.cookieKey,{signed:true}));
app.use(cookieSession({
  maxAge:24*60*60*1000,
  keys:[keys.session.cookieKey]
}))
app.use(express.static(path.join(__dirname, 'public')));



app.use(passport.initialize());
app.use(passport.session())
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/upcyclers', upCyclersRouter);
app.use('/upcycler', oneUpcyclerRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

mongoose.connect('mongodb://localhost:27017/abstma', {useNewUrlParser: true})
.then((db) => {console.log('MongodDB Connectet to ABSTMA Database')
})
.catch(err => console.log(`An error was encountered, details: ${err}`));

module.exports = app;
