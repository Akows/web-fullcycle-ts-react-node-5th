const { StatusCodes } = require('http-status-codes');
const authService = require('../services/authService');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userId = await authService.register(email, password);
        res.status(StatusCodes.CREATED).json({ userId, message: '회원가입이 정상적으로 완료되었습니다.' });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken } = await authService.login(email, password);

        // 액세스 토큰은 HTTP 응답 헤더에 설정
        res.cookie('authToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000,
        });

        // 리프레시 토큰은 HTTP 응답 헤더 또는 Body에 전달
        res.status(StatusCodes.OK).json({ refreshToken });
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: error.message });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: '리프레시 토큰이 필요합니다.' });
        }

        // 서비스 호출로 비즈니스 로직 위임
        const newAccessToken = await authService.verifyRefreshTokenAndGenerateAccessToken(refreshToken);

        // 새로운 액세스 토큰을 쿠키와 응답에 설정
        res.cookie('authToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000, // 15분
        });

        res.status(StatusCodes.OK).json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, new_password } = req.body;

        // 비밀번호 변경 서비스 호출
        await authService.resetPassword(email, new_password);

        res.status(StatusCodes.OK).json({ message: '비밀번호 초기화가 정상적으로 완료되었습니다.' });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};