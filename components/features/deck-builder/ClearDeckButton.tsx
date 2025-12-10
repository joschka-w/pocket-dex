import { AlertDialog } from 'radix-ui';

interface Props {
  clearDeck: () => void;
}

function ClearDeckButton({ clearDeck }: Props) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="ml-auto text-sm text-text-muted hover:text-text transition-colors hover:underline cursor-pointer">
          Clear Deck
        </button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black/60 fixed inset-0 z-50">
          <AlertDialog.Content className="fixed left-1/2 top-1/2 max-w-2xl -translate-1/2 bg-bg-1 shadow-xl shadow-black/40 p-6 rounded-xl inset-ring-1 inset-ring-bg-2">
            <AlertDialog.Title className="text-2xl font-medium mb-3">
              Are you sure?
            </AlertDialog.Title>

            <AlertDialog.Description className="text-text-muted mb-3">
              This action can not be undone. This will permanently delete this deck and all cards
              will be removed. Do you want to continue?
            </AlertDialog.Description>

            <div className="flex justify-end gap-2">
              <AlertDialog.Cancel asChild>
                <button className="font-medium px-3 py-2 rounded-lg hover:text-text transition-colors text-text-muted cursor-pointer">
                  Cancel
                </button>
              </AlertDialog.Cancel>

              <AlertDialog.Action asChild>
                <button
                  onClick={clearDeck}
                  className="font-medium cursor-pointer bg-danger/40 hover:bg-danger/60 transition-colors text-danger-light px-3 py-2 rounded-lg"
                >
                  Yes, delete deck
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Overlay>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default ClearDeckButton;
