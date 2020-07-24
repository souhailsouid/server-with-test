// const Book = require("../models/book")
// //Require the dev-dependencies
// const chai = require("chai")
// const chaiHttp = require("chai-http")
// const server = require("../server")
// const expect = chai.expect

// chai.use(chaiHttp)

// // Our parent block
// describe("Books", () => {
// 	beforeEach((done) => { 
// 		Book.deleteMany({}, () => {	       
// 			done() 
// 		}) 	
// 	})


// 	/*
//   * Test the /GET route
//     */

// 	describe("/GET books", () => {
// 		it("it should GET all books", (done) => {
// 			chai.request(server)
// 				.get("/api/books")
// 				.end((_err, res) => {
// 					expect(res.status).to.equal(200)
// 					expect(res.body).to.be.a("array")
// 					done()
// 				})
// 		})
// 	})

// 	describe("/POST a book", () => {
// 		it("it should not be able to post a new book without requires informations: a title, an author, a language, year of publication, number of pages ", (done) => {
// 			let newBook = {
// 				title: "",
// 				author: "",
// 				language: "",
// 				yearOfPublication: "",
// 				pages: ""
// 			}
// 			chai.request(server)
// 				.post("/api/books")
// 				.send(newBook)
// 				.end((_err, res) => {	
// 					expect(res.status).to.equal(400)
// 					expect(res.body).to.have.property("errors")
// 					expect(res.body.errors).to.be.a("array")
// 					expect(res.body.errors[0]).to.have.property("msg")
// 					expect(res.body.errors[0]).to.have.property("param")
// 					expect(res.body.errors[0].param).to.equal("title")
// 					expect(res.body.errors[0].msg).to.equal("Please include a valid title")
// 					expect(res.body.errors[1].msg).to.equal("Please include a valid author")
// 					expect(res.body.errors[1].param).to.equal("author")
// 					expect(res.body.errors[2].param).to.equal("language")
// 					expect(res.body.errors[2].msg).to.equal("Please include a language")
// 					expect(res.body.errors[3].param).to.equal("yearOfPublication")
// 					expect(res.body.errors[3].msg).to.equal("Please include a year of publication")
// 					expect(res.body.errors[4].param).to.equal("yearOfPublication")
// 					expect(res.body.errors[4].msg).to.equal("Must contains only number")
// 					expect(res.body.errors[5].param).to.equal("pages")
// 					expect(res.body.errors[5].msg).to.equal("Please include numbers of pages")
// 					expect(res.body.errors[6].param).to.equal("pages")
// 					expect(res.body.errors[6].msg).to.equal("Must contains only number")
// 					done()
// 				})
// 		})
// 		it("it should not be able to post a new book without requires informations: a language", (done) => {
// 			let addBook = {
// 				title: "The Lord of the Rings Part III",
// 				author: "J.R.R. Tolkien",
// 				language: "",
// 				yearOfPublication: "1978",
// 				pages: "120"
// 			}
	
// 			chai.request(server)
// 				.post("/api/books")
// 				.send(addBook)
// 				.end((_err, res) => {
// 					expect(res.status).to.equal(400)
// 					expect(res.body).to.be.a("object")
// 					expect(res.body).to.have.property("errors")
// 					expect(res.body.errors[0]).to.have.property("param")
// 					expect(res.body.errors[0].param).to.equal("language")
// 					expect(res.body.errors[0]).to.have.property("msg")
// 					expect(res.body.errors[0].msg).to.equal("Please include a language")
// 					done()
// 				})
// 		})
// 		it("it should not be able to post a new book without requires informations: a year of publication", (done) => {
// 			let addBook = {
// 				title: "The Lord of the Rings Part III",
// 				author: "J.R.R. Tolkien",
// 				language: "english",
// 				yearOfPublication: "" || null,
// 				pages: "140"
// 			}
	
