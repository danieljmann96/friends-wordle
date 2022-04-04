import React, { createContext, useMemo, useState, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { DEFAULT_WORD, alphabet, NUMBER_OF_GUESSES } from '../constants';
import { ContextProviderProps, Letter, LetterStatus } from 'types';

interface WordContextState {
  activeRow: Letter[];
  guessWord: () => void;
  hasFinished: boolean;
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
  guessWord: () => null,
  hasFinished: false,
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
  const [hasFinished, setHasFinished] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

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

  const guessWord = useCallback(() => {
    const letters = activeRow.map(x => x.display);
    if (!letters.includes('')) {
      const word = DEFAULT_WORD.split('');
      const statuses: LetterStatus[] = Array(letters.length).fill('unused');
      //go through correct letters
      letters.forEach((letter, i) => {
        if (word[i] === letter) {
          statuses[i] = 'rightPlace';
          word[i] = 'null';
        }
      });
      //go through correct letters in wrong place
      const wordLeft = word.filter(x => x !== 'null');
      letters.forEach((letter, i) => {
        if (statuses[i] === 'unused' && wordLeft.includes(letter)) {
          statuses[i] = 'wrongPlace';
          wordLeft[wordLeft.indexOf(letter)] = 'null';
        }
      });
      const newRow = activeRow.map<Letter>((letter, i) => {
        return { display: letter.display, status: statuses[i] };
      });
      const isFinished = usedRows.length === NUMBER_OF_GUESSES - 1;
      const hasWon = letters.join('') === DEFAULT_WORD;
      if (isFinished || hasWon) {
        setHasFinished(true);
        setActiveRow(newRow);
        if (!hasWon) {
          enqueueSnackbar("You didn't win! Better luck next time", {
            variant: 'error'
          });
        } else {
          enqueueSnackbar(`You won in ${usedRows.length + 1} guesses!`, {
            variant: 'success'
          });
        }
      } else {
        setUsedRows(usedState => [...usedState, newRow]);
        setActiveRow(emptyRow);
      }
    }
  }, [activeRow, enqueueSnackbar, usedRows.length]);

  const contextValue: WordContextState = useMemo(() => {
    return {
      word: DEFAULT_WORD,
      activeRow,
      usedRows,
      inputLetter,
      removeLetter,
      guessWord,
      hasFinished
    };
  }, [activeRow, usedRows, inputLetter, removeLetter, guessWord, hasFinished]);

  return (
    <WordContext.Provider value={contextValue}>{children}</WordContext.Provider>
  );
}
