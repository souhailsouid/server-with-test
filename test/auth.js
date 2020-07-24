const User = require("../models/user")
//Require the dev-dependencies
const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../server")
const expect = chai.expect

chai.use(chaiHttp)

// Our parent block
describe("Users", () => {
	beforeEach((done) => { 
		User.deleteMany({}, () => {	       
			done() 
		}) 	

	})
	




	/*
  * Test the /GET route
    */

	describe("/POST users", () => {
		it("it should not Create users if name is null || undefined || '", (done) => {
			let user = {
				name: ""|| undefined|| null, 
				email:"mr.souid@live.fr", 
				password: "123456"}
			
			chai.request(server)
				.post("/api/users/")
				.send(user)
				.end((_err, res) => {
					expect(res.status).to.equal(400)
					expect(res.body).to.be.a("object")
					expect(res.body).to.have.property("errors")
					expect(res.body.errors).to.be.a("array")
					expect(res.body.errors[0]).to.have.property("msg")
					expect(res.body.errors[0]).to.have.property("param")
					expect(res.body.errors[0].param).to.equal("name")
					expect(res.body.errors[0].msg).to.equal("Le nom est requis!")
					done()
				})
		})
        
		it("it should not Create users if email is null || undefined || '", (done) => {
			let user = {
				name: "souhail", 
				email:""|| undefined|| null, 
				password: "123456"
			}
                
			chai.request(server)
				.post("/api/users/")
				.send(user)
				.end((_err, res) => {
					expect(res.status).to.equal(400)
					expect(res.body).to.be.a("object")
					expect(res.body).to.have.property("errors")
					expect(res.body.errors).to.be.a("array")
					expect(res.body.errors[0]).to.have.property("msg")
					expect(res.body.errors[0]).to.have.property("param")
					expect(res.body.errors[0].param).to.equal("email")
					expect(res.body.errors[0].msg).to.equal("Veuillez soumettre une adresse email valide!")
					done()
				})            
		})
	})
	it("it should not Create users if password is null || undefined || '", (done) => {
		let user = {
			name: "souhail", 
			email:"mr.souid@live.fr", 
			password: "" || undefined ||null
		}
            
		chai.request(server)
			.post("/api/users/")
			.send(user)
			.end((_err, res) => {
				expect(res.status).to.equal(400)
				expect(res.body).to.be.a("object")
				expect(res.body).to.have.property("errors")
				expect(res.body.errors).to.be.a("array")
				expect(res.body.errors[0]).to.have.property("msg")
				expect(res.body.errors[0]).to.have.property("param")
				expect(res.body.errors[0].param).to.equal("password")
				expect(res.body.errors[0].msg).to.equal("Le mots de passe doit contenir au moins 6 caractères!")
				done()
			})            
    
	})
	it("it should not Create users if password is not contain a minimum of six characters", (done) => {
		let user = {
			name: "souhail", 
			email:"mr.souid@live.fr", 
			password: "sklss"
		}
            
		chai.request(server)
			.post("/api/users/")
			.send(user)
			.end((_err, res) => {
				expect(res.status).to.equal(400)
				expect(res.body).to.be.a("object")
				expect(res.body).to.have.property("errors")
				expect(res.body.errors).to.be.a("array")
				expect(res.body.errors[0]).to.have.property("msg")
				expect(res.body.errors[0]).to.have.property("param")
				expect(res.body.errors[0].param).to.equal("password")
				expect(res.body.errors[0].msg).to.equal("Le mots de passe doit contenir au moins 6 caractères!")
				done()
			})            
    
	})
	it("it should not Create users if email is already in use and send a notification: Un utilisateur avec cette adresse email est déjà existant ", (done) => {
		let CreateUser = new User({
			name: "souhail", 
			email:"mr.souid@live.fr", 
			password: "sklsss"
		})
		let duplicateUser = {
			name: "souhail", 
			email:"mr.souid@live.fr", 
			password: "sklsss"
		}
		CreateUser.save(() =>  {
			chai.request(server)
				.post("/api/users/")
				.send(duplicateUser)
				.end((_err, res) => {
					expect(res.status).to.equal(409)
					expect(res.body).to.be.a("object")
					expect(res.body).to.have.property("errors")
					expect(res.body.errors).to.be.a("array")
					expect(res.body.errors[0]).to.have.property("notification")
					expect(res.body.errors[0].notification).to.equal("Un utilisateur avec cette adresse email est déjà existant")
					done()
				})            
		})
	})
	it("it should  Create users  and send a notification", (done) => {
		let user = {
			name: "souhail", 
			email:"mr.souid@live.fr", 
			password: "sklsss"
		}
		const createUserResponse = "L'utilisateur à été crée avec succès"
		chai.request(server)
			.post("/api/users/")
			.send(user)
			.end((_err, res) => {
				expect(res.status).to.equal(200)
				expect(res.body).to.be.a("object")
				expect(res).to.have.property("body")
				expect(res.body).to.have.property("createUserResponse").to.equal(createUserResponse)
				done()
			})

	})
	it("it should  Create a Token when user was created ", (done) => {
		let user = {
			name: "souhail", 
			email:"mr.souid@live.fr", 
			password: "sklsss"
		}
		chai.request(server)
			.post("/api/users/")
			.send(user)
			.end((_err, res) => {
				expect(res.status).to.equal(200)
				expect(res.body).to.be.a("object")
				expect(res).to.have.property("body")
				expect(res.body).to.have.property("token")
				done()
			})

	})
	it("it should  HASH the given password when user was created and not show sensible user's informations : real password", (done) => {
		let user = {
			name: "souhail", 
			email:"mr.souid@live.fr", 
			password: "sklsss"
		}
		chai.request(server)
			.post("/api/users/")
			.send(user)
			.end((_err, res) => {
				expect(res.status).to.equal(200)
				expect(res.body).to.be.a("object")
				expect(res).to.have.property("body")
				expect(res.body).to.have.property("payload")
				expect(res.body.payload).to.have.property("user")
				expect(res.body.payload.user).to.have.property("password")
				expect(res.body.payload.user.password).to.not.equal(user.password)
				expect(res.body.payload.user).to.have.property("email")
				expect(res.body.payload.user.email).to.equal(user.email)
				expect(res.body.payload.user).to.have.property("name")
				expect(res.body.payload.user.name).to.equal(user.name)
				done()
			})

	})

})