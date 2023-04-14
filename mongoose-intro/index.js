const mongoose = require("mongoose")


// First we create a schema
const bookSchema1 = mongoose.Schema({
	title: String,
	author: String,
	pages: Number,
	released: Date
})

const bookSchema2 = mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	author: {
		type: String,
		maxLength: 50
	},
	pages: {
		type: Number,
		max: 7000
	},
	inStock: {
		type: Boolean,
		default: true
	},
	genre: {
		type: String,
		enum: ["fantasy", "sci-fi"]
	},
	released: Date
}, { timestamps: true }) // Adds createdAt and updatedAt

// Then we create the model
// We use the book object to interact with the books collection
const Book = mongoose.model("Book", bookSchema2)


// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mongoose-intro")
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err))

// Connect to cloud MongoDB: mongoose.connect("mongodb+srv://admin:<password>@cluster0.grghy.mongodb.net/?retryWrites=true&w=majority")


// CRUD-operations: Create, read, update, delete

// Create

// Create one book
Book.create({ title: "First book" })
	.then(createdBook => console.log(createdBook))
	.catch(err => console.log(err))

// Create multiple books
Book.insertMany([
    { title: "Second book" },
    { title: "Third book" }
    ])
    .then(createdBooks => console.log(createdBooks))
    .catch(err => console.log(err))


// Read
// The methods like find() are asynchronous, so we can use a callback or a Promise. 
// find() with a callback function:
// Book.find({}, (err, books) => {
//     if (err) {
//         console.log(err)
//         return
//     }

//     console.log(books)
// })

// Get all books: find() with no parameter
Book.find()
	.then(allBooks => console.log(allBooks))
	.catch(err => console.log(err))

// You can also pass a query object to find()
Book.find({title: "First book"})
    .then(book => console.log(book))
    .catch(err => console.log(err))

// Get one book. Returns the first document that matches the query
Book.findOne({title: "Second book"})
    .then(book => console.log(book))
    .catch(err => console.log(err))

// Get one book by id
// Similar to: Book.find({_id: "my object id"})
Book.findById("1")
    .then(book => console.log(book))
    .catch(err => console.log(err))


// Update

// Update one book
Book.findOneAndUpdate({ title: "First book" }, { author: "First author" })
    .then(book => console.log(book))
    .catch(err => console.log(err))

// Add {new: true} as third parameter to retrieve updated book
Book.findOneAndUpdate({ title: "Second book" }, { author: "Second author" }, { new: true })
    .then(updatedBook => console.log(updatedBook))
    .catch(err => console.log(err))

// Find by id and update
// Book.findByIdAndUpdate("3", { author: "Third author" })


// Delete

// Delete one book
Book.findOneAndDelete({ title: "Third book" })
    .then(deletedBook => console.log(deletedBook))
    .catch(err => console.log(err))

// Delete one book by id
Book.findByIdAndDelete("3")
    .then(deletedBook => console.log(deletedBook))
    .catch(err => console.log(err))


// Validators and setters

// A validator validates our data before it gets stored in the database
// There's a npm validator package, which contains different functions like isMobilePhone(): https://www.npmjs.com/package/validator
const userSchema1 = new Schema({
    linkedinProfile: {
        type: String,
        validate: {
            validator: (text) => {
                return text.indexOf("https://www.linkedin.com/") === 0
            },
            message: "linkedinProfile must start with 'https://www.linkedin.com/'"
        }
    }
})

// We can use a setter to transform data before we store it in the database
const userSchema2 = mongoose.Schema({
	name: {
		type: String,
		set: value => {
			return value
				.split(" ")
				.map(str => str[0].toUpperCase() + str.slice(1).toLowerCase())
				.join(" ")
		}
	}
})

const User = mongoose.model("User", userSchema2)

User.create({ name: "mAtIaS gObBi" })
	.then(user => console.log(user))
	.catch(err => console.log(err))
	.finally(() => {
		// Close connection
		mongoose.connection.close()
	})

// Mongoose queries: https://mongoosejs.com/docs/queries.html
