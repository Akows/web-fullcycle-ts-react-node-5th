const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 회원가입
router.post('/register', authController.register);

// 로그인
router.post('/login', authController.login);

// 비밀번호 초기화
router.post('/reset-password', authController.resetPassword);

module.exports = router;
