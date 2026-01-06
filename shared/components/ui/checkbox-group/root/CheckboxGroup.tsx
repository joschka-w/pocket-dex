'use client';

import {
  DetailedHTMLProps,
  Dispatch,
  FieldsetHTMLAttributes,
  ReactNode,
  SetStateAction,
} from 'react';

import { CheckboxGroupContextProvider } from './CheckboxGroupContext';
import { cn } from '@/shared/utils/cn';
import CheckboxNestedGroup from '../nested-group/NestedGroup';
import CheckboxGroupItem from '../item/CheckboxGroupItem';

interface Props extends DetailedHTMLProps<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  HTMLFieldSetElement
> {
  value: Set<string>;
  setValue: Dispatch<SetStateAction<Set<string>>>;
  children?: ReactNode;
}

function CheckboxGroup({ value, setValue, className, children, ...props }: Props) {
  return (
    <fieldset className={cn('flex flex-col gap-1', className)} {...props}>
      <CheckboxGroupContextProvider value={value} setValue={setValue}>
        {children}
      </CheckboxGroupContextProvider>
    </fieldset>
  );
}

CheckboxGroup.Item = CheckboxGroupItem;
CheckboxGroup.NestedGroup = CheckboxNestedGroup;

export default CheckboxGroup;
