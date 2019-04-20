// Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define user model
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	groupCode: {
		type: String,
		required: true
	},
	budget: {
		type: Number,
		required: false
	},
	date: {
		type: Date,
		default: Date.now
	}
});

// Export model
module.exports = User = mongoose.model("users", UserSchema);
