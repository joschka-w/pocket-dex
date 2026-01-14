import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { fetchUser } from '@/features/auth/api/fetchUser';
import UsernameForm from '@/features/auth/components/UsernameForm';

export const metadata: Metadata = {
  title: 'Choose a username',
};

async function EnterPage() {
  const { profile, user } = await fetchUser();

  if (!user) {
    redirect('/auth/login');
  }

  if (profile?.username) {
    redirect('/');
  }

  return <UsernameForm />;
}

export default EnterPage;
