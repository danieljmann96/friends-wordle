import React from 'react';
import { Box, Typography } from '@mui/material';
import { Letter as LetterType } from 'types';

interface IProps {
  letter: LetterType;
}

export default function Letter(props: IProps): JSX.Element {
  const { letter } = props;
  return (
    <Box
      component="span"
      sx={{
        backgroundColor: 'secondary.dark',
        gap: 2,
        display: 'grid',
        minHeight: 60
      }}
    >
      <Typography
        component="span"
        sx={{ fontSize: '2.5rem', textAlign: 'center' }}
      >
        {letter.display}
      </Typography>
    </Box>
  );
}
