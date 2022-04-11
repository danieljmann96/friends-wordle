import React from 'react';
import { Box, Typography } from '@mui/material';
import { useLocalScore } from '../hooks';
import { ScoreKeys } from 'types';

interface IProps {
  scoreKey: ScoreKeys;
}

export default function StatIcon({ scoreKey }: IProps): JSX.Element {
  const [score] = useLocalScore(scoreKey);
  return (
    <Box
      sx={{
        borderRadius: '50%',
        backgroundColor: 'primary.dark',
        height: '100%',
        width: '100%'
      }}
    >
      <Typography sx={{ textAlign: 'center', fontSize: '2.5rem' }}>
        {score}
      </Typography>
    </Box>
  );
}
