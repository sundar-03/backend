const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('./models/User');

// Register
router.post('/register', function(req, res) { 
      
    const newUser=new User({name: req.body.name, username: req.body.username, email:req.body.email, college: req.body.college, department: req.body.dept, mobile: req.body.mobile}); 
  
          User.register(newUser, req.body.password, function(err, user) { 
            if (err) { 
                logger.error(err)
              res.status(400).json({success:false, message: err.message})  
            }else{ 
              res.status(201).json({success: true, message: "Registration successful"}) 
            } 
          }); 
}); 
        

// Login
router.post('/login', (req, res) => {
 
        if(!req.body.username){ 
            res.status(400).json({success: false, message: "Username missing"}) 
        } else { 
            if(!req.body.password){ 
            res.status(400).json({success: false, message: "Password missing"}) 
            }else{ 
            passport.authenticate('local', function (err, user, info) { 
                if(err){ 
                res.status(500).json({success: false, message: err.message}) 
                } else{ 
                if (! user) { 
                    res.status(401).json({success: false, message: 'Username or password incorrect'}) 
                } else{ 
                    req.login(user, function(err){ 
                    if(err){ 
                        res.status(500).json({success: false, message: err.message}) 
                    }else{ 
                        const token = jwt.sign({userId : user._id, 
                        username:user.username}, process.env.JWT_TOKEN, 
                            {expiresIn: '24h'}) 
                        res.status(200).json({success:true, message:"Authentication successful", token: token }); 
                    } 
                    }) 
                } 
                } 
            })(req, res); 
            } 
        } 
        
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;