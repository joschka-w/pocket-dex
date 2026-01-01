import UsernameForm from '@/components/features/create-username-form/UsernameForm';
import { fetchUser } from '@/lib/data/auth/fetchUser';
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
