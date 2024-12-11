const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const { validateId, validateCategoryId } = require('../middlewares/validation');

// 도서 목록 조회
router.get('/', booksController.getBooks);

// 특정 도서 상세 조회
router.get('/:id', validateId, booksController.getBookById);

// 카테고리별 도서 목록 조회
router.get('/category/:categoryId', validateCategoryId, booksController.getBooksByCategory);

module.exports = router;
