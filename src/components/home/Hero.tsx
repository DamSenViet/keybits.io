import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextLogo from '@/components/TextLogo';
import HeroButtons from '@/components/home/HeroButtons';
import colors from '@/theme/colors';

const Hero = () => (
  <Container sx={{ my: 30 }}>
    <Typography variant="overline" color={colors.carnation}>Keyboards by Everyone</Typography>
    <Typography variant="h1">
      Introducing
      <br />
      <TextLogo />
    </Typography>
    <Typography variant="subtitle1" sx={{ my: 4 }}>
      Revolutionizing design processes for custom keyboards.
    </Typography>
    <HeroButtons />
  </Container>
);

export default Hero;