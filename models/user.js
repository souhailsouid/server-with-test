
const mongoose = require("mongoose")
const currentTime = require("./function")

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	createdAt: { type: Date, default: Date.now },
})
// Sets the createdAt parameter equal to the current time
currentTime(userSchema)
//Creating the collection Address
const User= mongoose.model("User", userSchema)

module.exports = User