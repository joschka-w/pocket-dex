import { cn } from '@/lib/utils/cn';
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
        'flex items-center gap-2 h-8 px-2 font-semibold hover:bg-white/3 hover:inset-ring-1 inset-ring-white/5 rounded-lg cursor-pointer',
        variant === 'nested' && 'text-text-muted pl-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default CheckboxGroupItemWrapper;
