const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('./models/User');

const secretKey = 'vortex-csg-2021';


// Register
router.post('/register', function(req, res) { 
      
    const newUser=new User({name: req.body.name, username: req.body.username, email:req.body.email, college: req.body.college, department: req.body.dept, mobile: req.body.mobile}); 
  
          User.register(newUser, req.body.password, function(err, user) { 
            if (err) { 
              res.json({success:false, message:"Registration failed. Error: ", err})  
            }else{ 
              res.json({success: true, message: "Registration successful"}) 
            } 
          }); 
}); 
        

// Login
router.post('/login', (req, res) => {
 
        if(!req.body.username){ 
            res.json({success: false, message: "Username missing"}) 
        } else { 
            if(!req.body.password){ 
            res.json({success: false, message: "Password missing"}) 
            }else{ 
            passport.authenticate('local', function (err, user, info) { 
                if(err){ 
                console.log(err)
                res.json({success: false, message: 'hi'}) 
                } else{ 
                if (! user) { 
                    console.log("username or password incorrect");
                    res.json({success: false, message: 'Username or password incorrect'}) 
                } else{ 
                    req.login(user, function(err){ 
                    if(err){ 
                        console.log("stuck here" + err);
                        
                        res.json({success: false, message: err}) 
                        
                    }else{ 
                        const token = jwt.sign({userId : user._id, 
                        username:user.username}, secretKey, 
                            {expiresIn: '24h'}) 
                        res.json({success:true, message:"Authentication successful", token: token }); 
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