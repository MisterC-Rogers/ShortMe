const express = require('express')
const passport = require("passport")

const ShortenerController = require('../controller/ShortenController')
const AuthController = require('../controller/AuthController')

const routes = new express.Router()

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

routes.get('/', (req, res) => {
    res.render("home")
})

routes.get("/login", AuthController.getLogin);
routes.post("/login", passport.authenticate("local",{
    successRedirect:"/userprofile",
    failureRedirect:"/login"
}), AuthController.login);

routes.get("/register", AuthController.getRegister);
routes.post("/register", AuthController.signup)

routes.get("/userprofile", isLoggedIn, ShortenerController.index)
routes.post('/shortUrls', isLoggedIn, ShortenerController.store)
routes.get('/:shortUrl', ShortenerController.clickedLink)
routes.post('/update/:id', isLoggedIn, ShortenerController.update)
routes.post('/remove/:id', isLoggedIn, ShortenerController.remove)
routes.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");
});


module.exports = routes