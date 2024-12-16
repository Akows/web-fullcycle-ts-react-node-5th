const { StatusCodes } = require('http-status-codes');
const ordersService = require('../services/ordersService');

exports.getOrders = async (req, res) => {
    try {
        const userId = req.query.userId; // Query 파라미터로 사용자 ID 전달
        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'userId가 필요합니다.' });
        }

        const orders = await ordersService.getOrders(userId);
        res.status(StatusCodes.OK).json({ orders });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '주문 목록 조회 중 문제가 발생했습니다.' });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const { userId, items, delivery_info } = req.body;

        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'userId가 필요합니다.' });
        }
        if (!items || items.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: '주문 항목이 필요합니다.' });
        }
        if (!delivery_info || !delivery_info.address || !delivery_info.recipient || !delivery_info.phone) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: '유효한 배송 정보가 필요합니다.' });
        }

        const orderId = await ordersService.createOrder(userId, items, delivery_info);
        res.status(StatusCodes.CREATED).json({ order_id: orderId, message: 'Order created successfully' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

exports.getOrderDetails = async (req, res) => {
    try {
        const { userId } = req.body;
        const orderId = req.params.orderId;

        if (!userId || !orderId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'userId와 orderId가 필요합니다.' });
        }

        const orderDetails = await ordersService.getOrderDetails(userId, orderId);
        res.status(StatusCodes.OK).json({ orderDetails });
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '주문 상세 조회 중 문제가 발생했습니다.' });
    }
};

exports.getDeliveryInfo = async (req, res) => {
    try {
        const orderId = req.params.orderId;

        if (!orderId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'orderId가 필요합니다.' });
        }

        const deliveryInfo = await ordersService.getDeliveryInfo(orderId);

        if (!deliveryInfo) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: '배송 정보를 찾을 수 없습니다.' });
        }

        res.status(StatusCodes.OK).json({ delivery: deliveryInfo });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '배송 정보 조회 중 문제가 발생했습니다.' });
    }
};

exports.getRecentOrder = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'userId가 필요합니다.' });
        }

        const recentOrder = await ordersService.getRecentOrder(userId);

        if (!recentOrder) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: '최근 주문이 존재하지 않습니다.' });
        }

        res.status(StatusCodes.OK).json({ recentOrder });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '최근 주문 조회 중 문제가 발생했습니다.' });
    }
};

