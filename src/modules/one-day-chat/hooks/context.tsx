import { createContext, Dispatch, useContext, useReducer, ReactNode, useMemo } from 'react';

import { reducer } from './reducer';
import { OneDayChatActions } from './actions';
import { OneDayChatState, initialOneDayChatState } from './state';

const OneDayChatContext = createContext<{
  state: OneDayChatState;
  dispatch: Dispatch<OneDayChatActions>;
}>({
  state: initialOneDayChatState,
  dispatch: () => undefined,
});

function OneDayChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialOneDayChatState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <OneDayChatContext.Provider value={value}>{children}</OneDayChatContext.Provider>;
}

function useOneDayChatState() {
  const context = useContext(OneDayChatContext);

  if (context === undefined) {
    throw new Error('useOneDayChatState must be used within a OneDayChatProvider');
  }

  return context;
}

export { OneDayChatProvider, useOneDayChatState };
