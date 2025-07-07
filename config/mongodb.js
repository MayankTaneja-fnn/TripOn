import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

let db;

export const connectToMongoDb = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await client.connect();
    db = client.db(); // Travel will be used from URI
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
  }
};

export const getDB = () => db;
