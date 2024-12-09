const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// 장바구니 목록 조회
router.get('/', cartController.getCartItems);

// 장바구니에 도서 추가
router.post('/', cartController.addToCart);

// 장바구니에서 도서 삭제
router.delete('/:bookId', cartController.removeFromCart);

module.exports = router;
