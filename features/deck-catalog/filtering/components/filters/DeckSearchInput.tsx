'use client';

import { ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes } from 'react';

import SearchInput from '@/shared/components/ui/SearchInput';
import { useDeckFilterState } from '../../hooks/useDeckFilterState';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

function DeckSearchInput({ className, ...props }: Props) {
  const { state, setters } = useDeckFilterState();

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setters.searchQuery(e.target.value);
  };

  return (
    <SearchInput
      className={className}
      value={state.searchQuery}
      onChange={handleChange}
      {...props}
    />
  );
}

export default DeckSearchInput;
