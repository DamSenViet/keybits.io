import { Shadows, createTheme } from '@mui/material/styles';
import colors from './colors';
import typography from './typography';
import { defaultDarkTheme } from './base'

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    text: {
      primary: colors.blackRussian,
    },
    red: {
      main: colors.carnation,
      contrastText: '#fff'
    },
    blue: {
      main: colors.ultramarineBlue,
      contrastText: '#fff',
    },
    purple: {
      main: colors.hanPurple,
      contrastText: '#fff',
    },
    black: {
      main: colors.blackRussian,
      contrastText: '#fff',
    },
    yellow: {
      main: colors.supernova,
      contrastText: '#fff',
    }
  },
  typography,
  shadows: defaultDarkTheme.shadows.map(() => 'none') as Shadows,
});

export default darkTheme;