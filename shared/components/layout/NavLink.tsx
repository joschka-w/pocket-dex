'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { cn } from '@/shared/utils/cn';

interface Props {
  children: ReactNode;
  slug: string;
}

function NavLink({ slug, children }: Props) {
  const segment = useSelectedLayoutSegment();
  const isActive = slug === segment;

  return (
    <Link
      href={`/${slug}`}
      className={cn(
        'font-semibold text-nowrap',
        isActive && 'decoration-primary underline underline-offset-[6px]',
      )}
    >
      {children}
    </Link>
  );
}

export default NavLink;
