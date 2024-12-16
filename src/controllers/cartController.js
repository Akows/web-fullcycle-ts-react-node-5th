const { StatusCodes } = require('http-status-codes');
const cartService = require('../services/cartService');

// 장바구니 목록 조회
exports.getCartItems = async (req, res) => {
    try {
        const userId = req.query.userId; // userId를 URL 파라미터로 받음
        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'userId가 필요합니다.' });
        }
        const items = await cartService.getCartItems(userId);
        res.status(StatusCodes.OK).json({ items });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '장바구니 조회 중 문제가 발생했습니다.' });
    }
};

// 장바구니에 도서 추가
exports.addToCart = async (req, res) => {
    try {
        const { userId, book_id, quantity } = req.body;
        if (!userId || !book_id || quantity <= 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: '유효하지 않은 userId, book_id 또는 수량입니다.' });
        }
        await cartService.addToCart(userId, book_id, quantity);
        res.status(StatusCodes.CREATED).json({ message: '장바구니에 상품이 추가되었습니다.' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '장바구니 추가 중 문제가 발생했습니다.' });
    }
};

// 장바구니 항목 수정/삭제
exports.updateCartItem = async (req, res) => {
    try {
        const { userId, book_id, quantity } = req.body;

        // 입력 값 검증
        if (!userId || !book_id || quantity === undefined) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'userId, book_id, quantity는 필수입니다.' });
        }

        if (quantity > 0) {
            // 수량 수정
            await cartService.updateCartItem(userId, book_id, quantity);
            res.status(StatusCodes.OK).json({ message: '장바구니 항목이 수정되었습니다.' });
        } else if (quantity === 0) {
            // 수량이 0인 경우 삭제
            await cartService.removeFromCart(userId, book_id);
            res.status(StatusCodes.OK).json({ message: '장바구니에서 상품이 삭제되었습니다.' });
        } else {
            // 유효하지 않은 수량
            return res.status(StatusCodes.BAD_REQUEST).json({ error: '수량은 0 이상이어야 합니다.' });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '장바구니 수정/삭제 중 문제가 발생했습니다.' });
    }
};