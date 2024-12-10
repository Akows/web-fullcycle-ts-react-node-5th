const ordersService = require('../services/ordersService');

exports.getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await ordersService.getOrders(userId);
        res.json({ orders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { items, delivery_info } = req.body;
        const orderId = await ordersService.createOrder(userId, items, delivery_info);
        res.status(201).json({ order_id: orderId, message: 'Order created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
