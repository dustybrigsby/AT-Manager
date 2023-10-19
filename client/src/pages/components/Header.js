import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Link, Stack, Box, Typography } from '@mui/material';

import Navigation from './Navigation';

const Header = ({ currentSection, setCurrentSection }) => {


  return (

    <Box container
      component='header'
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Stack container
        direction='column'
        justifyContent='center'
        sx={{
          paddingY: '15px',
        }}
      >
        <Stack item
          sx={{
            textAlign: 'center',
          }}
        >
          <Link component={RouterLink} to='/' style={{ textDecoration: 'none' }}>
            <Typography variant='h4'>Assistive Technology Manager</Typography>
          </Link>
        </Stack>
        <Stack item>
          <Navigation
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
          />
        </Stack>
      </Stack>
    </Box>

  );
};

export default Header;
