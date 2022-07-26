const Joi = require("joi");
const ExpressError = require("../../error-handling/ExpressError");
const User = require("../../../models/user");

exports.userDataValidation = (req, res, next) => {
	const userSchema = Joi.object({
		user: Joi.object({
			username: Joi.string().min(3).max(30).required().label("Username"),
			password: Joi.string().min(10).required().label("Password"),
			country: Joi.string().min(2).max(57).required().label("Country"),
		}),
	});
	const { error } = userSchema.validate(req.body);
	if (error) {
		const message = error.details.map((el) => el.message).join(",");
		const newMessage = message
			.slice(message.indexOf(".") + 1, message.length)
			.replace(/["]+/g, "");

		throw new ExpressError(newMessage, 422);
	} else {
		next();
	}
};

exports.dataAvailability = async (req, res, next) => {
	const username = await User.findOne({ username: req.body.user.username });
	const email = await User.findOne({ email: req.body.user.email });
	console.log(email, username);
	if (email) {
		throw new ExpressError("Email already exists", 422);
	}
	if (username) {
		throw new ExpressError("Username already exists", 422);
	}
	next();
};
