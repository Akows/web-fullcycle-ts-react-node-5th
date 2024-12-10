const { StatusCodes } = require('http-status-codes');
const usersService = require('../services/usersService');

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await usersService.getProfile(userId);
        res.status(StatusCodes.OK).json(profile);
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email } = req.body;
        await usersService.updateProfile(userId, name, email);
        res.status(StatusCodes.OK).json({ message: '프로필이 성공적으로 업데이트되었습니다.' });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};
