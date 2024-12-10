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
        res.status(StatusCodes.OK).json({ token });
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, new_password } = req.body;
        await authService.resetPassword(email, new_password);
        res.status(StatusCodes.OK).json({ message: '비밀번호 초기화가 정상적으로 완료되었습니다.' });
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
    }
};
