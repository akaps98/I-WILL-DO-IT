const { ObjectId } = require('mongodb');

const UserModel = {
  collectionName: 'users',

  // 사용자 생성
  create: async (db, user) => {
    const result = await db.collection(UserModel.collectionName).insertOne(user);
    return result.insertedId;
  },

  // 이메일로 사용자 찾기
  findByEmail: async (db, email) => {
    return await db.collection(UserModel.collectionName).findOne({ email });
  },
};

module.exports = UserModel;