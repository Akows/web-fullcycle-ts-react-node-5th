const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const { validateId, validateCategoryId, validateFilteredBooks } = require('../middlewares/validation');

// 도서 목록 조회
router.get('/allbooks', booksController.getBooks);

// 특정 도서 상세 조회
router.get('/book/:id', validateId, booksController.getBookById);

// 카테고리별 도서 목록 조회
router.get('/category/:categoryId', validateCategoryId, booksController.getBooksByCategory);

// 필터링된 도서 조회 
router.get('/filtered', validateFilteredBooks, booksController.getFilteredBooks);

module.exports = router;
