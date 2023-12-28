import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

const PrecursorPreview = () => (
  <Container sx={{ my: 25 }}>
    <Typography variant="h2" textAlign="center">
      Tools for Community
    </Typography>
    <Typography variant="subtitle1" sx={{ my: 3 }} textAlign="center">
      These are the resources we have spent months developing.
      <br />
      We hope that you continue to enjoy our products.
    </Typography>
  </Container>
)

export default PrecursorPreview
