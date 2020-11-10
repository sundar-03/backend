const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('./models/User');
const fs = require('fs')

const router = express.Router();

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

// Get list of colleges
var i,j,Json_object,obj; //declaring necessary variables and unique colleges pressent in college list text
var college_list = ["PSG College of Technology",
"Coimbatore Institute of Technology",
"Thiagarajar College of Engineering",
"Institute of Road and Transport Technology",
"Indian Institute of Information Technology Design & Manufacturing,Kancheepuram",
"Indian Institute of Information Technology,Tiruchirappalli",
"Indian Institute of Technology,Madras",
"National Institute of Technology,Tiruchirappalli",
"Alagappa Chettiar College of Engineering and Technology",
"Government College of Engineering,Bargur",
"Government College of Technology,Coimbatore",
"Government College of Engineering,Salem",
"Government College of Engineering,Tirunelveli",
"Government College of Engineering,Bodinayakkanur",
"Government College of Engineering,Dharmapuri",
"Government College of Engineering,Thanjavur",
"Government College of Engineering,Srirangam",
"Thanthai Periyar Government Institute of Technology",
"Loyola-ICAM College of Engineering and Technology",
"Kumaraguru College of Technology",
"KPR Institute of Engineering and Technology",
"Sri Ramakrishna Engineering College",
"Karpagam College of Engineering",
"Sri Krishna College of Engineering & Technology",
"SNS College of Technology",
"Dr.Mahalingam College of Engineering and Technology",
"Tamil Nadu College of Engineering",
"Velammal College of Engineering and Technology",
"Kamaraj College of Engineering and Technology",
"Solamalai College of Engineering",
"PTR College of Engineering and Technology",
"Fathima Michael College of Engineering and Technology",
"Latha Mathavan Engineering College",
"Ultra College of Engineering and Technology",
"Vaigai College of Engineering",
"Kongu Enginnering College",
"Bannari Amman Institute of Technology",
"Erode Sengunthar Engineering College",
"Velalar College of Engineering and Technology",
"Thangavelu Enginnering College (TEC)",
"Kings Enginnering College (KEC)",
"Sri Sivasubramaniya Nadar College of Engineering",
"Sri Sairam Engineering College",
"Sri Sairam Institute of Technology",
"Chennai Institute of Technology",
"Adhiparasakthi Engineering College",
"Mohamed Sathak Aj College of Engineering",
"Arunachala College of Engineering for Women",
"M.Kumarasamy College of Engineering",
"Chettinad College of Engineering and Technology",
"Selvam College of Technology",
"J.K.K Nattaraja College of Engineering and Technology",
"Sengunthar Engineering College (Autonomous)",
"Syed Ammal Enginnering College",
"AVS Engineering College",
"Sona College of Technology",
"Francis Xavier Engineering College",
"Apollo Engineering College",
"Prathyusha Engineering College",
"Saveetha Engineering College",
"Arulmigu Meenakshi Amman College of Engineering",
"Anjalai Ammal Mahalingam Engineering College",
"Vetri Vinayaha College of Engineering and Technology"];
router.get('/college_list',async (req, res) => {
    try{
          //getting unique college in database
    User.collection.distinct("college",(error,colleges) => {
  for(i=0;i<colleges.length;i++)
  {
	for(j=0;j<college_list.length;j++)
	{
		if(colleges[i]==college_list[j])
		{
			break;
		}
	}
	if(j == college_list.length)
	{
		college_list.push(colleges[i]);
	}
  }
   Json_object = '{"college_list": ["PSG College of Technology"]}';
 obj = JSON.parse(Json_object);
for(i=1;i<college_list.length;i++)
obj['college_list'].push(college_list[i]);
res.status(200).json(obj);
});
    }
    catch(err){
        res.status(500).json({'success': false, 'message': err.message})
    }
})

module.exports = router;
