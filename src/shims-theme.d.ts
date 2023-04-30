import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    red: Palette['primary'];
    blue: Palette['primary'];
    purple: Palette['primary'];
    black: Palette['primary'];
  }

  interface PaletteOptions {
    red: PaletteOptions['primary'];
    blue: PaletteOptions['primary'];
    purple: PaletteOptions['primary'];
    black: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    red: true;
    blue: true;
    purple: true;
    black: true;
  }
}