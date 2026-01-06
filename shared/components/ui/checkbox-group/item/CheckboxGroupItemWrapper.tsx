import { cn } from '@/shared/utils/cn';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface WrapperProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  variant?: 'default' | 'nested';
}

// Just a wrapper for the group items, to prevent having to define
// the tailwind classes twice (once in NestedGroup and once in Item)
export function CheckboxGroupItemWrapper({
  variant = 'default',
  children,
  className,
  ...props
}: WrapperProps) {
  return (
    <div
      className={cn(
        'flex h-8 cursor-pointer items-center gap-2 rounded-lg px-2 font-semibold inset-ring-white/5 hover:bg-white/3 hover:inset-ring-1',
        variant === 'nested' && 'text-text-muted pl-8',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default CheckboxGroupItemWrapper;
