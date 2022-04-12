import React from 'react';
import {
  Box,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import _ from 'lodash';

interface IProps {
  score: string;
  scoreKey: string;
  shrinkIconText?: boolean;
}

export default function StatListItem({
  score,
  scoreKey,
  shrinkIconText = false
}: IProps): JSX.Element {
  return (
    <ListItem>
      <ListItemText
        primary={_.startCase(scoreKey)}
        primaryTypographyProps={{ sx: { fontSize: '1.5rem' } }}
      />
      <ListItemIcon>
        <Box
          sx={{
            borderRadius: '50%',
            backgroundColor: 'primary.dark',
            minHeight: 60,
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex'
          }}
        >
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: shrinkIconText ? '1.5rem' : '2.5rem'
            }}
          >
            {score}
          </Typography>
        </Box>
      </ListItemIcon>
    </ListItem>
  );
}
