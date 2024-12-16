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

exports.getSelectedCartItems = async (userId, selectedItems) => {
    // 배열 크기만큼 ? 플레이스홀더 생성
    const placeholders = selectedItems.map(() => '?').join(', ');

    // map함수를 통해 selectedItems 배열 내부의 크기와 동일하게,
    // 모든 index가 ?로 채워진 배열이 반환된다.
    // join함수를 통해 배열 내부의 모든 요소들을 문자열로 반환,
    // 다만 요소 사이사이에 ', ' 문자를 넣어 구분자를 넣어준다.
    // 이렇게 해서 SQL 쿼리문에 능동적으로 매개변수 칸을 만들어줄 수 있다.

    // SQL 쿼리 작성
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
        WHERE cart.user_id = ? AND cart.book_id IN (${placeholders})
    `;

    // 매개변수로 userId와 selectedItems 배열을 전달
    const [rows] = await db.execute(query, [userId, ...selectedItems]);
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
