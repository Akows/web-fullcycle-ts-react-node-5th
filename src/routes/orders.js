const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const { verifyToken } = require('../middlewares/authMiddleware');

// 주문 목록 조회
router.get('/', verifyToken, ordersController.getOrders);

// 주문 생성
router.post('/', verifyToken, ordersController.createOrder);

// 주문 상세 조회
router.post('/detail/:orderId', verifyToken, ordersController.getOrderDetails);

// 배송 정보 조회
router.get('/:orderId/delivery', verifyToken, ordersController.getDeliveryInfo);

// 가장 최근 주문 조회
router.get('/recent', verifyToken, ordersController.getRecentOrder);

module.exports = router;
