// Sets the createdAt parameter equal to the current time

function currentTime(schema) {schema.pre("save", next => {
	let now = new Date()
	if(!this.createdAt) {
		this.createdAt = now
	}
	next()
})
}
module.exports = currentTime