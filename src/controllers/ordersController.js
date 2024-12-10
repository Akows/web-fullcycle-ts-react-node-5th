const { StatusCodes } = require('http-status-codes');
const ordersService = require('../services/ordersService');

exports.getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await ordersService.getOrders(userId);
        res.status(StatusCodes.OK).json({ orders });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { items, delivery_info } = req.body;
        const orderId = await ordersService.createOrder(userId, items, delivery_info);
        res.status(StatusCodes.CREATED).json({ order_id: orderId, message: 'Order created successfully' });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};
