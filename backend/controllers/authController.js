const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');  // UserModel 임포트

// 로그인 처리
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 이메일로 사용자 찾기
    const user = await UserModel.findByEmail(req.db, email);
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // .env 파일에 저장된 비밀 키 사용
      { expiresIn: '1h' } // 토큰 만료 시간 설정 (예: 1시간)
    );

    // 토큰 반환
    return res.json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// 회원가입 처리
const register = async (req, res) => {
  const { email, password } = req.body;  // confirmPassword는 클라이언트에서만 사용되고 서버로 전달되지 않음

  try {
    // 이메일 중복 확인
    const existingUser = await UserModel.findByEmail(req.db, email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새 사용자 저장
    const newUser = await UserModel.create(req.db, { email, password: hashedPassword });

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET, // .env 파일에 저장된 비밀 키 사용
      { expiresIn: '1h' } // 토큰 만료 시간 설정
    );

    // 토큰 반환
    return res.status(201).json({ token });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: 'Server error' });
  }
};


// 이메일 중복 체크
const checkEmail = async (req, res) => {
  const { email } = req.body;

  // 이메일이 없는 경우, 400 에러 반환
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // 이메일로 사용자 찾기
    const existingUser = await UserModel.findByEmail(req.db, email);

    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    } else {
      return res.status(200).json({ message: 'Email is available' });
    }
  } catch (error) {
    console.error("Check Email Error:", error.message || error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login, register, checkEmail };
