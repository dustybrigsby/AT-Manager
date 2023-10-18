import useState from 'react';
// import { useQuery } from '@apollo/client';
import { Button, Stack, Typography } from '@mui/material';

import { Container } from '@mui/material';

const Student = () => {

  const sections = ['All Students', 'Student Details', 'Add Student'];
  return (
    <Container maxWidth='md' sx={{ py: 8 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        textAlign={{ xs: 'center', md: 'flex-end' }}
      >
        {sections.map(section => (
          <Button>
            <Typography variant='h6' key={section} href={'/'} >
              {section}
            </Typography>
          </Button>

        ))}
      </Stack>
    </Container>
  );
};

export default Student;
