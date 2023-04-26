import { NextFont } from 'next/dist/compiled/@next/font';
import { Roboto, Rubik } from 'next/font/google';

export const rubik: NextFont = Rubik({
  weight: 'variable',
  display: 'swap',
  subsets: ['latin'],
});

export const roboto: NextFont = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
  subsets: ['latin'],
});

const fonts = [
  rubik,
  roboto,
];

export default fonts;