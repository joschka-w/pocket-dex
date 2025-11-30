'use client';

import { createContext, Dispatch, SetStateAction, useContext, ReactNode } from 'react';

interface CheckboxGroupContext {
  state: Set<string>;
  removeValues: (value: string | Set<string>) => void;
  addValues: (value: string | Set<string>) => void;
}

export const CheckboxGroupContext = createContext<CheckboxGroupContext | undefined>(undefined);

interface Props {
  children?: ReactNode;
  value: Set<string>;
  setValue: Dispatch<SetStateAction<Set<string>>>;
}

export function CheckboxGroupContextProvider({ value, setValue, children }: Props) {
  const removeValues = (value: string | Set<string>) => {
    setValue(prevSet => {
      const newSet = new Set(prevSet);

      if (typeof value === 'string') {
        newSet.delete(value);
        return newSet;
      } else return newSet.difference(value);
    });
  };

  const addValues = (value: string | Set<string>) => {
    setValue(prevSet => {
      const newSet = new Set(prevSet);

      if (typeof value === 'string') return newSet.add(value);
      else return newSet.union(value);
    });
  };

  const contextValue: CheckboxGroupContext = {
    state: value,
    removeValues,
    addValues,
  };

  return (
    <CheckboxGroupContext.Provider value={contextValue}>{children}</CheckboxGroupContext.Provider>
  );
}

export const useCheckboxGroupContext = () => {
  const context = useContext(CheckboxGroupContext);

  if (!context)
    throw new Error(
      'useCheckboxGroupContext can only be used within a CheckboxGroupContextProvider.'
    );

  return context;
};
