const { StatusCodes } = require('http-status-codes');
const { validateId, validateCategoryId } = require('../middlewares/validation');
const booksService = require('../services/booksService');

exports.getBooks = async (req, res) => {
    try {
        const books = await booksService.getBooks();
        res.status(StatusCodes.OK).json({ total_count: books.length, books });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await booksService.getBookById(req.params.id);
        res.status(StatusCodes.OK).json(book);
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
    }
};


exports.getBooksByCategory = async (req, res) => {
    try {
        const books = await booksService.getBooksByCategory(req.params.categoryId);
        res.status(StatusCodes.OK).json({ category_id: req.params.categoryId, books });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
