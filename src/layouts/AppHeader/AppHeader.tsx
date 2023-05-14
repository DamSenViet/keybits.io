import * as React from 'react';
import { styled } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import HeaderNavBar from './AppHeaderNavBar';
import HeaderNavDrop from './AppHeaderNavDrop';

const Header = styled('header')(({ theme }) => [
  {
    position: 'sticky',
    top: 0,
    transition: theme.transitions.create('top'),
    zIndex: theme.zIndex.appBar,
    boxShadow: `inset 0px -1px 1px ${theme.palette.grey[300]}`,
    backgroundColor: 'rgba(255,255,255)',
  },
  // theme.applyDarkStyles({
  //   boxShadow: `inset 0px -1px 1px ${(theme.vars || theme).palette.primaryDark[700]}`,
  //   backgroundColor: alpha(theme.palette.primaryDark[900], 0.7),
  // }),
]);


const HEIGHT = 56;
const globalStyles = {
  ':root': {
    '--MuiDocs-header-height': `${HEIGHT}px`,
  },
};

export default function AppHeader() {
  return (
    <Header>
      <GlobalStyles styles={globalStyles} />
      <Container sx={{ display: 'flex', alignItems: 'center', minHeight: HEIGHT }}>
        <Box>
          <Typography fontWeight={'medium'}>
            <span>keybits</span><span>.</span>
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'initial' }, ml: 5 }}>
          <HeaderNavBar />
        </Box>
        {/* Spacer */}
        <Box sx={{ ml: 'auto' }} />
        {/* Grouped Right Side Buttons Inside the Stack */}
        <Stack>
        </Stack>
        <Box sx={{ display: { md: 'none' }, ml: 1 }}>
          <HeaderNavDrop />
        </Box>
      </Container>
    </Header>
  );
};