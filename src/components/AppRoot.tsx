import React, { useState } from 'react';
import { SnackbarProvider } from 'notistack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon, LightMode, DarkMode } from '@mui/icons-material';
import WordProvider from '../providers/WordProvider';
import LetterGrid from './LetterGrid';
import KeyboardInput from './KeyboardInput';

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function AppRoot(): JSX.Element {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const handleChangeTheme = () => {
    setDarkMode(mode => !mode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <SnackbarProvider
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <WordProvider>
          <AppBar position="fixed" sx={{ my: 0 }}>
            <Toolbar>
              <IconButton
                color="inherit"
                edge="start"
                size="large"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
                Friends Wordle
              </Typography>
              <IconButton
                color="inherit"
                onClick={handleChangeTheme}
                size="large"
              >
                {darkMode ? <DarkMode /> : <LightMode />}
              </IconButton>
            </Toolbar>
          </AppBar>
          <Paper
            elevation={0}
            square
            sx={{
              width: '100%',
              height: '100vh',
              py: 10
            }}
          >
            <LetterGrid />
          </Paper>
          <KeyboardInput />
        </WordProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
