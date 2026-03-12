const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true,
        unique: true,
        default: () => "B-" + Math.random().toString(36).substr(2, 9) // simple auto-generator avoiding extra libs for now
    },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        unique: true
    },
    author: {
        type: String,
        required: [true, 'Author is required']
    },
    genre: {
        type: String,
        required: [true, 'Genre is required']
    },
    publisher: {
        type: String,
        required: [true, 'Publisher is required']
    },
    publicationYear: {
        type: Number
    },
    totalCopies: {
        type: Number,
        min: [1, 'Total copies must be a positive number'],
        required: true
    },
    availableCopies: {
        type: Number,
        default: function () { return this.totalCopies; } // defaults to totalCopies
    },
    shelfLocation: {
        type: String
    },
    bookType: {
        type: String,
        enum: ['Reference', 'Circulating'],
        default: 'Circulating'
    },
    status: {
        type: String,
        enum: ['Available', 'Checked Out'],
        default: 'Available'
    }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
