import { Shadows, createTheme } from '@mui/material/styles';
import { rubik, roboto } from '@/fonts';
import colors from './colors';

const lightTheme = createTheme({
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
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontFamily: rubik.style.fontFamily,
      fontWeight: 500,
      fontSize: '3.75rem',
    },
    h2: {
      fontFamily: rubik.style.fontFamily,
      fontWeight: 500,
      fontSize: '2.5rem',
    },
    h3: {
      fontFamily: rubik.style.fontFamily,
      fontSize: '1.25rem',
    },
    h4: {
      fontFamily: rubik.style.fontFamily,
    },
    h5: {
      fontFamily: rubik.style.fontFamily,
    },
    h6: {
      fontFamily: rubik.style.fontFamily,
    },
    subtitle1: {
      fontFamily: roboto.style.fontFamily,
    },
    subtitle2: {
      fontFamily: roboto.style.fontFamily,
    },
    body1: {
      fontFamily: roboto.style.fontFamily,
    },
    body2: {
      fontFamily: roboto.style.fontFamily,
      fontSize: '0.875rem',
    },
    button: {
      fontFamily: rubik.style.fontFamily,
      fontWeight: 400,
      textTransform: 'none',
    },
    caption: {
      fontFamily: roboto.style.fontFamily,
    },
    overline: {
      fontFamily: roboto.style.fontFamily,
      fontWeight: 400,
      textTransform: 'none',
      fontSize: '1rem',
    },
  },
  shadows: Array(25).fill('none') as Shadows,
});

export default lightTheme;