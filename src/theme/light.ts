import { createTheme } from '@mui/material/styles';
import fonts from '@/fonts';

const defaultTheme = createTheme();

const fontFamily = fonts
  .map(font => font.style.fontFamily)
  .join(',');

function createFontFamily(fontFamily: string) {
  return {
    fontFamily,
    h1: { fontFamily },
    h2: { fontFamily },
    h3: { fontFamily },
    h4: { fontFamily },
    h5: { fontFamily },
    h6: { fontFamily },
    subtitle1: { fontFamily },
    subtitle2: { fontFamily },
    body1: { fontFamily },
    body2: { fontFamily },
    button: { fontFamily },
    caption: { fontFamily },
    overline: { fontFamily },
  };
};

const lightTheme = createTheme({
  typography: createFontFamily(fontFamily),
});

export default lightTheme;