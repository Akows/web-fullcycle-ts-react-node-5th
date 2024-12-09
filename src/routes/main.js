const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// 메인 페이지 데이터 조회
router.get('/', mainController.getMainPageData);

module.exports = router;
