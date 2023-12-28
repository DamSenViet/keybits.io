import { TypographyOptions } from '@mui/material/styles/createTypography';
import { rubik, roboto } from '@/fonts';

const typography = {
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
  allVariants: {
    scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 72px)',
  },
} satisfies TypographyOptions as TypographyOptions;

export default typography;