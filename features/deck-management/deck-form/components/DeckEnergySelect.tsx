import Image from 'next/image';
import { Popover, ToggleGroup } from 'radix-ui';
import { ChevronDownIcon } from 'lucide-react';

import { COLOR_SVG_MAP } from '@/shared/constants/asset-maps';
import { cn } from '@/shared/utils/cn';
import { Enums } from '@/types/database';
import { MAX_ENERGIES_PER_DECK } from '../../deck-builder/constants/deck-builder';

interface Props extends Omit<ToggleGroup.ToggleGroupMultipleProps, 'onChange' | 'type'> {
  className?: string;
  error?: string;
  value: Enums<'color'>[];
  onChange?: (values: Enums<'color'>[]) => void;
}

function DeckEnergySelect({ value = [], onChange, error, className, ...props }: Props) {
  const anySelected = value.length > 0;
  const maxAmountSelected = value.length >= MAX_ENERGIES_PER_DECK;

  return (
    <Popover.Root>
      <div className="flex flex-col gap-1">
        <Popover.Trigger
          className={cn(
            'bg-bg-2 flex h-10 w-full min-w-32 cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm outline-neutral-400 focus:outline-1',
            error && 'ring-danger ring-1',
            className,
          )}
        >
          Choose Deck Energies
          <ChevronDownIcon size={20} className="text-text-muted" />
        </Popover.Trigger>
        {error && <span className="text-danger ml-1 text-sm">{error}</span>}
      </div>

      <Popover.Content
        align="start"
        sideOffset={8}
        className="bg-bg-1 border-bg-2 z-30 max-w-xs min-w-2xs rounded-lg border px-5 py-4 shadow-lg shadow-black/50"
      >
        <ToggleGroup.Root type="multiple" value={value} onValueChange={onChange} {...props}>
          <h4 className="text-text-muted">Choose up to 3</h4>

          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(COLOR_SVG_MAP).map(([colorName, img]) => {
              return (
                <ToggleGroup.Item
                  key={`color-filter-${colorName}`}
                  value={colorName}
                  disabled={!value.includes(colorName as Enums<'color'>) && maxAmountSelected}
                  data-any-selected={anySelected}
                  className={cn(
                    'relative aspect-square w-7 cursor-pointer rounded-full data-[state=on]:scale-110 data-[state=on]:ring-2',
                    "after:absolute after:inset-0 after:rounded-full after:transition-colors after:duration-100 after:content-[''] disabled:cursor-default data-[any-selected=true]:data-[state=off]:after:bg-black/40",
                  )}
                >
                  <Image src={img} alt={colorName} />
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
