'use client';

import { useEffect } from 'react';
import { useAtom } from 'jotai';

import { deckFilterLoadingAtom } from '../../filtering/atoms/deckFilterLoadingAtom';
import LoadingPopup from '@/features/card-catalog/components/LoadingPopup';
import { DecksResult } from '../api/fetchDecks';

interface Props {
  decks: DecksResult;
}

function DecksLoadingPopup({ decks }: Props) {
  const [deckLoading, setDeckLoading] = useAtom(deckFilterLoadingAtom);

  useEffect(() => {
    setDeckLoading(false);
  }, [decks, setDeckLoading]);

  if (!deckLoading) return null;

  return (
    <div className="absolute inset-0 z-50 flex justify-center">
      <LoadingPopup className="fixed z-50 mt-20" />
    </div>
  );
}

export default DecksLoadingPopup;
