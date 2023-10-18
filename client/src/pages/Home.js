import React from 'react';
// import { useQuery } from '@apollo/client';

import Loans from '../components/Loans';
import Students from './Student/components/AllStudents';
import Staff from '../components/Staff';
import Tools from '../components/Tools';

import { Container } from '@mui/material';

const Home = ({ currentSection, setCurrentSection }) => {

  return (
    <Container maxWidth='md' sx={{ py: 8, }}>
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
