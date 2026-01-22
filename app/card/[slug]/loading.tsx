'use client';

import SkeletonText from '@/shared/components/skeleton/SkeletonText';
import { useEffect } from 'react';

function Loading() {
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  return (
    <div className="max-w-mw mt-15 grid h-fit w-full grid-cols-[auto_1fr] grid-rows-1 gap-x-15">
      <div className="skeleton aspect-600/825 w-[600] max-w-96" />

      <div>
        <div className="flex w-full items-start justify-between">
          <div className="flex w-52 flex-col items-start gap-3">
            <SkeletonText className="w-full text-4xl" />
            <SkeletonText className="ml-1 w-2/5" />
          </div>

          <div className="skeleton aspect-square w-12 rounded-full" />
        </div>

        <div className="gridrows mt-7 grid h-fit grid-cols-6 grid-rows-[repeat(4,auto)] gap-5">
          <div className="skeleton col-span-2 h-20" />
          <div className="skeleton col-span-2 h-20" />
          <div className="skeleton col-span-2 h-20" />

          <div className="skeleton col-span-3 h-24" />
          <div className="skeleton col-span-3 h-24" />

          <div className="skeleton col-span-6 h-32" />
        </div>
      </div>
    </div>
  );
}

export default Loading;
