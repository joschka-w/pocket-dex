import { cn } from '@/lib/utils/cn';
import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

interface Props
  extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  error?: string;
}

function TextArea({ error, className, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <textarea
        aria-invalid={Boolean(error)}
        className={cn(
          'bg-bg-2 px-3 py-2 rounded-xl placeholder:text-text-muted placeholder:text-sm hover:inset-ring-1 inset-ring-bg-3 focus:outline-none focus:inset-ring-1 focus:inset-ring-neutral-400',
          error && 'ring-1 ring-danger',
          className
        )}
        {...props}
      />
      {error && <span className="ml-1 text-sm text-danger">{error}</span>}
    </div>
  );
}

export default TextArea;
