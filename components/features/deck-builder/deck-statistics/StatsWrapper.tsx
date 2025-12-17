import { ReactNode } from 'react';

interface Props {
  title: string;
  children?: ReactNode;
}

function StatsWrapper({ title, children }: Props) {
  return (
    <div className="w-full flex flex-col items-center h-full justify-between">
      <h4 className="text-sm font-semibold text-text-muted">{title}</h4>

      {children}
    </div>
  );
}

export default StatsWrapper;
