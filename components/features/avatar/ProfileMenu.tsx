'use client';

import { createElement, ReactNode } from 'react';
import Link from 'next/link';
import { DropdownMenu } from 'radix-ui';
import { HeartIcon, LayersIcon, LogOutIcon, LucideIcon, UserIcon } from 'lucide-react';

import { cn } from '@/lib/utils/cn';
import { useAuth } from '@/lib/hooks/useAuth';
import AvatarImage from './AvatarImage';

interface Props {
  signOut: () => void;
  hasUsername?: boolean;
  children?: ReactNode;
}

function ProfileMenu({ signOut, hasUsername, children }: Props) {
  const { profile } = useAuth();

  if (!profile) return null;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="cursor-pointer rounded-full">
        {children}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          align="end"
          className="bg-bg-1 inset-ring-bg-2 z-50 flex min-w-48 flex-col rounded-lg px-1.5 py-2 shadow-lg inset-ring-1 shadow-black/50"
        >
          <DropdownMenu.Label className="mb-3 flex items-center gap-4 p-2">
            <AvatarImage profile={profile} />

            <div className="flex flex-col">
              <span>Welcome back</span>
              {profile.username && <span className="font-bold">{`@${profile.username}`}</span>}
            </div>
          </DropdownMenu.Label>

          <Item icon={LayersIcon}>My Decks</Item>
          <Item icon={HeartIcon}>Liked Decks</Item>

          {!hasUsername && (
            <>
              <DropdownMenu.Separator className="bg-bg-2 my-1 h-0.5 w-full rounded-lg" />

              <Link href={'/auth/enter'}>
                <Item icon={UserIcon}>Choose Username</Item>
              </Link>
            </>
          )}

          <DropdownMenu.Separator className="bg-bg-2 my-1 h-0.5 w-full rounded-lg" />

          <Item onClick={signOut} icon={LogOutIcon} danger>
            Sign out
          </Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

interface ItemProps extends DropdownMenu.DropdownMenuItemProps {
  icon?: LucideIcon;
  danger?: boolean;
  children?: ReactNode;
}

function Item({ icon, danger = false, children, ...props }: ItemProps) {
  return (
    <DropdownMenu.Item
      {...props}
      className={cn(
        'data-highlighted:bg-bg-3 group flex cursor-pointer items-center gap-3 rounded-lg bg-transparent px-3 py-1 outline-none select-none',
        danger && 'text-danger',
      )}
    >
      <div className="flex aspect-square w-5 items-center justify-center">
        {icon && createElement(icon, { size: 20 })}
      </div>
      {children}
    </DropdownMenu.Item>
  );
}

export default ProfileMenu;
