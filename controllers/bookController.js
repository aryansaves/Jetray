const Book = require('../models/Book');

// @desc    Add a new book
// @route   POST /books
// @access  Public
exports.addBook = async (req, res, next) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({
            success: true,
            data: book
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all book records
// @route   GET /books
// @access  Public
exports.getBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get book by ID
// @route   GET /books/:id
// @access  Public
exports.getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            res.status(404);
            return next(new Error(`Book not found with id of ${req.params.id}`));
        }

        res.status(200).json({
            success: true,
            data: book
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update book details
// @route   PUT /books/:id
// @access  Public
exports.updateBook = async (req, res, next) => {
    try {
        let book = await Book.findById(req.params.id);

        if (!book) {
            res.status(404);
            return next(new Error(`Book not found with id of ${req.params.id}`));
        }

        book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: book
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete book record
// @route   DELETE /books/:id
// @access  Public
exports.deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            res.status(404);
            return next(new Error(`Book not found with id of ${req.params.id}`));
        }

        await book.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Search book by title
// @route   GET /books/search?title=xyz
// @access  Public
exports.searchBooks = async (req, res, next) => {
    try {
        const { title } = req.query;

        if (!title) {
            res.status(400);
            return next(new Error('Please provide a title query parameter'));
        }

        // Using regex for partial and case-insensitive matching
        const books = await Book.find({ title: { $regex: title, $options: 'i' } });

        res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    } catch (error) {
        next(error);
    }
};
