import React, {
  createContext,
  useMemo,
  useState,
  useCallback,
  useEffect
} from 'react';
import { useSnackbar } from 'notistack';
import { alphabet, NUMBER_OF_GUESSES } from '../constants';
import { characters } from '../constants/characters';
import { useLocalScore } from '../hooks';
import { ContextProviderProps, Letter, LetterStatus } from 'types';

const wordToUse = characters[Math.floor(Math.random() * characters.length)];

interface WordContextState {
  activeRow: Letter[];
  guessWord: () => void;
  hasFinished: boolean;
  inputLetter: (letter: string) => void;
  removeLetter: () => void;
  usedRows: Letter[][];
  word: string;
  wrongLetters: string; //"A B C D E F"
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
  word: '',
  wrongLetters: ''
});

export default function WordProvider({
  children
}: ContextProviderProps): JSX.Element {
  const [activeRow, setActiveRow] = useState<Letter[]>(emptyRow);
  const [usedRows, setUsedRows] = useState<Letter[][]>([]);
  const [hasFinished, setHasFinished] = useState<boolean>(false);
  const [wrongLetters, setWrongLetters] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();
  const [totalPlayed, setTotalPlayed] = useLocalScore('totalPlayed');
  const [gamesWon, setGamesWon] = useLocalScore('gamesWon');
  const [currentStreak, setCurrentStreak] = useLocalScore('currentStreak');
  const [highestStreak, setHighestStreak] = useLocalScore('highestStreak');

  const updateScores = useCallback(
    (hasWon: boolean) => {
      setTotalPlayed(String(Number(totalPlayed) + 1));
      setGamesWon(String(Number(gamesWon) + (hasWon ? 1 : 0)));
      setHighestStreak(
        hasWon
          ? String(
              Number(currentStreak) + 1 > Number(highestStreak)
                ? Number(currentStreak) + 1
                : highestStreak
            )
          : highestStreak
      );
      setCurrentStreak(hasWon ? String(Number(currentStreak) + 1) : '0');
    },
    [
      setTotalPlayed,
      totalPlayed,
      setGamesWon,
      gamesWon,
      currentStreak,
      highestStreak,
      setCurrentStreak,
      setHighestStreak
    ]
  );

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

  const addToWrongLetters = useCallback(
    (letters: string[]) => {
      const existingArray = wrongLetters.split(' ');
      const uniqueLettersString = [
        ...new Set(letters.concat(existingArray))
      ].join(' ');
      setWrongLetters(uniqueLettersString);
    },
    [wrongLetters]
  );

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
      addToWrongLetters(
        newRow.filter(x => x.status === 'unused').map(x => x.display)
      );
      const isFinished = usedRows.length === NUMBER_OF_GUESSES - 1;
      const hasWon = letters.join('') === wordToUse;
      if (isFinished || hasWon) {
        updateScores(hasWon);
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
  }, [
    activeRow,
    enqueueSnackbar,
    usedRows.length,
    addToWrongLetters,
    updateScores
  ]);

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
      hasFinished,
      wrongLetters
    };
  }, [
    activeRow,
    usedRows,
    inputLetter,
    removeLetter,
    guessWord,
    hasFinished,
    wrongLetters
  ]);

  return (
    <WordContext.Provider value={contextValue}>{children}</WordContext.Provider>
  );
}
