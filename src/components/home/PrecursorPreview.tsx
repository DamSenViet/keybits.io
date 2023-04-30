import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'

const PrecursorPreview = () => (
  <Container sx={{ my: 5 }}>
    <Typography variant="h2">Tools for Community</Typography>
    <Typography variant="subtitle1" sx={{ my: 3 }}>
      These are the resources we have spent months developing.
      <br />
      We hope that you continue to enjoy our products.
    </Typography>
  </Container>
);

export default PrecursorPreview;