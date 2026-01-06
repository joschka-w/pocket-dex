import { cn } from '@/shared/utils/cn';
import { AlertDialog } from 'radix-ui';
import { RefAttributes } from 'react';

// Simplified and styled abstraction of radix's AlertDialog

type ContentProps = AlertDialog.AlertDialogContentProps & RefAttributes<HTMLDivElement>;

function AlertContent({ className, children, ...props }: ContentProps) {
  return (
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="fixed inset-0 z-50 bg-black/60">
        <AlertDialog.Content
          {...props}
          className={cn(
            'bg-bg-1 inset-ring-bg-2 fixed top-1/2 left-1/2 max-w-2xl -translate-1/2 rounded-xl p-6 shadow-xl inset-ring-1 shadow-black/40',
            className,
          )}
        >
          {children}
        </AlertDialog.Content>
      </AlertDialog.Overlay>
    </AlertDialog.Portal>
  );
}

type TitleProps = AlertDialog.AlertDialogTitleProps & RefAttributes<HTMLHeadingElement>;

function AlertTitle({ children, className, ...props }: TitleProps) {
  return (
    <AlertDialog.Title {...props} className={cn('mb-3 text-2xl font-medium', className)}>
      {children}
    </AlertDialog.Title>
  );
}

type AlertProps = AlertDialog.AlertDialogDescriptionProps & RefAttributes<HTMLParagraphElement>;

function AlertDescription({ className, children, ...props }: AlertProps) {
  return (
    <AlertDialog.Description {...props} className={cn('text-text-muted mb-3', className)}>
      {children}
    </AlertDialog.Description>
  );
}

type ActionProps = Omit<AlertDialog.AlertDialogActionProps, 'asChild'> &
  RefAttributes<HTMLButtonElement>;

function AlertAction({ className, children, ...props }: ActionProps) {
  return (
    <AlertDialog.Action {...props} asChild>
      <button
        className={cn(
          'bg-danger/40 hover:bg-danger/60 text-danger-light cursor-pointer rounded-lg px-3 py-2 font-medium transition-colors',
          className,
        )}
      >
        {children}
      </button>
    </AlertDialog.Action>
  );
}

type CancelProps = Omit<AlertDialog.AlertDialogCancelProps, 'asChild'> &
  RefAttributes<HTMLButtonElement>;

function AlertCancel({ className, children, ...props }: CancelProps) {
  return (
    <AlertDialog.Cancel {...props} asChild>
      <button
        className={cn(
          'hover:text-text text-text-muted cursor-pointer rounded-lg px-3 py-2 font-medium transition-colors',
          className,
        )}
      >
        {children || 'Cancel'}
      </button>
    </AlertDialog.Cancel>
  );
}

const Alert = {
  Root: AlertDialog.Root,
  Trigger: AlertDialog.Trigger,
  Content: AlertContent,
  Title: AlertTitle,
  Description: AlertDescription,
  Cancel: AlertCancel,
  Action: AlertAction,
};

export default Alert;
