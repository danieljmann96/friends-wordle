import React from 'react';
import uniqid from 'uniqid';
import { Grid } from '@mui/material';
import Letter from './Letter';

interface IProps {
  word: string[];
}

export default function WordRow({ word }: IProps): JSX.Element {
  return (
    <>
      {word.map(letter => (
        <Grid item key={uniqid()} xs={12 / word.length}>
          <Letter letter={letter} />
        </Grid>
      ))}
    </>
  );
}
