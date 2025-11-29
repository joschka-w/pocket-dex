import { useId } from 'react';
import Checkbox from '../Checkbox';

import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  value: string;
}

function CheckboxGroupItem({ value, children }: Props) {
  const id = useId();

  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} />
      {children && <label htmlFor={id}>{children}</label>}
    </div>
  );
}

export default CheckboxGroupItem;
