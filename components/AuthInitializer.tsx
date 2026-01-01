'use client';

import { useEffect } from 'react';
import { useSetAtom } from 'jotai';

import { authLoadingAtom, profileAtom, userAtom } from '@/lib/atoms/auth-atoms';
import { createClient } from '@/lib/utils/supabase/client';
import { useRouter } from 'next/navigation';

function AuthInitializer() {
  const setUser = useSetAtom(userAtom);
  const setProfile = useSetAtom(profileAtom);
  const setAuthLoading = useSetAtom(authLoadingAtom);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = (userId: string) => {
      supabase
        .from('profile')
        .select('*')
        .eq('id', userId)
        .single()
        .then(({ data }) => {
          setProfile(data);
          if (!data?.username) {
            router.push('/auth/enter');
          }
        });
    };

    // Initial user fetch
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);

      if (data.user) {
        fetchProfile(data.user.id);
      } else setProfile(null);

      setAuthLoading(false);
    });

    // Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);

      if (session?.user) {
        fetchProfile(session.user.id);
      } else setProfile(null);

      setAuthLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, setAuthLoading, setProfile, setUser, supabase]);

  return null;
}

export default AuthInitializer;
