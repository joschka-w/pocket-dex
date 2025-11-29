'use client';

import { Dispatch, ReactNode, SetStateAction } from 'react';
import { CheckboxGroupContextProvider } from './CheckboxGroupContext';
import CheckboxGroupItem from './CheckboxGroupItem';

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

export default CheckboxGroup;
