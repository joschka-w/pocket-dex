'use client';

import { useId } from 'react';
import Checkbox, { CheckboxState } from '../Checkbox';

import { ReactNode } from 'react';
import { useCheckboxGroupContext } from './CheckboxGroupContext';

interface Props {
  children?: ReactNode;
  value: string;
}

function CheckboxGroupItem({ value, children }: Props) {
  const id = useId();

  const { state, addValue, removeValue } = useCheckboxGroupContext();

  const checked = state.has(value);

  const handleCheckedChange = (checked: CheckboxState) => {
    if (checked) addValue(value);
    else removeValue(value);
  };

  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} checked={checked} onCheckedChange={handleCheckedChange} />
      {children && <label htmlFor={id}>{children}</label>}
    </div>
  );
}

export default CheckboxGroupItem;
