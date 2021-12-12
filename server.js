require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./Models/User")
const app = express()

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URL || "mongodb://localhost/shortener", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.use(require("express-session")({
    secret: process.env.SECRET || "This is my super secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.use(express.static("Static"));

app.use(require('./routes'))

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server up and running on port ${PORT}: http://localhost:${PORT}`);
    }
})