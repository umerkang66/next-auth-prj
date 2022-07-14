import AuthForm from '../components/auth/auth-form';
import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then(session => {
      if (session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <AuthForm />;
}
