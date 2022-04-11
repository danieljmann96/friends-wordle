import React, { useContext } from 'react';
import uniqid from 'uniqid';
import { Grid } from '@mui/material';
import { WordContext } from '../providers/WordProvider';
import WordRow from './WordRow';

export default function LetterGrid(): JSX.Element {
  const { usedRows, activeRow, word } = useContext(WordContext);
  // const matchesLarge = useMediaQuery('(min-width:1750px)');
  // const matchesMed = useMediaQuery('(max-width:1100px)');
  // const matchesSm = useMediaQuery('(max-width:800px)');

  return (
    <Grid
      alignItems="flex-start"
      container
      justifyContent="center"
      sx={{
        width: `${150 * word.length}px`,
        height: `${(usedRows.length + 1) * 11}%`
      }}
    >
      {usedRows.map(row => (
        <WordRow key={uniqid()} word={row} />
      ))}
      <WordRow word={activeRow} />
    </Grid>
  );
}
