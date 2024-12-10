const usersService = require('../services/usersService');

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await usersService.getProfile(userId);
        res.json(profile);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email } = req.body;
        await usersService.updateProfile(userId, name, email);
        res.json({ message: '프로필이 성공적으로 업데이트되었습니다.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