// 			chai.request(server)
// 				.post("/api/books")
// 				.send(addBook)
// 				.end((_err, res) => {
// 					expect(res.status).to.equal(400)
// 					expect(res.body).to.be.a("object")
// 					expect(res.body).to.have.property("errors")
// 					expect(res.body.errors[0]).to.have.property("param")
// 					expect(res.body.errors[0].param).to.equal("yearOfPublication")
// 					expect(res.body.errors[0]).to.have.property("msg")
// 					expect(res.body.errors[0].msg).to.equal("Please include a year of publication")
// 					done()
// 				})
// 		})
// 		it("it should not be able to post a new book if year of publication is not a Number", (done) => {
// 			let addBook = {
// 				title: "The Lord of the Rings Part III",
// 				author: "J.R.R. Tolkien",
// 				language: "english",
// 				yearOfPublication: "195sdjskl4",
// 				pages: "1967"
// 			}
	
// 			chai.request(server)
// 				.post("/api/books")
// 				.send(addBook)
// 				.end((_err, res) => {
// 					expect(res.status).to.equal(400)
// 					expect(res.body).to.be.a("object")
// 					expect(res.body).to.have.property("errors")
// 					expect(res.body.errors[0]).to.have.property("param")
// 					expect(res.body.errors[0].param).to.equal("yearOfPublication")
// 					expect(res.body.errors[0]).to.have.property("msg")
// 					expect(res.body.errors[0].msg).to.equal("Must contains only number")
// 					done()
// 				})
// 		})
// 		it("it should not be able to post a new book without requires informations: number of pages", (done) => {
// 			let addBook = {
// 				title: "The Lord of the Rings Part III",
// 				author: "J.R.R. Tolkien",
// 				language: "english",
// 				yearOfPublication: "1954",
// 				pages: "" || null
// 			}
	
// 			chai.request(server)
// 				.post("/api/books")
// 				.send(addBook)
// 				.end((_err, res) => {
// 					expect(res.status).to.equal(400)
// 					expect(res.body).to.be.a("object")
// 					expect(res.body).to.have.property("errors")
// 					expect(res.body.errors[0]).to.have.property("param")
// 					expect(res.body.errors[0].param).to.equal("pages")
// 					expect(res.body.errors[0]).to.have.property("msg")
// 					expect(res.body.errors[0].msg).to.equal("Please include numbers of pages")
// 					done()
// 				})
// 		})
// 		it("it should not be able to post a new book if number of pages is not a Number", (done) => {
// 			let addBook = {
// 				title: "The Lord of the Rings Part III",
// 				author: "J.R.R. Tolkien",
// 				language: "english",
// 				yearOfPublication: "1954",
// 				pages: "19ss7"
// 			}
	
// 			chai.request(server)
// 				.post("/api/books")
// 				.send(addBook)
// 				.end((_err, res) => {
// 					expect(res.status).to.equal(400)
// 					expect(res.body).to.be.a("object")
// 					expect(res.body).to.have.property("errors")
// 					expect(res.body.errors[0]).to.have.property("param")
// 					expect(res.body.errors[0].param).to.equal("pages")
// 					expect(res.body.errors[0]).to.have.property("msg")
// 					expect(res.body.errors[0].msg).to.equal("Must contains only number")
// 					done()
// 				})
// 		})
// 		it("it should be able to post a new book with requires informations: a title, an author, a language, a year of publication, number of pages", (done) => {
// 			let addBook = {
// 				title: "The Lord of the Rings Part III",
// 				author: "J.R.R. Tolkien",
// 				language: "english",
// 				yearOfPublication: "1985",
// 				pages: "170"
// 			}
// 			const successfullMessage = "Book successfully added!"
// 			chai.request(server)
// 				.post("/api/books")
// 				.send(addBook)
// 				.end((_err, res) => {
// 					expect(res.status).to.equal(200)
// 					expect(res.body.message).to.equal(successfullMessage)
// 					expect(res.body).to.be.a("object")
// 					done()
// 				})
// 		})

	
// 		it("it should not be able to post a new book if it's already exist", (done) => {
// 			let book = new Book({title: "The Lord of the Rings Part III", author: "J.R.R. Tolkien", language: "english", yearOfPublication: 1985, pages: 185})
// 			let duplicateBook = {
// 				title: "The Lord of the Rings Part III",
// 				author: "J.R.R. Tolkien",
// 				language: "english",
// 				yearOfPublication: "1985",
// 				pages: "185"
// 			}
// 			const message = "Book already exist!"
		
