import Alert from '@/shared/components/ui/Alert';

interface Props {
  clearDeck: () => void;
}

function ClearDeckButton({ clearDeck }: Props) {
  return (
    <Alert.Root>
      <Alert.Trigger asChild>
        <button className="text-text-muted hover:text-text ml-auto cursor-pointer text-sm transition-colors hover:underline">
          Clear Deck
        </button>
      </Alert.Trigger>

      <Alert.Content>
        <Alert.Title>Are you sure?</Alert.Title>

        <Alert.Description>
          This action can not be undone. This will permanently delete this deck and all cards will
          be removed. Do you want to continue?
        </Alert.Description>

        <div className="flex justify-end gap-2">
          <Alert.Cancel />
          <Alert.Action onClick={clearDeck}>Yes, delete deck</Alert.Action>
        </div>
      </Alert.Content>
    </Alert.Root>
  );
}

export default ClearDeckButton;
