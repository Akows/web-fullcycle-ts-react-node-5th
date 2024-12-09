const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

// 도서 목록 조회
router.get('/', booksController.getBooks);

// 특정 도서 상세 정보 조회
router.get('/:id', booksController.getBookById);

// 카테고리별 도서 목록 조회
router.get('/category/:categoryId', booksController.getBooksByCategory);

module.exports = router;
