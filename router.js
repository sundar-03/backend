const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const sgMail = require('@sendgrid/mail');
const User = require('./models/User');
const CollgeModel = require('./models/college');

require('dotenv').config({ path: './env/.env' });

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
		// eslint-disable-next-line no-unused-vars
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
						res.json({
							success: true,
							message: 'Authentication successful',
						});
					}
				});
			}
		})(req, res);
	}
});

router.get('/college_list', async (req, res) => {
	try {
		const obj = { collegeList: [], listLength: 0 };
		CollgeModel.find({}, (err, colleges) => {
			obj.collegeList = colleges;
			obj.listLength = colleges.length;
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
