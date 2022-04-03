import React from 'react';
import { Box, Typography } from '@mui/material';

interface IProps {
  letter: string;
}

export default function Letter(props: IProps): JSX.Element {
  const { letter } = props;
  return (
    <Box
      component="span"
      sx={{
        p: '2rem',
        backgroundColor: 'secondary.dark',
        gap: 2,
        display: 'grid'
      }}
    >
      <Typography
        component="span"
        sx={{ fontSize: '2.5rem', textAlign: 'center' }}
      >
        {letter}
      </Typography>
    </Box>
  );
}
