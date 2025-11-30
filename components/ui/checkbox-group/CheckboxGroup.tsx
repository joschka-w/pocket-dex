'use client';

import { Dispatch, ReactNode, SetStateAction } from 'react';

import { CheckboxGroupContextProvider } from './CheckboxGroupContext';
import CheckboxGroupItem from './CheckboxGroupItem';
import CheckboxNestedGroup from './CheckboxNestedGroup';

interface Props {
  value: Set<string>;
  setValue: Dispatch<SetStateAction<Set<string>>>;
  children?: ReactNode;
}

function CheckboxGroup({ value, setValue, children }: Props) {
  return (
    <fieldset>
      <CheckboxGroupContextProvider value={value} setValue={setValue}>
        {children}
      </CheckboxGroupContextProvider>
    </fieldset>
  );
}

CheckboxGroup.Item = CheckboxGroupItem;
CheckboxGroup.NestedGroup = CheckboxNestedGroup;

export default CheckboxGroup;
