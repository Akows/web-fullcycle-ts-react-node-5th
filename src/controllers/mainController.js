const { StatusCodes } = require('http-status-codes');
const mainService = require('../services/mainService');

exports.getMainPageData = async (req, res) => {
    try {
        const data = await mainService.getMainPageData();
        res.status(StatusCodes.OK).json(data);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
