require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./Models/User")
const routes = require("./Routes")
const app = express()

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URL || "mongodb://localhost/shortener", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.use(require("express-session")({
    secret: process.env.SECRET || "This is my super secret",
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 2*60*1000 
    }
}));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("Static"));

app.use(function (req, res,next){
    res.locals.currentUser = req.user;
    next();
})

app.use(routes)

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server up and running on port ${PORT}: http://localhost:${PORT}`);
    }
})