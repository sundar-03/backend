const jwt = require('jsonwebtoken');

const middlewareObj = {
	isLoggedIn: (req, res, next) => {
		if (req.isAuthenticated()) {
			return next();
		}
		return res.json({
			success: false,
			message: 'You need to logged In to do that.',
		});
	},
	isEligibleForTokenRegeneration: (req, res, next) => {
		(async function () {
			try {
				if (req.user.is_verified === false) {
					jwt.verify(
						req.user.verification_token,
						process.env.REGISTER_SECRET,
						(err) => {
							if (err) {
								return next();
							}
							throw new Error();
						}
					);
				} else {
					res.json({
						success: false,
						message: 'User is already verified',
					});
				}
			} catch (err) {
				res.json({
					success: false,
					message:
						'The previous token is still valid, please activate using that.',
				});
			}
		})();
	},
};

module.exports = middlewareObj;
