const Redis = require("Redis");

const Content = require("../models/content");
const isDocumentExist = require("../middleware/error-handling/document-exists");

const redisCline = Redis.createClient();

exports.getContent = async (req, res, next) => {
	await redisCline.connect();
	const content = await Content.find();
	isDocumentExist(content);
	const currentUser = await redisCline.get("user");
	const token = await redisCline.get("token");
	await redisCline.quit();
	res.status(200).json({
		message: "Content Fetched!",
		content,
		currentUser,
		token,
	});
};

exports.postAddContent = async (req, res, next) => {
	const content = new Content(req.body.content);
	await content.save();

	res.status(200).json({ message: "Content created!", content });
};
