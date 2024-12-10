const express = require('express');
const { login, register, checkEmail } = require('../controllers/authController');  // authController에서 login, register 가져오기

const router = express.Router();

// 로그인 라우트
router.post('/login', login);

// 회원가입 라우트 추가
router.post('/register', register);  // 회원가입 라우트

// 이메일 중복 확인 라우트 추가
router.post('/check-email', checkEmail);  // 이메일 중복 확인 라우트 추가

module.exports = router;
