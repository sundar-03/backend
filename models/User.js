const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	college: {
		type: String,
		required: true,
	},
	department: {
		type: String,
		required: true,
	},
	mobile: {
		type: Number,
		required: true,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	verificationToken: {
		type: String,
		default: '',
	},
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
