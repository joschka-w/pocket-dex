import { ReactNode } from 'react';

interface Props {
  title: string;
  children?: ReactNode;
}

function StatsWrapper({ title, children }: Props) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <h4 className="text-text-muted text-sm font-semibold">{title}</h4>

      {children}
    </div>
  );
}

export default StatsWrapper;
