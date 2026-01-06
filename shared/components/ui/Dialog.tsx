import { RefAttributes } from 'react';
import { Dialog as RadixDialog } from 'radix-ui';
import { XIcon } from 'lucide-react';

import { cn } from '@/shared/utils/cn';

type ContentProps = RadixDialog.DialogContentProps & RefAttributes<HTMLDivElement>;

function DialogContent({ className, children, ...props }: ContentProps) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/60">
        <RadixDialog.Content
          {...props}
          className={cn(
            'bg-bg-1 inset-ring-bg-2 fixed top-1/2 left-1/2 max-w-2xl -translate-1/2 rounded-xl p-6 shadow-xl inset-ring-1 shadow-black/40',
            className,
          )}
        >
          <RadixDialog.Close className="text-text-muted hover:text-text absolute top-3 right-3 cursor-pointer rounded-full p-1 transition-colors">
            <XIcon />
          </RadixDialog.Close>

          {children}
        </RadixDialog.Content>
      </RadixDialog.Overlay>
    </RadixDialog.Portal>
  );
}

type TitleProps = RadixDialog.DialogTitleProps & RefAttributes<HTMLHeadingElement>;

function DialogTitle({ className, children, ...props }: TitleProps) {
  return (
    <RadixDialog.Title {...props} className={cn('mb-3 text-2xl font-medium', className)}>
      {children}
    </RadixDialog.Title>
  );
}

type DescriptionProps = RadixDialog.DialogDescriptionProps & RefAttributes<HTMLParagraphElement>;

function DialogDescription({ className, children, ...props }: DescriptionProps) {
  return (
    <RadixDialog.Description {...props} className={cn('text-text-muted mb-3', className)}>
      {children}
    </RadixDialog.Description>
  );
}

type CloseProps = Omit<RadixDialog.DialogCloseProps, 'asChild'> & RefAttributes<HTMLButtonElement>;

function DialogClose({ className, children, ...props }: CloseProps) {
  return (
    <div className="flex justify-end">
      <RadixDialog.Close {...props} asChild>
        <button
          className={cn(
            'inset-ring-bg-3 hover:bg-bg-3 text-text cursor-pointer rounded-lg px-3 py-2 font-medium inset-ring-1 transition-colors',
            className,
          )}
        >
          {children}
        </button>
      </RadixDialog.Close>
    </div>
  );
}

const Dialog = {
  Root: RadixDialog.Root,
  Trigger: RadixDialog.Trigger,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
};

export default Dialog;
