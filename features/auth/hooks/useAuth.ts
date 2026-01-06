import { useRouter } from 'next/navigation';
import { useAtomValue } from 'jotai';

import { authLoadingAtom, profileAtom, userAtom } from '../atoms/auth-atoms';
import { createClient } from '../../../shared/utils/supabase/client';

export function useAuth() {
  const user = useAtomValue(userAtom);
  const profile = useAtomValue(profileAtom);
  const loading = useAtomValue(authLoadingAtom);

  const router = useRouter();
  const supabase = createClient();

  const hasUsername = Boolean(profile?.username);

  const signOut = async () => {
    await supabase.auth.signOut();

    router.push('/auth/logout');
  };

  return { user, profile, loading, hasUsername, signOut };
}
