const { StatusCodes } = require('http-status-codes');
const cartService = require('../services/cartService');

exports.getCartItems = async (req, res) => {
    try {
        const userId = req.user.id;
        const items = await cartService.getCartItems(userId);
        res.status(StatusCodes.OK).json({ items });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { book_id, quantity } = req.body;
        await cartService.addToCart(userId, book_id, quantity);
        res.status(StatusCodes.CREATED).json({ message: '장바구니에 상품이 추가되었습니다.' });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookId = req.params.bookId;
        await cartService.removeFromCart(userId, bookId);
        res.status(StatusCodes.OK).json({ message: '장바구니에서 상품이 삭제되었습니다.' });
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
    }
};
