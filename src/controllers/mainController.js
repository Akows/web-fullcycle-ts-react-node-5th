const mainService = require('../services/mainService');

exports.getMainPageData = async (req, res) => {
    try {
        const data = await mainService.getMainPageData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
