import * as React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import colors from '@/theme/colors';

const LabsPreview = () => (
  <Container sx={{ my: 25 }}>
    <Typography variant="overline" color='purple.main'>Free and Open Source</Typography>
    <Typography variant="h2">
      Labs
      <Typography component="span" style={{ color: colors.hanPurple }} variant="h2">
        .Develop
        <br />
        Packages
      </Typography>
    </Typography>
    <Typography variant="subtitle1" sx={{ my: 3 }}>
      Check out the libraries, tools, APIs, and documentation. Almost everything
      we make is open sourced and available via our GitHub repositories.
    </Typography>
    <Button variant="outlined" color='purple' sx={{ px: 5, py: 1 }}>View Projects</Button>
  </Container>
);

export default LabsPreview;