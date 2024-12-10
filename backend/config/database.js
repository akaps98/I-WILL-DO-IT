const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;

let client;

const connectToDatabase = async () => {
  try {
    if (!client) {
      client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      console.log('Connected to MongoDB');
    }
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
