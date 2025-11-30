import { cn } from '@/lib/utils/cn';
import { CheckIcon, MinusIcon } from 'lucide-react';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';

export type CheckboxState = CheckboxPrimitive.CheckedState;

type Props = CheckboxPrimitive.CheckboxProps;

function Checkbox({ checked, className, ...props }: Props) {
  return (
    <div className="flex items-center gap-2">
      <CheckboxPrimitive.Root
        checked={checked}
        className={cn(
          'aspect-square w-4 rounded-sm flex items-center justify-center cursor-pointer',
          !checked && 'inset-ring-2 inset-ring-bg-3',
          checked && 'bg-primary',
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator>
          {checked === true && <CheckIcon size={14} className="text-bg-base" strokeWidth={4} />}
          {checked === 'indeterminate' && (
            <MinusIcon size={14} className="text-bg-base" strokeWidth={4} />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    </div>
  );
}

export default Checkbox;
