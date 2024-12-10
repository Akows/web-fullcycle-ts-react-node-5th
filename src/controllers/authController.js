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
        const token = await authService.login(email, password);

        // 토큰을 쿠키로 설정
        res.cookie('authToken', token, {
            httpOnly: true, // JavaScript에서 접근할 수 없도록 설정 (보안 강화)
            secure: process.env.NODE_ENV === 'production', // HTTPS에서만 쿠키가 전송되도록 설정 (운영 환경일 경우)
            maxAge: 60 * 60 * 1000, // 1시간 후 만료
            sameSite: 'strict', // 크로스 사이트 요청 방지
        });

        res.status(StatusCodes.OK).json({ message: '로그인이 성공적으로 완료되었습니다.' });
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