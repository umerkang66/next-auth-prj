import { getSession } from 'next-auth/client';
import { connectToDb } from '../../../lib/db';
import { hashPassword, verify } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(422).json({ message: 'Invalid endpoint' });
  }
  const { oldPassword, newPassword } = req.body;
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userEmail = session.user.email;
  const client = await connectToDb();
  const usersCollection = client.db().collection('users');

  const user = await usersCollection.findOne({ email: userEmail });
  if (!user) {
    client.close();
    return res.status(404).json({ message: 'User not found' });
  }

  const currentPassword = user.password;
  const isValid = await verify(oldPassword, currentPassword);
  if (!isValid) {
    client.close();
    return res.status(403).json({ message: 'Invalid password' });
  }

  const hashedNewPassword = await hashPassword(newPassword);
  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedNewPassword } }
  );

  client.close();
  res.status(200).json({ message: 'Password updated' });
}
