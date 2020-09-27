const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('./models/User');
const bodyParser = require('body-parser');
/*
router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }))
*/

// Register
router.post('/register', (req, res) => {
    const {
        name,
        email,
        college,
        dept,
        mobile,
        password,
        confirmPassword
    } = req.body;

    console.log("Password : "+ req.body);
    let errors = [];

    User.findOne({
        email: email
    }).then(user => {
        if (user) {
            errors.push({
                msg: 'Email already exists'
            });
            //display error
        } else {
            const newUser = new User({
                name,
                email,
                college,
                dept,
                mobile,
                password,
            });


            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            res.redirect('/login');
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    });

});

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/where?',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;