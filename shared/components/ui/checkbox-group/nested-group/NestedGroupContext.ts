import { createContext, useContext } from 'react';

export interface NestedGroupContextType {
  registerItem: (value: string) => void;
  unregisterItem: (value: string) => void;
}

// creating context so that Items within NestedGroup can register themselves
// this way we can track which checkbox values belong to the NestedGroup and manage their state
export const NestedGroupContext = createContext<NestedGroupContextType | undefined>(undefined);

export const useNestedGroupContext = () => {
  const context = useContext(NestedGroupContext);

  return context
    ? {
        isInNestedGroup: true as const,
        ...context,
      }
    : {
        isInNestedGroup: false as const,
        registerItem: undefined,
        unregisterItem: undefined,
      };
};
