import React, { useContext } from 'react';
import uniqid from 'uniqid';
import { Grid } from '@mui/material';
import { WordContext } from '../providers/WordProvider';
import Letter from './Letter';

export default function LetterGrid(): JSX.Element {
  const { word } = useContext(WordContext);
  const letters = word.split('');
  return (
    <Grid alignItems="center" container justifyContent="center" spacing={2}>
      {letters.map(letter => (
        <Grid item key={uniqid()} xs={1}>
          <Letter letter={letter} />
        </Grid>
      ))}
    </Grid>
  );
}
