const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

exports.verifyToken = (req, res, next) => {
    try {
        // 요청 쿠키 또는 Authorization 헤더에서 토큰 가져오기
        const token = req.cookies?.authToken || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: '인증 토큰이 필요합니다.' });
        }

        // 토큰 검증
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.id; // 디코딩된 사용자 ID를 요청 객체에 추가
        next();
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: '유효하지 않은 인증 토큰입니다.' });
    }
};
