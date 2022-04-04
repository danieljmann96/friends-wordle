import React, { useContext } from 'react';
import uniqid from 'uniqid';
import { Grid, useMediaQuery } from '@mui/material';
import { WordContext } from '../providers/WordProvider';
import WordRow from './WordRow';

export default function LetterGrid(): JSX.Element {
  const { usedRows, activeRow } = useContext(WordContext);
  const matchesLarge = useMediaQuery('(min-width:1750px)');
  const matchesMed = useMediaQuery('(max-width:1100px)');
  const matchesSm = useMediaQuery('(max-width:800px)');

  return (
    <Grid
      container
      justifyContent="center"
      spacing={2}
      sx={{
        px: matchesLarge ? '30%' : matchesSm ? 0 : matchesMed ? '10%' : '20%'
      }}
    >
      {usedRows.map(row => (
        <WordRow key={uniqid()} word={row} />
      ))}
      <WordRow word={activeRow} />
    </Grid>
  );
}
