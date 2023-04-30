import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'
import EditorFeatures from '@/components/home/EditorFeatures'

const EditorPreview = () => (
  <Container sx={{ my: 5 }}>
    <Typography variant="overline" color='red.main'>New Keybits Format</Typography>
    <Typography variant="h2">
      Editor
      <Typography component="span" variant="h2" color='red.main'>
        .Prototype
        <br />
        Keyboards
      </Typography>
    </Typography>
    <EditorFeatures />
  </Container>
);

export default EditorPreview;