const express = require("express")
const router = express.Router()

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")

const { requiresInput } = require("./user/function")
const User = require("../../models/user")
const {response , isMissingRequiredInformations,potentialErrors } = require("./functions/validation")

const UserExistResponse = (res) => response(res, 409, [{ notification: "Un utilisateur avec cette adresse email est déjà existant" }] )
const salt =   bcrypt.genSalt(10)
async function hashPassword  (password, salt) {
	return 	bcrypt.hash(password,  await salt)
}
function findUserByEmail  (email)  { return  User.findOne({ email })}
const createUserResponse = "L'utilisateur à été crée avec succès"
// @route    POST api/users
// @desc     Register user
// @access   Public
router.post("/",requiresInput, 
	async (req, res) => {
		if (isMissingRequiredInformations(req)) {
			return potentialErrors(res, req)
		}

		const { name, email, password } =  req.body
		try {
			
			let user = await findUserByEmail(email)
			if (user) {
				return UserExistResponse (res)
			}
			user = new User({
				name,
				email,
				password
			})

			user.password =  await hashPassword(password,  salt)

			await user.save()

			const payload = {
				user: {
					id: user.id,
					password: user.password,
					email: user.email,
					name: user.name
				}
			}
			
			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err
					res.json({  token, createUserResponse, payload })
				}
				
			)	
		} catch (err) {
			console.error(err.message)
			res.status(500).send("Server error")
		}
	}
)

module.exports = router
