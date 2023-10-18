import React from 'react';
import { useQuery } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Link, Typography, Stack, Paper, Box } from '@mui/material';

import { QUERY_STUDENTS } from '../../../utils/queries';


const StudentList = () => {
  const { loading, data } = useQuery(QUERY_STUDENTS);
  const students = data?.students || [];

  console.log('students:', students);

  if (!students.length) {
    return <Typography variant='h3'>No Students Yet</Typography>;
  }

  return (
    <Container>
      <Typography variant='h3' mb={2}>Students</Typography>
      <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-evenly' textAlign='center' p={1}>
        <Typography width='35%' textAlign='left'>Name</Typography>
        <Typography width='10%'>SID</Typography>
        <Typography width='15%'>School</Typography>
        <Typography width='10%'># Loans</Typography>
        <Typography width='20%'>Email</Typography>
      </Stack>

      {loading ? (
        <Typography variant='h3'>Loading...</Typography>
      ) : (
        <Stack spacing={2}>
          {students && students.map((student) => (
            <Paper elevation={3} sx={{ p: 1 }} key={student._id}>
              <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-evenly' textAlign='center'>
                <Box width={'35%'} key={`${student.firstName}_${student.middleName}_${student.lastName}`} textAlign='left'>
                  <Link component={RouterLink} to={`/student/${student._id}`}>
                    {`${student.firstName} ${student.middleName} ${student.lastName}`}
                  </Link>
                </Box>
                <Box width={'10%'} key={student.sid}>
                  {`${student.sid}`}
                </Box>
                <Box width={'15%'} key={student.school._id}>
                  <Link component={RouterLink} to={`/school/${student.school._id}`}>
                    {`${student.school.name}`}
                  </Link>
                </Box>
                <Box width='10%'>
                  <Typography>{student.loans.length}</Typography>
                </Box>
                <Box>
                  <Typography>{student.email}</Typography>
                </Box>
              </Stack>

            </Paper>
          )
          )}
        </Stack>
      )}
    </Container>
  );
};

export default StudentList;
