import { RefAttributes } from 'react';
import { Dialog as RadixDialog } from 'radix-ui';
import { XIcon } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

type ContentProps = RadixDialog.DialogContentProps & RefAttributes<HTMLDivElement>;

function DialogContent({ className, children, ...props }: ContentProps) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="bg-black/60 fixed inset-0 z-50">
        <RadixDialog.Content
          {...props}
          className={cn(
            'fixed left-1/2 top-1/2 max-w-2xl -translate-1/2 bg-bg-1 shadow-xl shadow-black/40 p-6 rounded-xl inset-ring-1 inset-ring-bg-2',
            className
          )}
        >
          <RadixDialog.Close className="absolute top-3 right-3 p-1 rounded-full text-text-muted cursor-pointer hover:text-text transition-colors">
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
    <RadixDialog.Title {...props} className={cn('text-2xl font-medium mb-3', className)}>
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
            'font-medium cursor-pointer inset-ring-1 inset-ring-bg-3 hover:bg-bg-3 transition-colors text-text px-3 py-2 rounded-lg',
            className
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
