const express = require("express")
const router = express.Router()

const { 
	requiresInput, isBookExist, getBooks, 
	getBookWithID, deleteBook,  postBook,  updateBook,
} = require("./functions/books-functions")


const Post  = ( action ) => router.post("/",requiresInput, action )
const Get = ( htmlRequete, action ) => router.get(htmlRequete.toString(), action )
const Delete = ( action ) => router.delete("/:id", action )
const Put = ( action ) => router.put("/:id",requiresInput, action )

// @route    POST api/books
// @desc     Add a book
// @access   Public

Post((req, res) => {
	postBook(res, req)
})	

// @route    GET api/books
// @desc     Get books
// @access   Public

Get("/",(_req, res) => {
	getBooks(res)
}) 

// @route    GET api/books/:id
// @desc     Get books by its ID
// @access   Public


Get("/:id", (req, res, next) => {
	isBookExist(req, res, next, () => getBookWithID(req, res))
})

// @route    DELETE api/books/:id
// @desc     DELETE a book with it ID
// @access   Public

Delete(  (req, res, next) => {
	isBookExist(req, res, next, () => deleteBook(req, res))	
})

// @route    PUT api/books/:id
// @desc     PUT a book with it ID
// @access   Public

Put((req, res) => { 
	updateBook(res,req) 
})	

module.exports = router