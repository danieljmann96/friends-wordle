import React, { useRef, useContext } from 'react';
import Keyboard, { KeyboardReactInterface } from 'react-simple-keyboard';
import { AppBar } from '@mui/material';
import { keyboardLayout, alphabet } from '../../constants';
import { WordContext } from '../../providers/WordProvider';
import 'react-simple-keyboard/build/css/index.css';
import './index.css';

export default function KeyboardInput(): JSX.Element {
  const { inputLetter, removeLetter, guessWord } = useContext(WordContext);
  const keyboardRef = useRef<KeyboardReactInterface | null>(null);

  const handleChange = (letter: string) => {
    if (alphabet.includes(letter)) {
      inputLetter(letter);
    } else if (letter === '{bksp}') {
      removeLetter();
    } else if (letter === '{enter}') {
      guessWord();
    }
    if (keyboardRef.current) {
      keyboardRef.current.clearInput();
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{ top: 'auto', bottom: 0, alignItems: 'center' }}
    >
      <Keyboard
        disableButtonHold
        keyboardRef={r => (keyboardRef.current = r)}
        layout={{ default: keyboardLayout, shift: keyboardLayout }}
        onKeyPress={handleChange}
        physicalKeyboardHighlight
        useButtonTag
      />
    </AppBar>
  );
}
