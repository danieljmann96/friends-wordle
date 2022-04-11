import React from 'react';
import uniqid from 'uniqid';
import { Grid } from '@mui/material';
import Letter from './Letter';
import { Letter as LetterType } from 'types';

interface IProps {
  word: LetterType[];
}

export default function WordRow({ word }: IProps): JSX.Element {
  return (
    <>
      {word.map(letter => (
        <Grid
          item
          key={uniqid()}
          sx={{ textAlign: 'center', maxHeight: 100 }}
          xs={12 / word.length}
        >
          <Letter letter={letter} />
        </Grid>
      ))}
    </>
  );
}
