import { cn } from '@/lib/utils/cn';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label: string | ReactNode;
  children?: ReactNode;
}

function InfoBox({ label, children, className, ...props }: Props) {
  return (
    <div
      {...props}
      className={cn(
        'bg-bg-1 inset-ring-bg-2 flex flex-1 flex-col gap-3 rounded-lg px-7 py-5 inset-ring-1',
        className,
      )}
    >
      <dt className="text-text-muted text-sm leading-none font-medium">{label}</dt>
      <dd className="leading-none font-semibold capitalize">{children}</dd>
    </div>
  );
}

export default InfoBox;
