const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	password: {
		type: String,
		required: true,
		min: 10,
	},
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
		maxlength: 30,
	},
	country: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 57,
	},
});

module.exports = mongoose.model("User", UserSchema);
