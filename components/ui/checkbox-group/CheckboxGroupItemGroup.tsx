'use client';

import { Children, isValidElement, ReactNode, useId } from 'react';
import Checkbox, { CheckboxState } from '../Checkbox';
import { useCheckboxGroupContext } from './CheckboxGroupContext';

interface Props {
  children?: ReactNode;
  label: string;
}

function CheckboxGroupItemGroup({ label, children }: Props) {
  const { state, addValue, removeValue } = useCheckboxGroupContext();
  const id = useId();

  // ! This is very fragile, find better solution
  const childValues =
    Children.map(children, child => {
      if (!isValidElement(child)) return;

      return child?.props?.value as string | undefined;
    })?.filter(Boolean) || [];

  const getCheckedState = (): CheckboxState => {
    if (state.isSupersetOf(new Set(childValues))) return true;
    else if (state.isDisjointFrom(new Set(childValues))) return false;
    else return 'indeterminate';
  };

  const handleCheckedChange = (checked: CheckboxState) => {
    if (checked) addValue(new Set(childValues));
    else removeValue(new Set(childValues));
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <Checkbox onCheckedChange={handleCheckedChange} checked={getCheckedState()} id={id} />
        <label htmlFor={id}>{label}</label>
      </div>
      <div role="group" className="pl-6 mb-1">
        {children}
      </div>
    </div>
  );
}

export default CheckboxGroupItemGroup;
