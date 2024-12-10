const booksService = require('../services/booksService');

exports.getBooks = async (req, res) => {
    try {
        const books = await booksService.getBooks();
        res.json({ total_count: books.length, books });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await booksService.getBookById(req.params.id);
        res.json(book);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.getBooksByCategory = async (req, res) => {
    try {
        const books = await booksService.getBooksByCategory(req.params.categoryId);
        res.json({ category_id: req.params.categoryId, books });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
