const passport = require("passport")
const User = require("../Models/User")

module.exports = {
    getLogin(req, res) {
        res.render("login")
    },
    getRegister(req,res) {
        res.render("register");
    },
    async login(req, res) {
        
    },
    async signup(req,res) {
        const { first, last, username, email, password } = req.body
        
        User.register(new User({
            first: first,
            last: last,
            username: username,
            email: email
        }), password, (err, user) => {
            if(err){
                console.log(err);
                res.render("register");
            }
            passport.authenticate("local")(req,res,() => {
                res.redirect("/login");
            })    
        })
    },
    async logout(req, res) {
        req.logout();
        res.clearCookie('connect.sid', {
            path: '/'
        });
        req.session.destroy();
        res.redirect('/')
    }
}