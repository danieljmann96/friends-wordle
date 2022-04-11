import React from 'react';
import { Paper, Typography } from '@mui/material';
import { isMobile } from 'react-device-detect';
import { Letter as LetterType } from 'types';

const themeConverter = {
  unused: 'secondary.main',
  wrongPlace: 'warning.main',
  rightPlace: 'success.main'
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
        height: isMobile ? 30 : 60,
        width: isMobile ? 25 : 100,
        display: 'inline-block'
      }}
    >
      <Typography
        component="span"
        sx={{
          fontSize: isMobile ? '1rem' : '2.5rem',
          textAlign: 'center',
          color:
            letter.display === '' ? themeConverter[letter.status] : undefined
        }}
      >
        {letter.display === '' ? '?' : letter.display}
      </Typography>
    </Paper>
  );
}
