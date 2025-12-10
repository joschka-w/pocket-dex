import { cn } from '@/lib/utils/cn';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isUpdating?: boolean;
}

function CardRoot({ isUpdating = false, className, children, ...props }: Props) {
  return (
    <div {...props} className={cn('group', isUpdating && 'opacity-50', className)}>
      {children}
    </div>
  );
}

export default CardRoot;
