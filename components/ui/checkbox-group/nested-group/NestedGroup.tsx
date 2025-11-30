'use client';

import { ReactNode, useId } from 'react';
import { Collapsible } from 'radix-ui';
import { ChevronDownIcon } from 'lucide-react';

import { NestedGroupContext } from './NestedGroupContext';
import useNestedCheckboxGroup from '@/lib/hooks/useNestedCheckboxGroup';
import Checkbox from '../../Checkbox';
import CheckboxGroupItemWrapper from '../item/CheckboxGroupItemWrapper';

interface Props {
  children?: ReactNode;
  label: string;
}

function CheckboxNestedGroup({ label, children }: Props) {
  const { checked, contextValue, handleClick } = useNestedCheckboxGroup();
  const id = useId();

  return (
    <NestedGroupContext.Provider value={contextValue}>
      <Collapsible.Root>
        <CheckboxGroupItemWrapper onClick={handleClick}>
          <Checkbox checked={checked} onCheckedChange={handleClick} id={id} />
          <label onClick={e => e.preventDefault()} className="cursor-pointer" htmlFor={id}>
            {label}
          </label>
          <Collapsible.Trigger
            onClick={e => e.stopPropagation()}
            className="flex items-center group justify-center ml-auto text-text-muted hover:text-text rounded-md transition-all hover:scale-115 aspect-square h-7 cursor-pointer"
          >
            <ChevronDownIcon
              size={18}
              className="group-data-[state=open]:-scale-y-100 transition-transform duration-75"
            />
          </Collapsible.Trigger>
        </CheckboxGroupItemWrapper>

        <Collapsible.Content forceMount className="data-[state=closed]:h-0 overflow-hidden">
          <div role="group">{children}</div>
        </Collapsible.Content>
      </Collapsible.Root>
    </NestedGroupContext.Provider>
  );
}

export default CheckboxNestedGroup;
