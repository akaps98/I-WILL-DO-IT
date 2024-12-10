const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');  // authRoutes 임포트
const dbMiddleware = require('./config/dbMiddleware');  // dbMiddleware 임포트
const { connectToDatabase, getDb } = require('./config/database');  // database.js에서 import

dotenv.config();

const app = express();
app.use(express.json());  // JSON 요청 바디 파싱
app.use(cors());  // 모든 도메인에서의 요청을 허용

app.use(dbMiddleware);

// MongoDB 연결 설정
connectToDatabase();

// DB 객체를 모든 라우트에서 사용 가능하게 설정
app.use((req, res, next) => {
  req.db = getDb();  // db 객체를 req.db로 설정
  next();
});

// 인증 라우트 설정
app.use('/api/auth', authRoutes);  // authRoutes 연결

const port = process.env.PORT || 5001;

// 서버 시작
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
