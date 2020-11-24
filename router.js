const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const sgMail = require('@sendgrid/mail');
const User = require('./models/User');

require('dotenv').config({ path: './env/.env' });

const { secretKey } = process.env;

const router = express.Router();
const { isLoggedIn, isEligibleForTokenRegeneration } = require('./middleware');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationMail = (email, token, res, successMsg) => {
	const msg = {
		to: email, // Change to your recipient
		from: 'vortex@nitt.edu', // Change to your verified sender
		subject: 'Account verfication',
		html: `
            <strong>Click the button to activate you account</strong>
            <a href="${process.env.DOMAIN}/activate/${token}/">Activate</a>
        `,
	};
	sgMail
		.send(msg)
		.then(() => {
			// console.log('Email sent');
			res.json({ success: true, message: successMsg });
		})
		.catch((err) => {
			throw err;
		});
};

// Register
router.post('/register', (req, res) => {
	(async function () {
		try {
			const {
				username,
				name,
				email,
				college,
				department,
				mobile,
				password,
				confirmPassword,
			} = req.body;
			if (password === confirmPassword) {
				const newUser = new User({
					username,
					name,
					email,
					college,
					department,
					mobile,
				});
				const user = await User.register(newUser, password);
				// console.log(user);
				if (typeof user === 'object' && Object.keys(user) !== 0) {
					// send an account verification email
					const token = jwt.sign(
						{ id: newUser._id },
						process.env.REGISTER_SECRET,
						{ expiresIn: '2d' }
					);
					user.verificationToken = token;
					await user.save();
					const successMsg =
						'Registration successful, Please verify your Email-id by clicking on the link sent to your registerd mail-id.';
					sendVerificationMail(email, token, res, successMsg);
				} else throw user;
			} else {
				res.json({
					success: false,
					message: `Registration failed. Error: `,
					err: {
						message: "Passwords didn't match",
					},
				});
			}
		} catch (err) {
			res.json({
				success: false,
				message: `Registration failed. Error: `,
				err,
			});
		}
	})();
});

// Regenerate Token
router.post(
	'/regenrate-token',
	isLoggedIn,
	isEligibleForTokenRegeneration,
	(req, res) => {
		(async function () {
			try {
				const { user } = req;
				const token = jwt.sign(
					{ id: user._id },
					process.env.REGISTER_SECRET,
					{ expiresIn: '2d' }
				);
				user.verificationToken = token;
				await user.save();
				const successMsg =
					'Please verify your Email-id by clicking on the link sent to your registerd mail-id.';
				sendVerificationMail(req.user.email, token, res, successMsg);
			} catch (err) {
				res.json({
					success: false,
					message: `Registration failed. Error: `,
					err,
				});
			}
		})();
	}
);

// Activate
router.get('/activate/:token', (req, res) => {
	(async function () {
		try {
			// eslint-disable-next-line prefer-destructuring
			const token = req.params.token;
			const decodedToken = await jwt.verify(
				token,
				process.env.REGISTER_SECRET
			);
			if (decodedToken) {
				const { id } = decodedToken;
				const user = await User.findById(id);
				if (typeof user === 'object' && Object.keys(user) !== 0) {
					user.isVerified = true;
					user.verificationToken = '';
					await user.save();
					res.json({
						success: true,
						message:
							'User Verfication successful, Now you can enroll for the events!',
					});
				} else throw user;
			} else throw decodedToken;
		} catch (err) {
			res.json({
				success: false,
				message: 'User Verfication failed',
				err,
			});
		}
	})();
});

// Login
router.post('/login', (req, res) => {
	const { username, password } = req.body;
	if (!username) {
		res.json({ success: false, message: 'Username missing' });
	} else if (!password) {
		res.json({ success: false, message: 'Password missing' });
	} else {
		passport.authenticate('local', function (err, user, _info) {
			if (err) {
				res.json({ success: false, message: 'hi' });
			} else if (!user) {
				res.json({
					success: false,
					message: 'username or password incorrect',
				});
			} else {
				req.login(user, function (err1) {
					if (err1) {
						res.json({ success: false, message: err });
					} else {
						const token = jwt.sign(
							{
								userId: user._id,
								username: user.username,
							},
							secretKey,
							{ expiresIn: '24h' }
						);
						res.json({
							success: true,
							message: 'Authentication successful',
							token,
						});
					}
				});
			}
		})(req, res);
	}
});

