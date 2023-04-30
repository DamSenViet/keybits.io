import * as React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextLogo from '@/components/TextLogo';
import colors from '@/theme/colors';

const Hero = () => (
  <Container sx={{ my: 5 }}>
    <Typography variant="overline" color={colors.carnation}>Keyboards by Everyone</Typography>
    <Typography variant="h1">
      Introducing
      <br />
      <TextLogo />
    </Typography>
    <Typography variant="subtitle1" sx={{ my: 4 }}>
      Revolutionizing design processes for custom keyboards.
    </Typography>
    <Button variant="contained" color="black" sx={{ px: 5, py: 2 }}>Start Designing</Button>
  </Container>
);

export default Hero;