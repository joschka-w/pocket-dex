import { SortDirection } from '@/features/card-catalog/filtering/config/card-filter-config';
import { cn } from '@/shared/utils/cn';
import { SortAscIcon, SortDescIcon } from 'lucide-react';
import { ToggleGroup } from 'radix-ui';
import { ReactNode } from 'react';

type Props = Omit<ToggleGroup.ToggleGroupSingleProps, 'type'>;

function DirectionToggle({ className, ...props }: Props) {
  return (
    <ToggleGroup.Root
      type="single"
      className={cn(
        'bg-bg-2 inset-ring-bg-3 flex h-9 w-full overflow-hidden rounded-lg inset-ring-1',
        className,
      )}
      {...props}
    >
      <Item value="asc">
        <SortAscIcon size={22} />
      </Item>

      <Item value="desc">
        <SortDescIcon size={22} />
      </Item>
    </ToggleGroup.Root>
  );
}

interface ItemProps {
  value: SortDirection;
  children?: ReactNode;
}

function Item({ value, children }: ItemProps) {
  return (
    <ToggleGroup.Item
      value={value}
      className="data-[state=on]:bg-primary data-[state=off]:active:text-text-muted data-[state=on]:text-bg-base flex aspect-square cursor-pointer items-center justify-center p-1"
    >
      {children}
    </ToggleGroup.Item>
  );
}

export default DirectionToggle;
