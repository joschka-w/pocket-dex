import UsernameForm from '@/features/auth/components/UsernameForm';
import { fetchUser } from '@/features/auth/api/fetchUser';
import { redirect } from 'next/navigation';

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