// 			book.save(() => {
// 				chai.request(server)
// 					.post("/api/books")
// 					.send(duplicateBook)
// 					.end((_err, res) => {
// 						expect(res.status).to.equal(405)
// 						expect(res.body).to.be.a("object")
// 						expect(res.body).to.have.property("errors")
// 						expect(res.body.errors).to.equal(message)
// 						done()
// 					})
// 			})
// 		})
// 	})

// 	describe("/GET/:id book", () => {
// 		it("it should GET a book by the given id", (done) => {
// 			let book = new Book({ title: "The Lord of the Rings Part V", author: "J.R.R. Tolkien", language: "english American" , yearOfPublication: "1985", pages: "176" })
// 			const id = book.id
// 			book.save((_err, book) => {
// 				chai.request(server)
// 					.get(`/api/books/${id}`)
// 					.send(book)
// 					.end((_err, res) => {
// 						expect(res.status).to.equal(200)
// 						expect(res.body).to.be.a("object")
// 						expect(res.body).to.have.property("title")
// 						expect(res.body).to.have.property("author")
// 						expect(res.body).to.have.property("language")
// 						expect(res.body).to.have.property("yearOfPublication")
// 						expect(res.body).to.have.property("pages")
// 						expect(res.body).to.have.property("_id").eql(book.id) 
// 						done()    
// 					})
// 			})					
// 		})
// 		it("it should not GET a book by the given id IF is not exist And should return  an error Book not found!", (done) => {
// 			let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", language: "english", yearOfPublication: "1985", pages: "198"})
// 			const notification = "Book not found!"
// 			chai.request(server)
// 				.get(`/api/books/${book.id}`)
// 				.send(book)
// 				.end((_err, res) => {
// 					expect(res.status).to.equal(404)
// 					expect(res.body).to.be.a("object")
// 					expect(res.body).to.have.property("errors").eql(notification) 
// 					done()    
// 				})
								
// 		})
// 	})	

// 	describe("/DELETE a book", () => {
// 		it("it should send a notification : \"Book not found! \" if the given id is not defined ", (done) => {
// 			let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", language: "american", yearOfPublication: "1985", pages: "156"})
// 			const notification = "Book not found!"
		
// 			chai.request(server)
// 				.delete(`/api/books/${book.id}`)
// 				.send(book)
// 				.end((_err, res) => {
// 					expect(res.status).to.equal(404)
// 					expect(res.body).to.be.a("object")
// 					expect(res.body).to.have.property("errors").eql(notification) 
// 					done() 
// 				})
// 		})
	

// 		it("it should DELETE a book with its ID if ID exist", (done) => {
// 			let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", language: "australian english", yearOfPublication: "1985", pages: "145"})
// 			book.save((_err, book) => {
// 				chai.request(server)
// 					.delete(`/api/books/${book.id}`)
// 					.send(book)
// 					.end((_err, res) => {
// 						expect(res.status).to.equal(200)
// 						expect(res.body).to.be.a("object")
// 						expect(res.body).to.have.property("message").to.equal("Book successfully deleted!")
// 						done()
// 					})
// 			})
// 		})
// 	})
// 	describe("/UPDATE a book", () => {
// 		it("it should send a notification : \"Book not found! \" if the given id is not defined or already deleted ", (done) => {
// 			let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", language: "english", yearOfPublication: "1985", pages: "178"})
// 			const notification = "Book not found!"
		
