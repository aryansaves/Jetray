const express = require('express');
const {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
    searchBooks
} = require('../controllers/bookController');

const router = express.Router();

router.get('/search', searchBooks);

router
    .route('/')
    .get(getBooks)
    .post(addBook);

router
    .route('/:id')
    .get(getBookById)
    .put(updateBook)
    .delete(deleteBook);

module.exports = router;
