import React, { useContext, useEffect } from 'react';
import uniqid from 'uniqid';
import { Grid } from '@mui/material';
import { WordContext } from '../providers/WordProvider';
import { NUMBER_OF_GUESSES } from '../constants';
import WordRow from './WordRow';

export default function LetterGrid(): JSX.Element {
  const { letters } = useContext(WordContext);

  return (
    <Grid
      alignItems="center"
      container
      justifyContent="center"
      spacing={2}
      sx={{ px: '5rem' }}
    >
      {Array(NUMBER_OF_GUESSES)
        .fill('')
        .map((x, i) => (
          <WordRow key={uniqid()} rowIndex={i} />
        ))}
    </Grid>
  );
}
