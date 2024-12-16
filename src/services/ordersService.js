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

        // 1. 주문 생성
        const orderQuery = `
            INSERT INTO orders (user_id, total_price, status, delivery_address, recipient_name, phone)
            VALUES (?, ?, 'Pending', ?, ?, ?)
        `;
        const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

        const [orderResult] = await connection.execute(orderQuery, [
            userId,
            totalPrice,
            deliveryInfo.address,
            deliveryInfo.recipient,
            deliveryInfo.phone,
        ]);

        const orderId = orderResult.insertId;

        // 2. 주문 항목 삽입
        const orderItemsQuery = `
            INSERT INTO order_items (order_id, book_id, quantity, price)
            VALUES (?, ?, ?, ?)
        `;
        for (const item of items) {
            await connection.execute(orderItemsQuery, [orderId, item.book_id, item.quantity, item.price]);
        }

        // 3. 배송 정보 추가
        const deliveryQuery = `
            INSERT INTO delivery (order_id, delivery_address, recipient_name, phone, status)
            VALUES (?, ?, ?, ?, 'pending')
        `;
        await connection.execute(deliveryQuery, [
            orderId,
            deliveryInfo.address,
            deliveryInfo.recipient,
            deliveryInfo.phone,
        ]);

        await connection.commit();
        return orderId;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

exports.getOrderDetails = async (userId, orderId) => {
    const query = `
        SELECT 
            o.id AS order_id, 
            o.total_price, 
            o.delivery_address, 
            o.recipient_name, 
            o.phone, 
            o.created_at,
            oi.book_id, 
            oi.quantity, 
            oi.price,
            b.title, 
            b.image_url
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN books b ON oi.book_id = b.id
        WHERE o.user_id = ? AND o.id = ?
    `;
    const [rows] = await db.execute(query, [userId, orderId]);
    if (rows.length === 0) {
        throw new Error('주문 정보를 찾을 수 없습니다.');
    }
    return rows;
};

exports.getDeliveryInfo = async (orderId) => {
    const query = `
        SELECT 
            order_id, 
            delivery_address, 
            recipient_name, 
            phone, 
            status, 
            created_at, 
            updated_at
        FROM delivery
        WHERE order_id = ?
    `;
    const [rows] = await db.execute(query, [orderId]);
    return rows.length > 0 ? rows[0] : null;
};

exports.getRecentOrder = async (userId) => {
    const query = `
        SELECT 
            o.id AS order_id, 
            o.total_price, 
            o.delivery_address, 
            o.recipient_name, 
            o.phone, 
            o.created_at,
            d.status AS delivery_status
        FROM orders o
        LEFT JOIN delivery d ON o.id = d.order_id
        WHERE o.user_id = ? AND o.id = (
            SELECT MAX(id) FROM orders WHERE user_id = ?
        )
    `;

    const [rows] = await db.execute(query, [userId, userId]);
    return rows.length > 0 ? rows[0] : null;
};
