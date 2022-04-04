import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Letter as LetterType } from 'types';

const themeConverter = {
  unused: 'secondary.dark',
  wrongPlace: 'warning.light',
  rightPlace: 'success.dark'
};

interface IProps {
  letter: LetterType;
}

export default function Letter(props: IProps): JSX.Element {
  const { letter } = props;
  return (
    <Paper
      component="span"
      sx={{
        backgroundColor: themeConverter[letter.status],
        height: 60,
        width: 100,
        display: 'inline-block'
      }}
    >
      <Typography
        component="span"
        sx={{ fontSize: '2.5rem', textAlign: 'center' }}
      >
        {letter.display}
      </Typography>
    </Paper>
  );
}
