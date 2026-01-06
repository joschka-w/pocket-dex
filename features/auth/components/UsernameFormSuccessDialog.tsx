'use client';

import { useRouter } from 'next/navigation';
import { useSetAtom } from 'jotai';

import { profileAtom } from '@/features/auth/atoms/auth-atoms';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { createClient } from '@/shared/utils/supabase/client';
import Dialog from '@/shared/components/ui/Dialog';

interface Props {
  open?: boolean;
}

function UsernameFormSuccessDialog({ open }: Props) {
  const router = useRouter();
  const setProfile = useSetAtom(profileAtom);
  const supabase = createClient();
  const { user } = useAuth();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      if (user) {
        supabase
          .from('profile')
          .select('*')
          .eq('id', user?.id)
          .single()
          .then(({ data }) => setProfile(data));
      }
      router.replace('/');
    }
  };
  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Content>
        <Dialog.Title>Username Set Successfully!</Dialog.Title>
        <Dialog.Description>
          {
            "You're all set! Your username has been confirmed and you're ready to start using PocketDex."
          }
        </Dialog.Description>
        <Dialog.Close>Continue</Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default UsernameFormSuccessDialog;
