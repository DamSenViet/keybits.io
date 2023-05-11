import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import EditorFeatures from '@/components/home/EditorFeatures'

const EditorPreview = () => (
  <Box>
    <Container sx={{ my: 25 }}>
      <Grid container>
        <Grid item md={6} >
          <Typography variant="overline" color='red.main'>New Keybits Format</Typography>
          <Typography variant="h2" sx={{ textOverflow: 'clip' }}>
            Editor
            <Typography component="span" variant="h2" color='red.main'>
              .Prototype
              <br />
              Keyboards
            </Typography>
          </Typography>
          <EditorFeatures />
        </Grid>
        <Grid
          item
          sx={{
            display: { xs: 'none', md: 'initial' }
          }}
          md={6}
        >
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default EditorPreview;