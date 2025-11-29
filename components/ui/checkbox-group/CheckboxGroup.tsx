import { ReactNode } from 'react';
import CheckboxGroupItem from './CheckboxGroupItem';
import CheckboxGroup from './CheckboxGroupRoot';

function CheckboxGroup({ value, onValueChange, children }: Props) {
  return <CheckboxGroup>{children}</CheckboxGroup>;
}

CheckboxGroup.Item = CheckboxGroupItem;

export default CheckboxGroup;
