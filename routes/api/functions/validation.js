


const { body, validationResult } = require("express-validator")

const checkInputNumeric = (input, message) =>
	body(input)
		.notEmpty()
		.withMessage(message)
		.isNumeric()
		.withMessage("Must contains only number")

const checkInput = (input, message) => 
	body(input, message)
		.isLength({min: 3, max: 70})
			
const requiresInput = [
	checkInput("title", "Please include a valid title"),
	checkInput("author", "Please include a valid author"),
	checkInput ("language", "Please include a language"),
	checkInputNumeric("yearOfPublication", "Please include a year of publication"),
	checkInputNumeric("pages", "Please include numbers of pages"),		
]
const errorsInput = (req) => validationResult(req)

const isMissingRequiredInformations =  (req) => !errorsInput(req).isEmpty()

const response = (res, httpCode, message) =>res.status(httpCode).json({ errors: message })
const potentialErrors = (res, req) => response(res, 400,  errorsInput(req).array() )


module.exports = { requiresInput, isMissingRequiredInformations, potentialErrors, response }