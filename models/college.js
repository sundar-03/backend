const mongoose = require('mongoose');

const collegeSchema = mongoose.Schema({
	name: {
		type: String,
	},
});

module.exports = mongoose.model('colleges', collegeSchema);
