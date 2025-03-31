 require('dotenv').config();

 const express = require('express')
 const expressLayout = require('express-ejs-layouts')
 const methodOverride = require('method-override')
 const cookieParser = require('cookie-parser')
 const session = require('express-session')
 const MongoStore = require('connect-mongo')

 const connectDB = require('./server/config/db')
 const {isActiveRoute} = require('./server/helpers/routeHelpers')

 const app = express();
 const PORT = 3000 || process.env.PORT;

  //Connect to DB
  connectDB();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(methodOverride('_method'))

  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      crypto: {
        secret: process.env.SESSION_SECRET
      }
    }),
    cookie: {
      maxAge: 1000 * 60 * 60
    }
  }));
  

  app.use(express.static('public'));

 // Templating Engin
 app.use(expressLayout);
 app.set('layout', './layouts/main');
 app.set('view engine', 'ejs');

 app.locals.isActiveRoute = isActiveRoute;


 app.use('/', require('./server/routes/main'))
 app.use('/', require('./server/routes/admin'))

 app.listen(PORT, ()=> {
  console.log(`App listening on port ${PORT}`)
 })