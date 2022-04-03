import React, { createContext, useMemo, useState } from 'react';
import { DEFAULT_WORD } from '../constants';
import { ContextProviderProps } from 'types';

interface WordContextState {
  activeRow: string[];
  usedRows: string[][];
  word: string;
}

const emptyRow = Array(DEFAULT_WORD.length).fill('');

export const WordContext = createContext<WordContextState>({
  activeRow: emptyRow,
  usedRows: [],
  word: ''
});

export default function WordProvider({
  children
}: ContextProviderProps): JSX.Element {
  const [activeRow, setActiveRow] = useState<string[]>(emptyRow);
  const [usedRows, setUsedRows] = useState<string[][]>([]);

  const contextValue: WordContextState = useMemo(() => {
    return { word: DEFAULT_WORD, activeRow, usedRows };
  }, [activeRow, usedRows]);

  return (
    <WordContext.Provider value={contextValue}>{children}</WordContext.Provider>
  );
}
