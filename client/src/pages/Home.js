import React from 'react';
// import { useQuery } from '@apollo/client';

import Loans from './Loans/Loans';
import Students from './Students/Students';
import Staff from './Staff/Staff';
import Tools from './Tools/Tools';

import { Container } from '@mui/material';

const Home = ({ currentSection, setCurrentSection }) => {

  return (
    <Container component='main' sx={{ py: 8, }}>
      {currentSection === 'Loans' && (
        <Loans />
      )}
      {currentSection === 'Students' && (
        <Students />
      )}
      {currentSection === 'Staff' && (
        <Staff />
      )}
      {currentSection === 'Tools' && (
        <Tools />
      )}
    </Container>
  );
};

export default Home;
