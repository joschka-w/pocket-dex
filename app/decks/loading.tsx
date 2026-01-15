import SkeletonText from '@/shared/components/skeleton/SkeletonText';
import { useId } from 'react';

function Loading() {
  return (
    <div className="max-w-mw mt-topbar-height relative grid h-screen w-full grid-cols-2 gap-7">
      <DeckSkeleton />
      <DeckSkeleton />
    </div>
  );
}

function DeckSkeleton() {
  const id = useId();

  return (
    <div className="bg-bg-1/75 relative flex h-fit w-full flex-col overflow-hidden rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="z-10 flex w-40 flex-col gap-1">
          <SkeletonText className="w-4/5 text-2xl leading-none" />
          <SkeletonText className="text-sm" />
        </div>

        <div className="z-10 row-span-2 flex gap-1">
          <div className="skeleton aspect-square w-6 rounded-full" />
        </div>
      </div>

      {/* Cards */}
      <ol className="mb-auto grid grid-cols-6 gap-2 px-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            className="skeleton aspect-600/825 rounded-md"
            key={`deck-card-skeleton-${id}-${i}`}
          />
        ))}

        {/* Placeholders so that deck is larger */}
        <div className="aspect-600/825 rounded-md" />
        <div className="aspect-600/825 rounded-md" />
        <div className="aspect-600/825 rounded-md" />
        <div className="aspect-600/825 rounded-md" />
      </ol>

      {/* Footer */}
      <div className="mt-2 flex justify-between p-4">
        <SkeletonText className="ml-6 w-10 text-sm" />
        <SkeletonText className="w-12 text-xl" />
      </div>
    </div>
  );
}

export default Loading;
