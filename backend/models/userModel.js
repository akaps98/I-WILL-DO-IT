const { ObjectId } = require('mongodb');

const UserModel = {
  collectionName: 'users',
  create: async (db, user) => {
    const result = await db.collection(UserModel.collectionName).insertOne(user);
    return result.insertedId;
  },
  findByEmail: async (db, email) => {
    return await db.collection(UserModel.collectionName).findOne({ email });
  },
};

module.exports = UserModel;