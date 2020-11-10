const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = require('./router');

const app = express();

mongoose.connect(
	'mongodb://localhost/vortex',
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (!err) {
			console.log('Database connected!');
		}
	}
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use('/', router);

app.listen(5000, () => {
	// eslint-disable-next-line no-console
	console.log('Server Started on Port 5000');
});
