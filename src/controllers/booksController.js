const { StatusCodes } = require('http-status-codes');
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

exports.getFilteredBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // 기본값: 1
        const limit = parseInt(req.query.limit) || 10; // 기본값: 10
        const categoryId = req.query.categoryId ? parseInt(req.query.categoryId) : null;
        const isNew = req.query.isNew === 'true'; // 신간 여부

        const data = await booksService.getFilteredBooks(page, limit, categoryId, isNew);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 좋아요 추가
exports.addLike = async (req, res) => {
    try {
        const { userId } = req.body; // Body에서 userId를 받음
        const bookId = req.params.id; // URL 파라미터로 도서 ID를 받음
        await booksService.addLike(userId, bookId);
        res.status(StatusCodes.CREATED).json({ message: '좋아요가 추가되었습니다.' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

// 좋아요 취소
exports.removeLike = async (req, res) => {
    try {
        const { userId } = req.body; // Body에서 userId를 받음
        const bookId = req.params.id; // URL 파라미터로 도서 ID를 받음
        await booksService.removeLike(userId, bookId);
        res.status(StatusCodes.OK).json({ message: '좋아요가 취소되었습니다.' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

// 좋아요 여부 확인
exports.checkLike = async (req, res) => {
    try {
        const { userId } = req.body; // Body에서 userId를 받음
        const bookId = req.params.id; // URL 파라미터로 도서 ID를 받음
        const isLiked = await booksService.checkLike(userId, bookId);
        res.status(StatusCodes.OK).json({ isLiked });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
