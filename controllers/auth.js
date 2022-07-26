const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Redis = require("redis");

const isDocumentExist = require("../middleware/error-handling/document-exists");
const User = require("../models/user");
const ExpressError = require("../middleware/error-handling/ExpressError");

const redisClint = Redis.createClient();

const DEFAULT_EXPERATION = 3600;

exports.postSignup = async (req, res, next) => {
	const userExists = await User.exists({ username: req.body.username });
	console.log(userExists);
	if (userExists) {
		throw new ExpressError("Username Taken", 500);
	}
	req.body.user.password = await bcrypt.hash(req.body.user.password, 12);
	const user = new User(req.body.user);
	await user.save();

	res.status(201).json({ message: "User created!", user });
};

exports.postLogin = async (req, res, next) => {
	const user = req.body.user;
	const registeredUser = await User.findOne({ username: user.username });

	if (!registeredUser) {
		res.status(401).json({ msg: "Wrong Password or Email" });
	}
	const passwordMatch = await bcrypt.compare(
		user.password,
		registeredUser.password
	);
	if (!passwordMatch) {
		return res.status(401).json({ msg: "Wrong Password or Email" });
	}

	const token = jwt.sign(
		{
			username: registeredUser.username,
			userId: registeredUser._id.toString(),
			country: registeredUser.country,
		},
		"RESTAPIauthenticationusingpassportjs",
		{ expiresIn: "1h" }
	);
	await redisClint.connect();

	redisClint.SETEX("token", DEFAULT_EXPERATION, JSON.stringify(token));
	redisClint.SETEX("user", DEFAULT_EXPERATION, JSON.stringify(user));

	await redisClint.quit();
	res.status(200).json({ token, userId: registeredUser._id.toString() });
};
