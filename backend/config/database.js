require('dotenv').config();  // .env 파일 불러오기

const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
// const uri = 'mongodb+srv://lgtwins0302:lgtwins1217@cluster0.uwtw1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

let client;
let db;

console.log('Mongo URI:', process.env.MONGO_URI);

const connectToDatabase = async () => {
  try {
    if (!client) {
      client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      db = client.db('iwilldoit_db');  // 데이터베이스 이름 설정
      console.log('Connected to MongoDB');
    }
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);  // 연결 실패 시 서버 종료
  }
};

const getDb = () => db;  // 연결된 db 객체를 반환하는 함수

module.exports = { connectToDatabase, getDb };
