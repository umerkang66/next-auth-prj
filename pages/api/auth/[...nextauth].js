import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connectToDb } from '../../../lib/db';
import { verify } from '../../../lib/auth';

export default NextAuth({
  session: { jwt: true },
  providers: [
    Providers.Credentials({
      // these are credentials coming from client
      async authorize({ email, password }) {
        const client = await connectToDb();
        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({ email });
        if (!user) {
          client.close();
          throw new Error('No user found');
        }

        const isValid = await verify(password, user.password);
        if (!isValid) {
          client.close();
          throw new Error('Could not log you in');
        }

        client.close();
        // if we return obj, we let next-auth know that authorization succeeded
        // this obj will also be encoded in jwt
        return { email: user.email };
      },
    }),
  ],
});
