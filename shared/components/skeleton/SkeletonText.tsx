import { cn } from '@/shared/utils/cn';
import { DetailedHTMLProps, HTMLAttributes, useId } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  lines?: number;
}

function SkeletonText({ lines = 1, className, ...props }: Props) {
  const id = useId();

  return (
    <div className={className} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={`${id}-${i}`} className={cn('w-full', lines > 1 && 'last:w-4/5')}>
          <span className="skeleton inline-block h-[1em] w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}

export default SkeletonText;
