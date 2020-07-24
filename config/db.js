const mongoose = require("mongoose")
const config = require("config")
const db = config.get("mongoURI")

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		})
  
		console.log("MongoDB  connected with successfull ...")
	} catch (err) {
		console.error(err.message)
		// Exit process with failure
		// eslint-disable-next-line no-undef
		process.exit(1)
	}
}
  
module.exports = connectDB
  