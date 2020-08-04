import React from 'react';
import './App.css';
import Input from './components/Input';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    },
    bg: {
      main: '#5c5c5c'
    },
    spacing: {
      spacing: 8
    }
  }
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Input />
    </MuiThemeProvider>
  );
}

export default App;
