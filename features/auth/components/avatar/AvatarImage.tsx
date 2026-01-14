'use client';

import { Tables } from '@/types/database';
import { Avatar as RadixAvatar } from 'radix-ui';

interface Props {
  profile: Tables<'profile'>;
}

function AvatarImage({ profile }: Props) {
  const fallbackContent = profile.username?.at(0)?.toUpperCase() || 'U';

  return (
    <RadixAvatar.Root
      aria-label="Profile"
      className="flex aspect-square w-11 items-center justify-center overflow-hidden rounded-full"
    >
      {profile.avatar_url && (
        <RadixAvatar.Image src={profile.avatar_url} referrerPolicy="no-referrer" />
      )}

      <RadixAvatar.Fallback
        delayMs={100}
        className="bg-bg-3 text-text-muted flex aspect-square w-full items-center justify-center text-2xl"
      >
        {fallbackContent}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
}

export default AvatarImage;
