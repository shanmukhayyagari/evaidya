require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const Configure = require('./backend/config/Configure');
const dbconnect = require('./backend/lib/dbconnect');
const users = require('./backend/model/user');
const { request } = require('express');




const app = express();



var cookieParser = require("cookie-parser")
var session = require("express-session");
const MongoStore = require('connect-mongo');



dbconnect.moongoseconnect();

app.use(session({
    secret: "thi is secret!!!!",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000
    },
    store: MongoStore.create({ mongoUrl: process.env.MONGO_CONNECTION_STRING })

}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/frontend"));

app.use(cookieParser());
app.post('/api/login', function(req, res) {
    users.find(req.body, function(err, data) {
        if (err) { res.status(400).json({ msg: "Failed" }); } else if (data.length == 1) {
            req.session.userid = data[0]._id
            req.session.username = data[0].username
            console.log(req.session)
            res.redirect("/");

        } else {

            res.redirect("/login");

        }
    });
})
var isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userid)
        next();
    else
        return res.redirect("/login");
}
var isNotAuthenticated = (req, res, next) => {
    if (!req.session || !req.session.userid)
        next();
    else
        return res.redirect("/");
}

app.get("/", isAuthenticated, (req, res) => {
    res.sendFile(__dirname + "/frontend/html/home.html")
})

app.get("/getdetails", isAuthenticated, (req, res) => {
    res.json({
        username: req.session.username
    });
})

app.get("/api/logout", isAuthenticated, (req, res) => {
    req.session.destroy(err => {
        if (err)
            return res.status(404).json({
                err: "error"
            })
    })

    return res.status(200).json({
        message: "succcessfully signout"
    })

})



app.post('/api/register', function(req, res) {
    users.find({ email: req.body.email }, function(err, data) {
        if (err) { res.status(400).json({ msg: "Failed" }); } else { //console.log(data);
            if (data.length > 0)
                res.status(200).json({ msg: "Saved Successful", result: data });
            else {

                var add = new users(req.body);
                add.save(function(err, record) {
                    if (err) {
                        res.redirect("/register");
                    } else {
                        res.redirect("/login");
                    }
                });
            }
        }
    });
})




app.get('/login', isNotAuthenticated, function(req, res) {
    let fullFilePath = __dirname + "/frontend/html/login.html";
    res.sendFile(fullFilePath);

});
app.get('/register', isNotAuthenticated, function(req, res) {
    let fullFilePath = __dirname + "/frontend/html/register.html";
    res.sendFile(fullFilePath);

});

app.get('/sample', function(req, res) {
    res.sendFile(__dirname + "/frontend/html/samplepage.html");
});


app.get('/evaidya/frontend/html/about.html', function(req, res) {
    res.sendFile(__dirname + "/frontend/html/about.html");
});

app.get('/evaidya/frontend/html/faq.html', function(req, res) {
    res.sendFile(__dirname + "/frontend/html/faq.html");
});
app.get('/evaidya/frontend/html/login.html', function(req, res) {
    res.sendFile(__dirname + "/frontend/html/login.html");
});



app.get('/dashboard', isAuthenticated, function(req, res) {
    res.send("this is dashboard");

});




app.listen(Configure.webPort, function() {
    console.log("server started");
});