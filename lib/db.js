import { MongoClient } from 'mongodb';

export async function connectToDb() {
  const client = await MongoClient.connect(
    `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.7ddsqam.mongodb.net/next-auth?retryWrites=true&w=majority`
  );
  return client;
}