// 			chai.request(server)
// 				.put(`/api/books/${book.id}`)
// 				.send(book)
// 				.end((_err, res) => {
// 					expect(res.status).to.equal(404)
// 					expect(res.body).to.be.a("object")
// 					expect(res.body).to.have.property("errors").eql(notification) 
// 					done() 
// 				})
// 		})

	
// 		it("it should not be able to update a new book without requires informations: a title, an author, a language, a year of publication, number of pages", (done) => {
// 			let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", language: "english", yearOfPublication: "1988", pages: "145"})
// 			let updateBook = {
// 				title: "",
// 				author: "",
// 				language: "",
// 				yearOfPublication: "",
// 				pages: ""

// 			}
// 			book.save((_err, book) => {
// 				chai.request(server)
// 					.put(`/api/books/${book.id}`)
// 					.send(updateBook)
// 					.end((_err, res) => {	
// 						expect(res.status).to.equal(400)
// 						expect(res.body).to.have.property("errors")
// 						expect(res.body.errors).to.be.a("array")
// 						expect(res.body.errors[0]).to.have.property("msg")
// 						expect(res.body.errors[0]).to.have.property("param")
// 						expect(res.body.errors[0].param).to.equal("title")
// 						expect(res.body.errors[0].msg).to.equal("Please include a valid title")
// 						expect(res.body.errors[1].msg).to.equal("Please include a valid author")
// 						expect(res.body.errors[1].param).to.equal("author")
// 						expect(res.body.errors[2].param).to.equal("language")
// 						expect(res.body.errors[2].msg).to.equal("Please include a language")
// 						expect(res.body.errors[3].param).to.equal("yearOfPublication")
// 						expect(res.body.errors[3].msg).to.equal("Please include a year of publication")
// 						expect(res.body.errors[4].param).to.equal("yearOfPublication")
// 						expect(res.body.errors[4].msg).to.equal("Must contains only number")
// 						expect(res.body.errors[5].param).to.equal("pages")
// 						expect(res.body.errors[5].msg).to.equal("Please include numbers of pages")
// 						expect(res.body.errors[6].param).to.equal("pages")
// 						expect(res.body.errors[6].msg).to.equal("Must contains only number")
// 						done()
// 					})
// 			})

// 		})
	
// 		it("it should UPDATE a book with its ID if ID exist", (done) => {
// 			let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", language: "english", yearOfPublication: "1985", pages: "156"})
// 			let updatedBook  ={
// 				title: "The Chronicles of Narnia", author: "C.S. Lewis", language: "english Americain", yearOfPublication: "1984", pages: "165"
// 			}
// 			book.save((_err, book) => {
// 				chai.request(server)
// 					.put(`/api/books/${book.id}`)
// 					.send(updatedBook)
// 					.end((_err, res) => {
// 						expect(res.status).to.equal(200)
// 						expect(res.body).to.be.a("object")
// 						expect(res.body).to.have.property("message").to.equal("Book successfully updated!")
// 						expect(res.body).to.have.property("book")
// 						expect(res.body.book).to.have.property("title")
// 						expect(res.body.book.title).to.equal(updatedBook.title)
// 						expect(res.body.book).to.have.property("author")
// 						expect(res.body.book.author).to.equal(updatedBook.author)
// 						expect(res.body.book).to.have.property("language")
// 						expect(res.body.book.language).to.equal(updatedBook.language)
// 						expect(res.body.book).to.have.property("yearOfPublication")
// 						expect(res.body.book.yearOfPublication).to.equal(updatedBook.yearOfPublication)
// 						expect(res.body.book).to.have.property("pages")
// 						expect(res.body.book.pages).to.equal(updatedBook.pages)
// 						done()
// 					})
// 			})
// 		})
// 	})


	

// })