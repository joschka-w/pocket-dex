'use client';

import { createContext, Dispatch, SetStateAction, useContext, ReactNode } from 'react';

interface CheckboxGroupContext {
  state: Set<string>;
  removeValue: (value: string) => void;
  addValue: (value: string) => void;
}

export const CheckboxGroupContext = createContext<CheckboxGroupContext | undefined>(undefined);

interface Props {
  children?: ReactNode;
  value: Set<string>;
  setValue: Dispatch<SetStateAction<Set<string>>>;
}

export function CheckboxGroupContextProvider({ value, setValue, children }: Props) {
  const removeValue = (value: string) => {
    setValue(prevSet => {
      const newSet = new Set(prevSet);
      newSet.delete(value);

      return newSet;
    });
  };

  const addValue = (value: string) => {
    setValue(prevSet => {
      const newSet = new Set(prevSet);
      newSet.add(value);

      return newSet;
    });
  };

  const contextValue: CheckboxGroupContext = {
    state: value,
    removeValue,
    addValue,
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
