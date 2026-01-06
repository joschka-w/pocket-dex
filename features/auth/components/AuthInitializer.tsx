'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSetAtom } from 'jotai';
import { User } from '@supabase/supabase-js';

import { authLoadingAtom, profileAtom, userAtom } from '@/features/auth/atoms/auth-atoms';
import { createClient } from '@/shared/utils/supabase/client';

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

    const setData = (user: User | null) => {
      setUser(user);

      if (user) fetchProfile(user.id);
      else setProfile(null);

      setAuthLoading(false);
    };

    // Initial user fetch
    supabase.auth.getUser().then(({ data }) => {
      setData(data.user);
    });

    // Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setData(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, setAuthLoading, setProfile, setUser, supabase]);

  return null;
}

export default AuthInitializer;
