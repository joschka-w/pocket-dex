'use client';

import { useEffect, useId } from 'react';
import Checkbox, { CheckboxState } from '../Checkbox';

import { ReactNode } from 'react';
import { useCheckboxGroupContext } from './CheckboxGroupContext';
import { useNestedGroupContext } from './CheckboxNestedGroup';

interface Props {
  children?: ReactNode;
  value: string;
}

function CheckboxGroupItem({ value, children }: Props) {
  const { state, addValues, removeValues } = useCheckboxGroupContext();
  const id = useId();
  const itemGroupContext = useNestedGroupContext();

  useEffect(() => {
    if (!itemGroupContext) return;

    itemGroupContext.registerItem(value);

    return () => {
      itemGroupContext.unregisterItem(value);
    };
  }, [itemGroupContext, value]);

  const checked = state.has(value);

  const handleCheckedChange = (checked: CheckboxState) => {
    if (checked) addValues(value);
    else removeValues(value);
  };

  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} checked={checked} onCheckedChange={handleCheckedChange} />
      {children && <label htmlFor={id}>{children}</label>}
    </div>
  );
}

export default CheckboxGroupItem;
