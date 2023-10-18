import React from 'react';
import { useQuery } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Link, Typography, Stack, Paper, Box } from '@mui/material';

import { QUERY_STUDENTS } from '../utils/queries';


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
      {loading ? (
        <Typography variant='h3'>Loading...</Typography>
      ) : (
        <Stack
          spacing={2}
        >
          {students &&
            students.map((student) => (

              <Paper key={student._id} elevation={3} sx={{ p: 1 }}>
                <Stack>

                </Stack>

                <Stack
                  direction='row'
                  spacing={2}
                >
                  <Box width={'15%'}>
                    <Link component={RouterLink} to={`/student/${student._id}`}>
                      {`${student.firstName} ${student.lastName}`}
                    </Link>
                  </Box>
                  <Box width={'7%'} sx={{ textAlign: 'center' }}>
                    {`${student.sid}`}
                  </Box>
                  <Box width={'15%'}>
                    <Link component={RouterLink} to={`/school/${student.school._id}`}>
                      {`${student.school.name}`}
                    </Link>
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
