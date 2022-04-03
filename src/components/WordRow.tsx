import React, { useContext } from 'react';
import uniqid from 'uniqid';
import { Grid } from '@mui/material';
import Letter from './Letter';
import { WordContext } from '../providers/WordProvider';

interface IProps {
  rowIndex: number;
}

export default function WordRow({ rowIndex }: IProps): JSX.Element {
  const { letters } = useContext(WordContext);

  return (
    <>
      {letters[rowIndex].map(letter => (
        <Grid item key={uniqid()} xs={12 / letters[0].length}>
          <Letter letter={letter} />
        </Grid>
      ))}
    </>
  );
}
