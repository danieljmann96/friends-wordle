import React, { createContext, useMemo } from 'react';
import { ContextProviderProps, WordContextState } from 'types';

export const WordContext = createContext<WordContextState>({ word: '' });

export default function WordProvider({
  children
}: ContextProviderProps): JSX.Element {
  const DEFAULT_WORD = 'CHANDLER';

  const contextValue: WordContextState = useMemo(() => {
    return { word: DEFAULT_WORD };
  }, []);

  return (
    <WordContext.Provider value={contextValue}>{children}</WordContext.Provider>
  );
}
