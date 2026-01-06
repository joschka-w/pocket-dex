import Dialog from '@/shared/components/ui/Dialog';
import Link from 'next/link';

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
}

function DeckFormSuccessModal({ open, setOpen }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={open => setOpen(open)}>
      <Dialog.Content>
        <Dialog.Title>Deck Created Successfully!</Dialog.Title>
        <Dialog.Description>
          Your deck has been published. You can view it{' '}
          <Link href={'/deck/${deckId}'} className="text-text underline-offset-3 hover:underline">
            here
          </Link>{' '}
          or continue creating more decks.
        </Dialog.Description>
        <Dialog.Close>Close</Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default DeckFormSuccessModal;
