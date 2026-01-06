'use client';

import { ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes } from 'react';

import useFilterState from '@/features/card-catalog/filtering/hooks/useFilterState';
import SearchInput from '@/shared/components/ui/SearchInput';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

function CardSearchInput({ className, ...props }: Props) {
  const { state, setters } = useFilterState();

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

export default CardSearchInput;
