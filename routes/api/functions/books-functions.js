


const Book = require("../../../models/book")
const { requiresInput, isMissingRequiredInformations,
	potentialErrors, response } = require("./validation")

// response status
const bookNotFoundResponse = (res) =>  response(res, 404,"Book not found!" )
const bookFoundResponse = (res) => response(res, 405,"Book already exist!" )
const bookDeletedNotification = (res, result) => res.json({ message: "Book successfully deleted!", result })
const bookUpdatedNotification = (res, book) => res.json({ message: "Book successfully updated!", book })
const addBookResponse = (res) => res.json({message: "Book successfully added!"}) 
const isBookAlreadyExist = (req) => { return Book.findOne(req.body)}

const isBookFoundByID = (req) => { return Book.findById(req.params.id)}

async function isBookExist(req, res, next, action) {

	const isBookExist  =  await isBookFoundByID(req)
	const isBookNotExist = !isBookExist

	if(isBookNotExist){
		bookNotFoundResponse(res)
		return next()
	}
	return action(req, res)  
}

function addBook (req, res) { new Book(req.body).save(() => { addBookResponse(res) }) }

async function postBook ( res, req) {
	if(await isBookAlreadyExist(req)){
		return 	bookFoundResponse(res)
	}
	if(await isMissingRequiredInformations(req))
		return potentialErrors(res, req) 
        
	return addBook(req, res)
}
async function update ( req, res) {
	Object.assign( await  Book.findById(req.params.id), req.body).save((_err, book) => {
		bookUpdatedNotification(res, book)
	})
}
async function updateBook ( res, req) {
	const isBookNotExist =  ! await isBookFoundByID(req)
	if(isMissingRequiredInformations(req))
		return potentialErrors(res, req) 
	if(isBookNotExist)
		return bookNotFoundResponse(res)
	
               
	return update(req, res)
}	

async function getBooks (res) {
	res.json(await Book.find())
}

async function getBookWithID(req, res) {
	res.json(await isBookFoundByID(req))

}
function deleteBook ( req, res) {
	Book.deleteOne({_id : req.params.id}, (_err, result) => {
		bookDeletedNotification(res,result)
	})
}

module.exports = {
	requiresInput, isBookExist, getBooks,
	getBookWithID, postBook, deleteBook, updateBook,

	
}
