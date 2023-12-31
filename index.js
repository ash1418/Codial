const express= require('express');
const cookieParser = require('cookie-parser');
const app= express();
const port= 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);   //session is the argument 
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


app.use(sassMiddleware({
  src: './assets/scss',
  dest: './assets/css',
  debug: true,
  outputStyle: 'extended',
  prefix: '/css'
}))


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);

//extrct styles and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine', 'ejs');
app.set('views', './views');

//mongostore is used to store the session in mongo db
app.use(session({
  name : 'codial',
  //todo chnage the secret before deployment in production mode
  secret : 'blahsmthng',
  saveUninitialised : false,  
  resave : false,  
  cookie: {
    maxAge: (1000 * 60 * 100)
  },

  store: new MongoStore({
     
       mongooseConnection: db,
       autoRemove: 'disabled'
     },
     function(err){
      console.log(err || 'connect-mongodb setup ok'); 
     }
  )
  
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);

app.use(flash());  
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
if(err){
    console.log(`error: ${err}`);
}
console.log(`server is running on port: ${port}`);

});
