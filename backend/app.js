const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const { connectToDatabase, getDb } = require('./config/database');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB 연결 설정
connectToDatabase();

// DB 객체를 모든 라우트에서 사용 가능하게 설정
app.use((req, res, next) => {
  req.db = getDb();
  next();
});

// 인증 라우트 설정
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 5001;

// 서버 시작
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
