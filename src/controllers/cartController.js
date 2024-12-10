const cartService = require('../services/cartService');

exports.getCartItems = async (req, res) => {
    try {
        const userId = req.user.id; // JWT 인증 사용 시 req.user에서 가져옴
        const items = await cartService.getCartItems(userId);
        res.json({ items });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { book_id, quantity } = req.body;
        await cartService.addToCart(userId, book_id, quantity);
        res.status(201).json({ message: '장바구니에 상품이 추가되었습니다.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookId = req.params.bookId;
        await cartService.removeFromCart(userId, bookId);
        res.json({ message: '장바구니에서 상품이 삭제되었습니다.' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
