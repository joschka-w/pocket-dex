import SkeletonText from '@/shared/components/skeleton/SkeletonText';

function Loading() {
  return (
    <main className="max-w-mw grid w-full grid-cols-[1fr_3fr] grid-rows-[var(--spacing-topbar-height)_1fr] gap-x-7">
      <div className="top-header-height h-topbar-height sticky z-10 col-start-2"></div>

      <FilterSkeleton />

      <div className="relative grid h-fit grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <CardSkeleton key={`skeleton-card-${i}`} />
        ))}
      </div>
    </main>
  );
}

function FilterSkeleton() {
  return (
    <div className="bg-bg-1/75 sticky top-[calc(var(--spacing-header-height)+var(--spacing-topbar-height))] row-start-2 flex h-[calc(100vh-((var(--spacing-header-height)+var(--spacing-topbar-height))))] flex-col gap-7 rounded-xl p-6 pt-4">
      <div className="mt-1 flex items-end justify-between">
        <div className="skeleton mt-3 h-5 w-24 rounded-full" />
        <div className="skeleton mt-2 mb-1 h-3 w-12 rounded-full" />
      </div>

      <div className="relative mt-1.5">
        <SkeletonText className="w-12" />

        <div className="mt-5 ml-1 flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div className="flex items-center gap-1.5" key={`skeleton-set-filter-${i}`}>
              <div className="skeleton aspect-square w-5 rounded-full" />
              <div className="skeleton h-5 w-4/5 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-13">
        <SkeletonText className="w-12" />

        <div className="mt-3">
          <div className="flex flex-wrap gap-1.5">
            <div className="skeleton h-7 w-7/8 rounded-full" />
            <div className="skeleton mt-1 h-7 w-2/5 rounded-full" />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <SkeletonText className="w-12" />

        <div className="mt-3.5">
          <div className="flex flex-wrap gap-2">
            <div className="skeleton h-9 w-1/5 rounded-full" />
            <div className="skeleton h-9 w-2/5 rounded-full" />
            <div className="skeleton h-9 w-2/6 rounded-full" />
            <div className="skeleton h-9 w-2/7 rounded-full" />
            <div className="skeleton h-9 w-1/5 rounded-full" />
            <div className="skeleton h-9 w-2/5 rounded-full" />
            <div className="skeleton h-9 w-2/5 rounded-full" />
            <div className="skeleton h-9 w-1/5 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div>
      <div className="skeleton aspect-600/825 rounded-lg" />

      <div>
        <SkeletonText className="mt-3 w-3/5 leading-none font-semibold" />
        <SkeletonText className="text-text-muted mt-2 mb-1 w-2/7 text-sm leading-none font-bold" />
      </div>
    </div>
  );
}

export default Loading;
