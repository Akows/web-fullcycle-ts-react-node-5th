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

// 좋아요 추가
router.post('/book/:id/like', validateId, booksController.addLike);

// 좋아요 취소
router.delete('/book/:id/like', validateId, booksController.removeLike);

// 좋아요 여부 확인
router.get('/book/:id/like', validateId, booksController.checkLike);

module.exports = router;
