import React, { createContext, useMemo, useState, useCallback } from 'react';
import { DEFAULT_WORD, alphabet } from '../constants';
import { ContextProviderProps } from 'types';

interface WordContextState {
  activeRow: string[];
  inputLetter: (letter: string) => void;
  removeLetter: () => void;
  usedRows: string[][];
  word: string;
}

const emptyRow = Array(DEFAULT_WORD.length).fill('');

export const WordContext = createContext<WordContextState>({
  activeRow: emptyRow,
  inputLetter: () => null,
  removeLetter: () => null,
  usedRows: [],
  word: ''
});

export default function WordProvider({
  children
}: ContextProviderProps): JSX.Element {
  const [activeRow, setActiveRow] = useState<string[]>(emptyRow);
  const [usedRows, setUsedRows] = useState<string[][]>([]);

  const inputLetter = useCallback(
    (letter: string) => {
      if (activeRow.includes('')) {
        const indexToChange = activeRow.indexOf('');
        setActiveRow(rowState =>
          rowState
            .slice(0, indexToChange)
            .concat(letter, rowState.slice(indexToChange + 1))
        );
      }
    },
    [activeRow]
  );

  const removeLetter = useCallback(() => {
    if (alphabet.includes(activeRow[0])) {
      const indexToChange = activeRow.includes('')
        ? activeRow.indexOf('') - 1
        : activeRow.length - 1;
      setActiveRow(rowState =>
        rowState
          .slice(0, indexToChange)
          .concat('', rowState.slice(indexToChange + 1))
      );
    }
  }, [activeRow]);

  const contextValue: WordContextState = useMemo(() => {
    return {
      word: DEFAULT_WORD,
      activeRow,
      usedRows,
      inputLetter,
      removeLetter
    };
  }, [activeRow, usedRows, inputLetter, removeLetter]);

  return (
    <WordContext.Provider value={contextValue}>{children}</WordContext.Provider>
  );
}
