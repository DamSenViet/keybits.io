import * as React from 'react';
import { styled } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import colors from '@/theme/colors';

const LeftOffsetButton = styled(Box)(({ theme }) => ({
  height: '100%',
  width: '100%',
  position: 'absolute',
  left: -15, 
  bottom: -10,
  zIndex: -1,
  backgroundColor: `${colors.ultramarineBlue}`,
}));

const RightOffsetButton = styled(Box)(({ theme }) => ({
  height: '100%',
  width: '100%',
  position: 'absolute',
  right: -15, 
  top: -10,
  zIndex: -1,
  backgroundColor: `${colors.carnation}`,
}));

export default function HeroButtons() {
  return (
    <Box>
      <Button variant="contained" color="black" sx={{ px: 5, py: 2 }}>
        Start Designing
        <LeftOffsetButton color='blue' sx={{ borderRadius: 1 }} />
        <RightOffsetButton color='red' sx={{ borderRadius: 1 }} />
      </Button>
      
      <Button variant="outlined" color='yellow' sx={{ p: 2, ml: 5 }}>
        <PlayArrowIcon color='black'></PlayArrowIcon>
      </Button>
    </Box>
  );
}