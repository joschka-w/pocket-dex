import { cn } from '@/shared/utils/cn';
import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> {
  error?: string;
}

function TextArea({ error, className, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <textarea
        aria-invalid={Boolean(error)}
        className={cn(
          'bg-bg-2 placeholder:text-text-muted inset-ring-bg-3 rounded-xl px-3 py-2 placeholder:text-sm hover:inset-ring-1 focus:inset-ring-1 focus:inset-ring-neutral-400 focus:outline-none',
          error && 'ring-danger ring-1',
          className,
        )}
        {...props}
      />
      {error && <span className="text-danger ml-1 text-sm">{error}</span>}
    </div>
  );
}

export default TextArea;
