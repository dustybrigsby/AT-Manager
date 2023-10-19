import { useState } from 'react';
import { Container, Button, Stack, Typography } from '@mui/material';

import AllStudents from './components/AllStudents';
import AddStudent from './components/AddStudent';

const Students = () => {
  const sections = ['View All', 'Add Student'];
  const [currentSection, setCurrentSection] = useState('View All');

  console.log('currentSection:', currentSection);

  return (
    <Container maxWidth='md'>
      <Stack
        direction='row'
        spacing={2}
        textAlign={{ xs: 'center', md: 'flex-end' }}
        alignItems='center'
        justifyContent='flex-start'
        p={2}
      >
        {sections.map(section => (

          <Button
            key={section}
            size='small'
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

      {currentSection === 'View All' && <AllStudents />}
      {currentSection === 'Add Student' && <AddStudent />}

    </Container>
  );
};

export default Students;
