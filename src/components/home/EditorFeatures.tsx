import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import SvgIcon from '@mui/material/SvgIcon'
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined'
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'
import ViewInArIcon from '@mui/icons-material/ViewInAr'
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter'

const features = [
  {
    icon: LayersOutlinedIcon,
    name: 'Swappable Clusters',
    description:
      'Swappable clusters allow users to select between layout options. Visualize your clusters to show users their layout options',
  },
  {
    icon: TextSnippetOutlinedIcon,
    name: 'Built-in Plate Generator',
    description:
      'Edit and generate your plate on the fly. Made using high precision math libraries. Comes with multiple configuration options',
  },
  {
    icon: ViewInArIcon,
    name: '3D Case Preview',
    description:
      'Not sure what your case would look like? Visualize a primitive 3D case preview before you begin CAD work.',
  },
  {
    icon: VerticalAlignCenterIcon,
    name: 'Collision Checking',
    description:
      'Built-in collision detection prevents wasting time on impossible layouts when minimizing spaces on keys angled inwards.',
  },
]

function EditorFeature({
  Icon,
  name,
  description,
}: {
  Icon: typeof SvgIcon
  name: string
  description: string
}) {
  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h3">
        <Icon color="red" sx={{ verticalAlign: 'bottom' }} />
        <Box component="span" sx={{ ml: 1 }}>
          {name}
        </Box>
      </Typography>
      <Typography variant="body2" sx={{ my: 2 }}>
        {description}
      </Typography>
    </Box>
  )
}

export default function EditorFeatures() {
  return (
    <Grid
      container
      wrap="wrap"
      // justifyItems=""
      spacing={4}
    >
      {features.map((feature) => (
        <Grid key={feature.name} item sm={6}>
          <EditorFeature
            Icon={feature.icon}
            name={feature.name}
            description={feature.description}
          />
        </Grid>
      ))}
    </Grid>
  )
}
