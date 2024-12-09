const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

// 주문 목록 조회
router.get('/', ordersController.getOrders);

// 새로운 주문 생성
router.post('/', ordersController.createOrder);

module.exports = router;
