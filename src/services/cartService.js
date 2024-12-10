const db = require('../config/database');

exports.getCartItems = async (userId) => {
    const query = 'SELECT * FROM cart WHERE user_id = ?';
    const [rows] = await db.execute(query, [userId]);
    return rows;
};

exports.addToCart = async (userId, bookId, quantity) => {
    const query = `
        INSERT INTO cart (user_id, book_id, quantity) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`;
    await db.execute(query, [userId, bookId, quantity]);
};

exports.removeFromCart = async (userId, bookId) => {
    const query = 'DELETE FROM cart WHERE user_id = ? AND book_id = ?';
    const [result] = await db.execute(query, [userId, bookId]);
    if (result.affectedRows === 0) {
        throw new Error('장바구니에 존재하지 않는 상품입니다.');
    }
};
