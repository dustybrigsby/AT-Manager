import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box component='footer'
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >

      <Container maxWidth='sm'
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly'
        }}
      >

        <Link component={RouterLink} to="/contact">
          Support
        </Link>
      </Container>

    </Box>
  );
};

export default Footer;
