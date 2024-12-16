const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

// 주문 목록 조회
router.get('/', ordersController.getOrders);

// 주문 생성
router.post('/', ordersController.createOrder);

// 주문 상세 조회
router.post('/detail/:orderId', ordersController.getOrderDetails);

// 배송 정보 조회
router.get('/:orderId/delivery', ordersController.getDeliveryInfo);

// 가장 최근 주문 조회
router.get('/recent', ordersController.getRecentOrder);

module.exports = router;
