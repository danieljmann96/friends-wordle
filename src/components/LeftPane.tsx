import React, { SetStateAction, Dispatch, lazy, Suspense } from 'react';
import { Drawer, Box, List, CircularProgress } from '@mui/material';
import { useAllLocalScoreValues } from '../hooks';
const StatListItem = lazy(() => import('./StatListItem'));
const ScoreBreakdownGraph = lazy(() => import('./ScoreBreakdownGraph'));

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function LeftPane({ open, setOpen }: IProps): JSX.Element {
  const allScores = useAllLocalScoreValues();
  return (
    <Suspense fallback={<CircularProgress />}>
      <Drawer anchor="left" onClose={() => setOpen(false)} open={open}>
        <Box role="presentation" sx={{ width: 350 }}>
          <List>
            {[...allScores].map(scoreRecord => (
              <StatListItem
                key={scoreRecord[0]}
                score={scoreRecord[1]}
                scoreKey={scoreRecord[0]}
              />
            ))}
            <StatListItem
              score={
                allScores.get('totalPlayed') === '0'
                  ? '0'
                  : `${Math.round(
                      (Number(allScores.get('gamesWon')) /
                        Number(allScores.get('totalPlayed'))) *
                        100
                    )}%`
              }
              scoreKey="Win Percentage"
              shrinkIconText={allScores.get('totalPlayed') !== '0'}
            />
            <ScoreBreakdownGraph />
          </List>
        </Box>
      </Drawer>
    </Suspense>
  );
}
