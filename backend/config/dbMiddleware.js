const { MongoClient } = require('mongodb');

const dbMiddleware = async (req, res, next) => {
  try {
    // MongoDB 클라이언트 연결
    const client = await MongoClient.connect(process.env.MONGO_URI);

    // 데이터베이스 연결 객체를 req.db에 저장
    req.db = client.db('iwilldoit_db'); // 연결할 데이터베이스 이름

    // 다음 미들웨어로 요청을 전달
    next();
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ message: 'Database connection failed' });
  }
};

module.exports = dbMiddleware;
