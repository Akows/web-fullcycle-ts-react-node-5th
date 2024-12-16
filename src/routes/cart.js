const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// 장바구니 목록 조회
router.get('/getcartitem', cartController.getCartItems);

// 선택된 장바구니 항목 조회
router.post('/selected', cartController.getSelectedCartItems);

// 장바구니에 도서 추가
router.post('/setcartitem', cartController.addToCart);

// 장바구니 항목 수정/삭제
router.put('/updatecartitem', cartController.updateCartItem);

module.exports = router;
