import { connectToDb } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7
    ) {
      return res.status(422).json({
        message: 'invalid input',
      });
    }

    const client = await connectToDb();
    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      client.close();
      return res.status(422).json({ message: 'User exists already' });
    }

    const hashedPassword = await hashPassword(password);
    const result = await db
      .collection('users')
      .insertOne({ email, password: hashedPassword });

    client.close();
    return res.status(201).json({ message: 'Created user' });
  }

  return res.status(400).json({ message: "Endpoint doesn't exist" });
}
