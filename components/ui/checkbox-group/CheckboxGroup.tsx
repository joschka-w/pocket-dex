import { ReactNode } from 'react';
import CheckboxGroupItem from './CheckboxGroupItem';

interface Props {
  children?: ReactNode;
}

function CheckboxGroup({ children }: Props) {
  return <fieldset>{children}</fieldset>;
}

CheckboxGroup.Item = CheckboxGroupItem;

export default CheckboxGroup;
