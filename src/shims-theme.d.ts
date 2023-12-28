import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    red?: Palette['primary'];
    blue?: Palette['primary'];
    purple?: Palette['primary'];
    black?: Palette['primary'];
    yellow?: Palette['primary'];
  }

  interface PaletteOptions {
    red?: PaletteOptions['primary'];
    blue?: PaletteOptions['primary'];
    purple?: PaletteOptions['primary'];
    black?: PaletteOptions['primary'];
    yellow?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    red: true;
    blue: true;
    purple: true;
    black: true;
    yellow: true,
  }
}

// Update the IconButton's color prop options
declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    red: true;
    blue: true;
    purple: true;
    black: true;
    yellow: true,
  }
}


// Update the SvgIcon's color prop options
declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    red: true;
    blue: true;
    purple: true;
    black: true;
    yellow: true,
  }
}