const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const authService = require('../services/authService');

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies?.authToken || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: '인증 토큰이 필요합니다.' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.userId = decoded.id; // 디코딩된 사용자 ID를 요청 객체에 추가
            return next();
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                // 리프레시 토큰 검증 및 재발급
                const refreshToken = req.body.refreshToken || req.cookies?.refreshToken;
                if (!refreshToken) {
                    return res.status(StatusCodes.UNAUTHORIZED).json({ error: '리프레시 토큰이 필요합니다.' });
                }

                try {
                    const newAccessToken = await authService.verifyRefreshTokenAndGenerateAccessToken(refreshToken);
                    res.cookie('authToken', newAccessToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        maxAge: 15 * 60 * 1000, // 15분
                    });
                    req.userId = jwt.decode(newAccessToken).id;
                    return next();
                } catch (refreshError) {
                    return res.status(StatusCodes.UNAUTHORIZED).json({ error: '리프레시 토큰 검증 실패' });
                }
            } else if (error instanceof jwt.JsonWebTokenError) {
                return res.status(StatusCodes.UNAUTHORIZED).json({ error: '유효하지 않은 인증 토큰입니다.' });
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).json({ error: '인증 토큰 처리 중 알 수 없는 오류가 발생했습니다.' });
            }
        }
    } catch (generalError) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '서버 에러가 발생했습니다.' });
    }
};
