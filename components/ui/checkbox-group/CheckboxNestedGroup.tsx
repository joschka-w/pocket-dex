'use client';

import { createContext, ReactNode, useContext, useId, useMemo, useState } from 'react';
import Checkbox from '../Checkbox';
import { useCheckboxGroupContext } from './CheckboxGroupContext';
import CheckboxGroupItemWrapper from './CheckboxGroupItemWrapper';

interface NestedGroupContext {
  registerItem: (value: string) => void;
  unregisterItem: (value: string) => void;
}

// creating context so that Items within NestedGroup can register themselves
// this way we can track which checkbox values belong to the NestedGroup and manage their state
const NestedGroupContext = createContext<NestedGroupContext | undefined>(undefined);

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

interface Props {
  children?: ReactNode;
  label: string;
}

function CheckboxNestedGroup({ label, children }: Props) {
  const { state, addValues, removeValues } = useCheckboxGroupContext();
  const [registeredItems, setRegisteredItems] = useState(new Set<string>());
  const id = useId();

  // useMemo is used to prevent re-renders of child components that depend on this context
  // without this we would get a 'maximum update depth exceeded' error
  const contextValue: NestedGroupContext = useMemo(
    () => ({
      registerItem: (value: string) => {
        setRegisteredItems(prev => {
          const newSet = new Set(prev);
          newSet.add(value);
          return newSet;
        });
      },
      unregisterItem: (value: string) => {
        setRegisteredItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(value);
          return newSet;
        });
      },
    }),
    []
  );

  const checkedState = useMemo(() => {
    if (state.isDisjointFrom(registeredItems) || registeredItems.size === 0) return false;
    else if (state.isSupersetOf(registeredItems)) return true;
    else return 'indeterminate';
  }, [registeredItems, state]);

  const handleClick = () => {
    if (!checkedState) addValues(registeredItems);
    else removeValues(registeredItems);
  };

  return (
    <NestedGroupContext.Provider value={contextValue}>
      <div>
        <CheckboxGroupItemWrapper onClick={handleClick}>
          <Checkbox checked={checkedState} onCheckedChange={handleClick} id={id} />
          <label onClick={e => e.preventDefault()} className="cursor-pointer" htmlFor={id}>
            {label}
          </label>
        </CheckboxGroupItemWrapper>

        <div role="group">{children}</div>
      </div>
    </NestedGroupContext.Provider>
  );
}

export default CheckboxNestedGroup;
