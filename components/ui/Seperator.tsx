import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {
  vertical?: boolean;
}

function Seperator({ vertical = false, className, ...props }: Props) {
  if (vertical) {
    return (
      <hr
        {...props}
        className={cn('bg-bg-2 border-none shrink-0 grow-0 h-full w-0.5 rounded-lg', className)}
      />
    );
  }

  return (
    <hr
      {...props}
      className={cn('bg-bg-2 border-none shrink-0 grow-0 h-0.5 rounded-lg', className)}
    />
  );
}

export default Seperator;
