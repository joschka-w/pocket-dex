'use client';

import { Select as RadixSelect } from 'radix-ui';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

import { useId } from 'react';
import { cn } from '@/shared/utils/cn';

const Root = RadixSelect.Root;

interface TriggerProps extends Omit<RadixSelect.SelectValueProps, 'children'> {
  children?: string;
}

function Trigger({ children, className, ...props }: TriggerProps) {
  const id = useId();

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {children && (
        <label htmlFor={id} className="text-nowrap">
          {children}
        </label>
      )}
      <RadixSelect.Trigger
        id={id}
        className="bg-bg-2 flex h-9 w-full min-w-32 cursor-pointer items-center justify-between rounded-lg px-3 py-2 outline-neutral-400 focus:outline-1"
      >
        <RadixSelect.Value className="text-text" {...props} />

        <RadixSelect.Icon>
          <ChevronDownIcon size={20} />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
    </div>
  );
}

type ContentProps = RadixSelect.SelectContentProps;

function Content({ children, className, ...props }: ContentProps) {
  return (
    <RadixSelect.Content
      align="start"
      position="popper"
      sideOffset={8}
      className={cn('bg-bg-2 w-(--radix-select-trigger-width) rounded-lg p-1.5', className)}
      {...props}
    >
      {children}
    </RadixSelect.Content>
  );
}

type ItemProps = RadixSelect.SelectItemProps;

function Item({ className, children, ...props }: ItemProps) {
  return (
    <RadixSelect.Item
      className={cn(
        'data-highlighted:bg-bg-3 group flex cursor-pointer items-center justify-between rounded-lg bg-transparent px-3 py-1 outline-none select-none',
        className,
      )}
      {...props}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>

      <CheckIcon size={16} className="group-data-[state=unchecked]:hidden" />
    </RadixSelect.Item>
  );
}

const Select = {
  Root,
  Trigger,
  Content,
  Item,
};

export default Select;
