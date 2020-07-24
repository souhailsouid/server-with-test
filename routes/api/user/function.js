
const {  check, validationResult } = require("express-validator")

			
const requiresInput = [
	check("name", "Le nom est requis!")
		.not().isEmpty(),
	check("email", "Veuillez soumettre une adresse email valide!")
		.isEmail(),
	check("password","Le mots de passe doit contenir au moins 6 caractères!")
		.isLength({ min: 6 })	
]
const errorsInput = (req) => validationResult(req)
module.exports = { requiresInput, errorsInput }