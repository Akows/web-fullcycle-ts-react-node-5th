const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// 사용자 프로필 조회
router.get('/profile', usersController.getProfile);

// 사용자 정보 수정
router.put('/profile', usersController.updateProfile);

module.exports = router;
