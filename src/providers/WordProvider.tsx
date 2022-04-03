import React, { createContext, useMemo, useState, useCallback } from 'react';
import { DEFAULT_WORD, alphabet } from '../constants';
import { ContextProviderProps, Letter } from 'types';

interface WordContextState {
  activeRow: Letter[];
  inputLetter: (letter: string) => void;
  removeLetter: () => void;
  usedRows: Letter[][];
  word: string;
}

const emptyRow = Array<string>(DEFAULT_WORD.length)
  .fill('')
  .map<Letter>(x => {
    return { display: x, status: 'unused' };
  });

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
  const [activeRow, setActiveRow] = useState<Letter[]>(emptyRow);
  const [usedRows, setUsedRows] = useState<Letter[][]>([]);

  const inputLetter = useCallback(
    (letter: string) => {
      const activeLetters = activeRow.map(x => x.display);
      if (activeLetters.includes('')) {
        const indexToChange = activeLetters.indexOf('');
        setActiveRow(rowState =>
          rowState
            .slice(0, indexToChange)
            .concat(
              { display: letter, status: 'unused' },
              rowState.slice(indexToChange + 1)
            )
        );
      }
    },
    [activeRow]
  );

  const removeLetter = useCallback(() => {
    const activeLetters = activeRow.map(x => x.display);
    if (alphabet.includes(activeLetters[0])) {
      const indexToChange = activeLetters.includes('')
        ? activeLetters.indexOf('') - 1
        : activeLetters.length - 1;
      setActiveRow(rowState =>
        rowState
          .slice(0, indexToChange)
          .concat(
            { display: '', status: 'unused' },
            rowState.slice(indexToChange + 1)
          )
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
