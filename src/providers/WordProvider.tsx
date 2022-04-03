import React, { createContext, useMemo, useState } from 'react';
import { NUMBER_OF_GUESSES, DEFAULT_WORD } from '../constants';
import { ContextProviderProps } from 'types';

interface WordContextState {
  letters: string[][];
  activeRow: number;
  usedRows: number[];
  word: string;
}

const initialLetters = Array(NUMBER_OF_GUESSES).fill(
  Array(DEFAULT_WORD.length).fill('')
);

export const WordContext = createContext<WordContextState>({
  letters: initialLetters,
  activeRow: 0,
  usedRows: [],
  word: ''
});

export default function WordProvider({
  children
}: ContextProviderProps): JSX.Element {
  const [letters, setLetters] = useState<string[][]>(initialLetters);
  const [activeRow, setActiveRow] = useState<number>(0);
  const [usedRows, setUsedRows] = useState<number[]>([]);

  const contextValue: WordContextState = useMemo(() => {
    return { word: DEFAULT_WORD, letters, activeRow, usedRows };
  }, [letters, activeRow, usedRows]);

  return (
    <WordContext.Provider value={contextValue}>{children}</WordContext.Provider>
  );
}
