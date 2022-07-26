const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new Schema({
	textBody: {
		type: String,
		required: true,
	},
	likes: {
		type: Number,
		min: 0,
		default: 0,
	},
});

module.exports = mongoose.model("content", contentSchema);
