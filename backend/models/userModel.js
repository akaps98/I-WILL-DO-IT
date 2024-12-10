const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');

const UserModel = {
  collectionName: 'users',

  // 사용자 생성
  create: async (db, user) => {
    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = { ...user, password: hashedPassword };  // 비밀번호 해시화 후 저장

    const result = await db.collection(UserModel.collectionName).insertOne(newUser);
    return result.insertedId;
  },

  // 이메일로 사용자 찾기
  findByEmail: async (db, email) => {
    // 이메일로 사용자 찾기, 없으면 null 반환
    return await db.collection(UserModel.collectionName).findOne({ email });
  },

  // 사용자 ID로 찾기
  findById: async (db, id) => {
    // MongoDB는 _id를 ObjectId 형태로 저장하므로, ID를 ObjectId로 변환
    return await db.collection(UserModel.collectionName).findOne({ _id: ObjectId(id) });
  },
};

module.exports = UserModel;
