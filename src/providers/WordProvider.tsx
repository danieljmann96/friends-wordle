import React, {
  createContext,
  useMemo,
  useState,
  useCallback,
  useEffect
} from 'react';
import { useSnackbar } from 'notistack';
import { alphabet, NUMBER_OF_GUESSES } from '../constants';
//import { characters } from '../constants/characters';
import { ContextProviderProps, Letter, LetterStatus } from 'types';

// eslint-disable-next-line
const wordToUse = 'TAG'; //characters[Math.floor(Math.random() * characters.length)];

interface WordContextState {
  activeRow: Letter[];
  guessWord: () => void;
  hasFinished: boolean;
  inputLetter: (letter: string) => void;
  removeLetter: () => void;
  usedRows: Letter[][];
  word: string;
}

const emptyRow = Array<string>(wordToUse.length)
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
      const word = wordToUse.split('');
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
      const hasWon = letters.join('') === wordToUse;
      if (isFinished || hasWon) {
        setHasFinished(true);
        setActiveRow(newRow);
        if (!hasWon) {
          enqueueSnackbar(
            `You didn't win! Better luck next time. The word was ${wordToUse}`,
            {
              variant: 'error'
            }
          );
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

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const input = e.key.toUpperCase();
      if (alphabet.includes(input)) {
        inputLetter(input);
      } else if (input === 'BACKSPACE') {
        removeLetter();
      } else if (input === 'ENTER') {
        guessWord();
      }
    }
    if (!hasFinished) document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [guessWord, hasFinished, inputLetter, removeLetter]);

  const contextValue: WordContextState = useMemo(() => {
    return {
      word: wordToUse,
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
