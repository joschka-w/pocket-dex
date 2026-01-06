import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { cn } from '@/shared/utils/cn';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {
  vertical?: boolean;
}

function Seperator({ vertical = false, className, ...props }: Props) {
  if (vertical) {
    return (
      <hr
        {...props}
        className={cn('bg-bg-2 h-full w-0.5 shrink-0 grow-0 rounded-lg border-none', className)}
      />
    );
  }

  return (
    <hr
      {...props}
      className={cn('bg-bg-2 h-0.5 shrink-0 grow-0 rounded-lg border-none', className)}
    />
  );
}

export default Seperator;
