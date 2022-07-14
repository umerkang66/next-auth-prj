import UserProfile from '../components/profile/user-profile';
import { getSession } from 'next-auth/client';

export default function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });

  // null if user is not authenticated
  if (!session) {
    return { redirect: { destination: '/auth', permanent: false } };
  }

  return {
    props: { session },
  };
}
