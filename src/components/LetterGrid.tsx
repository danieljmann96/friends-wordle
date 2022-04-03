import React, { useContext } from 'react';
import uniqid from 'uniqid';
import { Grid } from '@mui/material';
import { WordContext } from '../providers/WordProvider';
import WordRow from './WordRow';

export default function LetterGrid(): JSX.Element {
  const { usedRows, activeRow } = useContext(WordContext);

  return (
    <Grid
      alignItems="center"
      container
      justifyContent="center"
      spacing={2}
      sx={{ px: '5rem' }}
    >
      {usedRows.map(row => (
        <WordRow key={uniqid()} word={row} />
      ))}
      <WordRow word={activeRow} />
    </Grid>
  );
}
