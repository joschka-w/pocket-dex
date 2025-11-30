import { useMemo, useState } from 'react';

import { CheckboxState } from '@/components/ui/Checkbox';
import { useCheckboxGroupContext } from '@/components/ui/checkbox-group/root/CheckboxGroupContext';
import { NestedGroupContextType } from '@/components/ui/checkbox-group/nested-group/NestedGroupContext';

function useNestedCheckboxGroup() {
  const { state, addValues, removeValues } = useCheckboxGroupContext();
  const [registeredItems, setRegisteredItems] = useState(new Set<string>());

  // useMemo is used to prevent re-renders of child components that depend on this context
  // without this we would get a 'maximum update depth exceeded' error
  const contextValue: NestedGroupContextType = useMemo(
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

  return {
    checked: checkedState as CheckboxState,
    handleClick,
    contextValue,
  };
}

export default useNestedCheckboxGroup;
