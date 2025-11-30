'use client';

import { useEffect, useId, ReactNode } from 'react';

import { useNestedGroupContext } from './CheckboxNestedGroupContext';
import { useCheckboxGroupContext } from './CheckboxGroupContext';
import Checkbox from '../Checkbox';
import CheckboxGroupItemWrapper from './CheckboxGroupItemWrapper';

interface Props {
  children?: ReactNode;
  value: string;
}

function CheckboxGroupItem({ value, children }: Props) {
  const { state, addValues, removeValues } = useCheckboxGroupContext();
  const { isInNestedGroup, registerItem, unregisterItem } = useNestedGroupContext();
  const id = useId();

  useEffect(() => {
    if (!isInNestedGroup) return;

    registerItem(value);

    return () => {
      unregisterItem(value);
    };
  }, [isInNestedGroup, registerItem, unregisterItem, value]);

  const checked = state.has(value);

  const handleClick = () => {
    if (!checked) addValues(value);
    else removeValues(value);
  };

  return (
    <CheckboxGroupItemWrapper
      onClick={handleClick}
      variant={isInNestedGroup ? 'nested' : 'default'}
    >
      <Checkbox id={id} checked={checked} onCheckedChange={handleClick} />
      {children && (
        <label onClick={e => e.preventDefault()} className="cursor-pointer" htmlFor={id}>
          {children}
        </label>
      )}
    </CheckboxGroupItemWrapper>
  );
}

export default CheckboxGroupItem;
