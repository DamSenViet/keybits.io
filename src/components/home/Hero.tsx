import * as React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextLogo from '@/components/TextLogo'
import HeroButtons from '@/components/home/HeroButtons'
import colors from '@/theme/colors'

const Hero = () => (
  <Box>
    <Container
      sx={{
        minHeight: 500,
        height: 'calc(100vh - 120px)',
        maxHeight: { xs: 500, sm: 700, xl: 1000 },
        transition: '0.3s',
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyItems="stretch"
        wrap="nowrap"
        sx={{ height: '100%', mx: 'auto' }}
      >
        <Grid item md={7} lg={6}>
          <Typography variant="overline" color={colors.carnation}>
            Keyboards by Everyone
          </Typography>
          <Typography variant="h1">
            Introducing
            <br />
            <TextLogo />
          </Typography>
          <Typography variant="subtitle1" sx={{ my: 4 }}>
            Revolutionizing design processes for custom keyboards.
          </Typography>
          <HeroButtons />
        </Grid>
        <Grid
          item
          container
          alignItems={'flex-end'}
          md={5}
          lg={6}
          sx={{ maxHeight: '100%', display: { xs: 'none', md: 'initial' } }}
        >
          <Box
            sx={{
              height: { md: 300, lg: 400 },
              width: { md: 300, lg: 400 },
            }}
            position="relative"
            border={'2px solid'}
            borderColor={colors.blackRussian}
            borderRadius={1}
          >
            <Box
              sx={{
                height: '75%',
                width: '75%',
              }}
              position="absolute"
              left={'-15%'}
              top={'-15%'}
              zIndex={-1}
              bgcolor={colors.ultramarineBlue}
              borderRadius={1}
            />
            <Box
              sx={{
                height: '75%',
                width: '75%',
              }}
              position={'absolute'}
              left={'15%'}
              top={'15%'}
              zIndex={-2}
              bgcolor={colors.hanPurple}
              borderRadius={1}
            />
            <Box
              sx={{
                height: '75%',
                width: '75%',
              }}
              position="absolute"
              right={'-15%'}
              bottom={'-15%'}
              zIndex={-3}
              bgcolor={colors.carnation}
              borderRadius={1}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Box>
)

export default Hero
