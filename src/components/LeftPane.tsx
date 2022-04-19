import React, { SetStateAction, Dispatch } from 'react';
import { Drawer, Box, List } from '@mui/material';
import StatListItem from './StatListItem';
import { useAllLocalScoreValues } from '../hooks';
import ScoreBreakdownGraph from './ScoreBreakdownGraph';

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function LeftPane({ open, setOpen }: IProps): JSX.Element {
  const allScores = useAllLocalScoreValues();
  return (
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
  );
}
