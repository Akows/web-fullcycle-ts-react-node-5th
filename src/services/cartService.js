const db = require('../config/database');

// 장바구니 목록 조회
exports.getCartItems = async (userId) => {
    const query = `
        SELECT 
            cart.id AS cart_id,
            cart.quantity,
            books.id AS book_id,
            books.title,
            books.price,
            books.image_url
        FROM cart
        JOIN books ON cart.book_id = books.id
        WHERE cart.user_id = ?
    `;
    const [rows] = await db.execute(query, [userId]);
    return rows;
};

// 장바구니에 도서 추가
exports.addToCart = async (userId, bookId, quantity) => {
    const query = `
        INSERT INTO cart (user_id, book_id, quantity) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
    `;
    await db.execute(query, [userId, bookId, quantity]);
};

// 장바구니 항목 수정
exports.updateCartItem = async (userId, bookId, quantity) => {
    const query = `
        UPDATE cart 
        SET quantity = ? 
        WHERE user_id = ? AND book_id = ?
    `;
    const [result] = await db.execute(query, [quantity, userId, bookId]);
    if (result.affectedRows === 0) {
        throw new Error('장바구니에 존재하지 않는 상품입니다.');
    }
};
// 장바구니에서 도서 삭제
exports.removeFromCart = async (userId, bookId) => {
    const query = 'DELETE FROM cart WHERE user_id = ? AND book_id = ?';
    const [result] = await db.execute(query, [userId, bookId]);
    if (result.affectedRows === 0) {
        throw new Error('장바구니에 존재하지 않는 상품입니다.');
    }
};
