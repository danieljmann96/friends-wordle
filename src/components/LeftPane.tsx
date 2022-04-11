import React, { SetStateAction, Dispatch } from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import _ from 'lodash';
import StatIcon from './StatIcon';
import { scoreKeys } from '../constants';

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function LeftPane({ open, setOpen }: IProps): JSX.Element {
  return (
    <Drawer anchor="left" onClose={() => setOpen(false)} open={open}>
      <Box role="presentation" sx={{ width: 350 }}>
        <List>
          {scoreKeys.map(scoreKey => (
            <ListItem key={scoreKey}>
              <ListItemText
                primary={_.startCase(scoreKey)}
                primaryTypographyProps={{ sx: { fontSize: '1.5rem' } }}
              />
              <ListItemIcon>
                <StatIcon scoreKey={scoreKey} />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
