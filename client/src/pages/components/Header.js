import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Link, Grid, Box, Typography } from '@mui/material';

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
      <Grid container
        direction={{ xs: 'column', md: 'row' }}
        justifyContent='center'
        sx={{
          paddingY: '15px',
        }}
      >
        <Grid item xs='12' md='7'
          sx={{
            textAlign: { xs: 'center', md: 'left' },
            paddingLeft: { xs: 'none', md: '20px' }
          }}
        >
          <Link component={RouterLink} to='/' style={{ textDecoration: 'none' }}>
            <Typography variant='h4'>Assistive Technology Manager</Typography>
          </Link>
        </Grid>
        <Navigation
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
      </Grid>
    </Box>

  );
};

export default Header;
