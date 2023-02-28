// Express.js app to configure session management with connect-mongo
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

// Configure session management with connect-mongo
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

// Initialize Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());