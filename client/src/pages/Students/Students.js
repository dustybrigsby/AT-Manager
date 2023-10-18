import { useState } from 'react';
// import { useQuery } from '@apollo/client';
import { Container, Button, Stack, Typography } from '@mui/material';

import All from './components/All';

const Students = () => {
  const sections = ['All', 'Add'];
  const [currentSection, setCurrentSection] = useState('All');

  return (
    <Container maxWidth='md'>
      <Stack
        direction='row'
        spacing={2}
        textAlign={{ xs: 'center', md: 'flex-end' }}
        alignItems='center'
        justifyContent='space-evenly'
        p={2}
      >
        {sections.map(section => (

          <Button
            key={section}
            variant={currentSection === section ? 'outlined' : 'contained'}
            href={`#${section.toLowerCase().replace(' ', '-')}`}
            onClick={() => setCurrentSection(section)}
          >
            <Typography>
              {section}
            </Typography>
          </Button>

        ))}
      </Stack>

      {currentSection === 'All' && <All />}

    </Container>
  );
};

export default Students;
