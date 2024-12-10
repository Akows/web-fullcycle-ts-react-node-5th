const db = require('../config/database');

exports.getOrders = async (userId) => {
    const query = 'SELECT * FROM orders WHERE user_id = ?';
    const [rows] = await db.execute(query, [userId]);
    return rows;
};

exports.createOrder = async (userId, items, deliveryInfo) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const insertOrderQuery = `
            INSERT INTO orders (user_id, total_price, delivery_address, recipient_name, phone)
            VALUES (?, ?, ?, ?, ?)`;
        const [orderResult] = await connection.execute(insertOrderQuery, [
            userId,
            items.reduce((sum, item) => sum + item.price * item.quantity, 0),
            deliveryInfo.address,
            deliveryInfo.recipient,
            deliveryInfo.phone,
        ]);

        const orderId = orderResult.insertId;

        const insertOrderItemQuery = `
            INSERT INTO order_items (order_id, book_id, quantity, price)
            VALUES (?, ?, ?, ?)`;
        for (const item of items) {
            await connection.execute(insertOrderItemQuery, [orderId, item.book_id, item.quantity, item.price]);
        }

        await connection.commit();
        return orderId;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};
