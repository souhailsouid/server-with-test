const express = require("express")

const app = express()

const connectDB = require("./config/db")
const cors = require("cors")
const bodyParser = require("body-parser")


// Connect Database
connectDB()

app.use(cors())
// Init Middleware
app.use(express.json({ extended: false }))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Define Routes
app.use("/api/books", require("./routes/api/books"))
app.use("/api/users", require("./routes/api/users"))

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`Server listen on port ${PORT}`))

module.exports = server
