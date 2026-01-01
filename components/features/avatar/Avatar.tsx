'use client';

import { useAuth } from '@/lib/hooks/useAuth';

import AvatarImage from './AvatarImage';
import ProfileMenu from './ProfileMenu';
import Link from 'next/link';

function Avatar() {
  const { profile, loading, signOut, hasUsername } = useAuth();

  if (loading) {
    return (
      <div className="after: relative ml-auto aspect-square w-11 overflow-hidden rounded-full bg-neutral-600 after:absolute after:inset-0 after:animate-[shimmer_3s_infinite_ease] after:bg-linear-to-l after:from-transparent after:via-white/50 after:to-white/10 after:opacity-15 after:content-['']" />
    );
  }

  if (!profile) {
    return (
      <Link
        href={'/auth/login'}
        className="bg-bg-2 inset-ring-bg-3 hover:bg-bg-3 active:bg-bg-2 active:text-text-muted ml-auto rounded-lg px-3 py-2 inset-ring-1 transition-colors duration-100"
      >
        Sign in
      </Link>
    );
  }

  return (
    <div className="ml-auto flex">
      <ProfileMenu hasUsername={hasUsername} signOut={signOut}>
        <AvatarImage profile={profile} />
      </ProfileMenu>
    </div>
  );
}

export default Avatar;
