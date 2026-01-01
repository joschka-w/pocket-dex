import { cn } from '@/lib/utils/cn';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  error?: string;
  isConfirmed?: boolean;
}

function TextInput({ error, isConfirmed = false, className, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <input
        aria-invalid={Boolean(error)}
        type="text"
        className={cn(
          'bg-bg-2 placeholder:text-text-muted inset-ring-bg-3 rounded-xl px-3 py-2 placeholder:text-sm hover:inset-ring-1 focus:inset-ring-1 focus:inset-ring-neutral-400 focus:outline-none',
          isConfirmed && 'ring-confirmation ring-1',
          error && 'ring-danger ring-1',
          className,
        )}
        {...props}
      />
      {error && <span className="text-danger ml-1 text-sm">{error}</span>}
    </div>
  );
}

export default TextInput;
