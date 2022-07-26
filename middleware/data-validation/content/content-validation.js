const Joi = require("joi");
const ExpressError = require("../../error-handling/ExpressError");
const Content = require("../../../models/content");

exports.contentDataValidation = (req, res, next) => {
	const contentSchema = Joi.object({
		content: Joi.object({
			textBody: Joi.string().min(10).required().label("Content"),
			likes: Joi.number().min(0).required().label("Likes"),
		}),
	});
	const { error } = contentSchema.validate(req.body);
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
