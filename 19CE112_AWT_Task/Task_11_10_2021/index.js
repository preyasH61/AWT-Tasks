/*
download dependencies which is require and mention in package.json 
*/
const express = require("express");
const bcrypt = require('bcrypt');
const cookiepars = require("cookie-parser");
const session = require("express-session");
var app = express();
//call db
var User = require("./model/User")
app.use(express.urlencoded({
    extended: true
}))
app.use(cookiepars())
app.use(session({
    key: "user_id",
    secret: "secure",
    resave: false,
    saveUninitialized: false,
    cookie: {
        express: 50000
    }
}))
var sessioncheck = (req, res, next) => {
    if (req.session.user && req.cookies.user_id) {
        res.redirect("/home")
    } else {
        next()
    }
}
app.get('/', sessioncheck, (req, res) => {
    res.redirect("/login")
})
app.route("/login")
    .get(sessioncheck, (req, res) => {
        res.sendFile(__dirname + "/public/login.html")
    })
    .post(async (req, res) => {
        var username = "Preyash",
            password = "12sda6553213"
            hashpassword = bcrypt.genSalt(saltvlaue, (err, salt) => {
                bcrypt.hash(this.password, salt, (err, hash) => {
                });
            });
        try {
            var user = await User.findOne({ username: username }).exec();
            user.comparePassword(hashpassword, (error, match) => {
                if (!match) {
                    console.log("pass not matched");
                }
            })
            console.log("pass matched");
            req.session.use = user;
        } catch (error) {
            console.log(error);
        }


    })
app.route("/singup")
    .post((req, res) => {
        var user = new User({
            username: "Preyash",
            password: "12sda6553213"
        })
        user.save((err, doc) => {
            if (err) {
                console.log(err);
            } else {
                req.session.user = doc
                console.log("success")
            }
        })
    })
app.route("/home")
    .get(sessioncheck, (req, res) => {
        if (req.session.user && req.cookies.user_id) {
            res.sendFile(__dirname + "/public/home.html")
        } else {
            res.redirect("/login")
        }

    })
app.get("/logout", (req, res) => {
    if (req.session.user && req.cookies.user_id) {
        res.clearCookie("uer_id")
        res.redirect("/")
    } else {
        res.redirect("/login")
    }
})
app.set('port', 8000)
app.listen(app.get('port'), () => console.log(`run successfully`));
