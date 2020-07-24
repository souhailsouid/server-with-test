
const mongoose = require("mongoose")
const currentTime = require("./function")
const bookSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	language: {
		type: String,
		required: true
	},
	yearOfPublication: {
		type: String,
		required: true
	},
	pages: {
		type: String, required: true, min: 1
	},
	createdAt: { type: Date, default: Date.now },
})
// Sets the createdAt parameter equal to the current time
currentTime(bookSchema)
//Creating the collection Address
const Book = mongoose.model("Book", bookSchema)
module.exports = Book