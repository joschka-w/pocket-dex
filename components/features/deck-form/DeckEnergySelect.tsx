import Image from 'next/image';
import { Popover, ToggleGroup } from 'radix-ui';
import { ChevronDownIcon } from 'lucide-react';

import { colorSVGs } from '@/lib/constants/asset-maps';
import { cn } from '@/lib/utils/cn';
import { Enums } from '@/types/database';

interface Props extends Omit<ToggleGroup.ToggleGroupMultipleProps, 'onChange' | 'type'> {
  className?: string;
  error?: string;
  value: Enums<'color'>[];
  onChange?: (values: Enums<'color'>[]) => void;
}

function DeckEnergySelect({ value, onChange, error, className, ...props }: Props) {
  const anySelected = false;

  return (
    <Popover.Root>
      <div className="flex flex-col gap-1">
        <Popover.Trigger
          className={cn(
            'cursor-pointer text-sm h-10 gap-2 min-w-32 w-full flex items-center py-2 px-3 justify-between rounded-lg bg-bg-2 focus:outline-1 outline-neutral-400',
            error && 'ring-1 ring-danger',
            className
          )}
        >
          Choose Deck Energies
          <ChevronDownIcon size={20} className="text-text-muted" />
        </Popover.Trigger>
        {error && <span className="ml-1 text-sm text-danger">{error}</span>}
      </div>

      <Popover.Content
        align="start"
        sideOffset={8}
        className="bg-bg-1 z-30 px-5 py-4 border border-bg-2 rounded-lg shadow-lg max-w-xs min-w-2xs shadow-black/50"
      >
        <ToggleGroup.Root type="multiple" value={value} onValueChange={onChange} {...props}>
          <h4 className="text-text-muted">Choose up to 3</h4>

          <div className="flex gap-2 flex-wrap mt-3">
            {Object.entries(colorSVGs).map(([value, img]) => {
              return (
                <ToggleGroup.Item
                  key={`color-filter-${value}`}
                  value={value}
                  data-any-selected={anySelected}
                  className={cn(
                    'rounded-full data-[state=on]:ring-2 w-7 relative aspect-square cursor-pointer data-[state=on]:scale-110',
                    "after:content-[''] data-[any-selected=true]:data-[state=off]:after:bg-black/40 after:transition-colors after:duration-100 after:inset-0 after:rounded-full after:absolute"
                  )}
                >
                  <Image src={img} alt={value} />
                </ToggleGroup.Item>
              );
            })}
          </div>
        </ToggleGroup.Root>
      </Popover.Content>
    </Popover.Root>
  );
}

export default DeckEnergySelect;
