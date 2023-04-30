import * as React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const StudioPreview = () => (
  <Container sx={{ my: 5 }}>
    <Typography variant="overline" color='blue.main'>Plan Your Purchases</Typography>
    <Typography variant="h2">
      Studio
      <Typography component="span" variant="h2" color='blue.main'>
        .Preview
        <br />
        Keyboards
      </Typography>
    </Typography>
    <Typography variant="subtitle1" sx={{ my: 3 }}>
      A database of keyboard models paired with simulated desk environments
      makes choosing keyboard colors and keycap sets combinations simple and
      easy.
    </Typography>
    <Button variant="outlined" color='blue' sx={{ px: 5, py: 1 }}>View Boards</Button>
  </Container>
);

export default StudioPreview;