// Get list of colleges
let i;
let j;
let jsonObject;
let obj; // declaring necessary variables and unique colleges pressent in college list text
const collegeList = [
	'PSG College of Technology',
	'Coimbatore Institute of Technology',
	'Thiagarajar College of Engineering',
	'Institute of Road and Transport Technology',
	'Indian Institute of Information Technology Design & Manufacturing,Kancheepuram',
	'Indian Institute of Information Technology,Tiruchirappalli',
	'Indian Institute of Technology,Madras',
	'National Institute of Technology,Tiruchirappalli',
	'Alagappa Chettiar College of Engineering and Technology',
	'Government College of Engineering,Bargur',
	'Government College of Technology,Coimbatore',
	'Government College of Engineering,Salem',
	'Government College of Engineering,Tirunelveli',
	'Government College of Engineering,Bodinayakkanur',
	'Government College of Engineering,Dharmapuri',
	'Government College of Engineering,Thanjavur',
	'Government College of Engineering,Srirangam',
	'Thanthai Periyar Government Institute of Technology',
	'Loyola-ICAM College of Engineering and Technology',
	'Kumaraguru College of Technology',
	'KPR Institute of Engineering and Technology',
	'Sri Ramakrishna Engineering College',
	'Karpagam College of Engineering',
	'Sri Krishna College of Engineering & Technology',
	'SNS College of Technology',
	'Dr.Mahalingam College of Engineering and Technology',
	'Tamil Nadu College of Engineering',
	'Velammal College of Engineering and Technology',
	'Kamaraj College of Engineering and Technology',
	'Solamalai College of Engineering',
	'PTR College of Engineering and Technology',
	'Fathima Michael College of Engineering and Technology',
	'Latha Mathavan Engineering College',
	'Ultra College of Engineering and Technology',
	'Vaigai College of Engineering',
	'Kongu Enginnering College',
	'Bannari Amman Institute of Technology',
	'Erode Sengunthar Engineering College',
	'Velalar College of Engineering and Technology',
	'Thangavelu Enginnering College (TEC)',
	'Kings Enginnering College (KEC)',
	'Sri Sivasubramaniya Nadar College of Engineering',
	'Sri Sairam Engineering College',
	'Sri Sairam Institute of Technology',
	'Chennai Institute of Technology',
	'Adhiparasakthi Engineering College',
	'Mohamed Sathak Aj College of Engineering',
	'Arunachala College of Engineering for Women',
	'M.Kumarasamy College of Engineering',
	'Chettinad College of Engineering and Technology',
	'Selvam College of Technology',
	'J.K.K Nattaraja College of Engineering and Technology',
	'Sengunthar Engineering College (Autonomous)',
	'Syed Ammal Enginnering College',
	'AVS Engineering College',
	'Sona College of Technology',
	'Francis Xavier Engineering College',
	'Apollo Engineering College',
	'Prathyusha Engineering College',
	'Saveetha Engineering College',
	'Arulmigu Meenakshi Amman College of Engineering',
	'Anjalai Ammal Mahalingam Engineering College',
	'Vetri Vinayaha College of Engineering and Technology',
];
router.get('/collegeList', async (req, res) => {
	try {
		// getting unique college in database
		User.collection.distinct('college', (error, colleges) => {
			for (i = 0; i < colleges.length; i += 1) {
				for (j = 0; j < collegeList.length; j += 1) {
					if (colleges[i] === collegeList[j]) {
						break;
					}
				}
				if (j === collegeList.length) {
					collegeList.push(colleges[i]);
				}
			}
			jsonObject = '{"collegeList": ["PSG College of Technology"]}';
			obj = JSON.parse(jsonObject);
			for (i = 1; i < collegeList.length; i += 1)
				obj.collegeList.push(collegeList[i]);
			res.status(200).json(obj);
		});
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
});

// Logout
router.get('/logout', isLoggedIn, (req, res) => {
	req.logout();
	res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;
