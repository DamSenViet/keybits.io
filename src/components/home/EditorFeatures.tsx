import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const features = [
  {
    icon: '',
    name: 'Swappable Clusters',
    description:
      'Swappable clusters allow users to select between layout options. Visualize your clusters to show users their layout options',
  },
  {
    icon: '',
    name: 'Built-in Plate Generator',
    description:
      'Edit and generate your plate on the fly. Made using high precision math libraries. Comes with multiple configuration options',
  },
  {
    icon: '',
    name: '3D Case Preview',
    description:
      'Not sure what your case would look like? Visualize a primitive 3D case preview before you begin CAD work.',
  },
  {
    icon: '',
    name: 'Collision Checking',
    description:
      'Built-in collision detection prevents wasting time on impossible layouts when minimizing spaces on keys angled inwards.',
  },
];

function EditorFeature({
  icon,
  name,
  description,
}: {
  icon: React.ReactNode;
  name: React.ReactNode;
  description: React.ReactNode;
}) {
  return (
    <Box>
      {icon}
      <Typography variant="h3">
        {name}
      </Typography>
      <Typography variant="body2">
        {description}
      </Typography>
    </Box>
  );
};


export default function EditorFeatures() {
  return (
    <Box>
      {features.map(feature => (
        <EditorFeature
          key={feature.name}
          icon={feature.icon}
          name={feature.name}
          description={feature.description}
        />
      ))}
    </Box>
  );
};