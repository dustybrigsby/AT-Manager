import React from 'react';
import { useQuery } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';
import { FormLabel, Container, Link, Typography, Stack, Paper, Fab } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


import { QUERY_STUDENTS } from '../StudentQueries';

const AllStudents = () => {
  const { loading, data } = useQuery(QUERY_STUDENTS);
  const students = data?.students || [];

  console.log('students:', students);
  if (!students.length) {
    return <Typography variant='h3'>No Students Yet</Typography>;
  }

  return (
    <Container>
      {loading ? (
        <Typography variant='h3'>Loading...</Typography>
      ) : (
        <Stack spacing={2}>
          {students && students.map((student) => (
            <Paper elevation={3} sx={{ p: 1 }} key={student._id}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems='center' justifyContent='space-evenly' textAlign='center'>
                <Stack width={'25%'} key={`${student.firstName}_${student.middleName}_${student.lastName}`} textAlign={{ xs: 'center', sm: 'left' }}>
                  <FormLabel sx={{ fontSize: '0.5rem' }}>Student Name</FormLabel>
                  <Link component={RouterLink} to={`/student/${student._id}`}>
                    {`${student.firstName} ${student.middleName} ${student.lastName}`}
                  </Link>
                </Stack>
                <Stack width={'10%'} key={student.sid}>
                  <FormLabel sx={{ fontSize: '0.5rem' }}>SID</FormLabel>
                  {`${student.sid}`}
                </Stack>
                {student.school ?
                  <Stack width={'10%'} key={student.school._id}>
                    <FormLabel sx={{ fontSize: '0.5rem' }}>School</FormLabel>
                    <Link component={RouterLink} to={`/school/${student.school._id}`}>
                      {`${student.school.name}`}
                    </Link>
                  </Stack> :
                  <Stack width={'10%'} key='unknown_school'>
                    <FormLabel sx={{ fontSize: '0.5rem' }}>School</FormLabel>
                    <Typography>Unknown</Typography>
                  </Stack>
                }
                <Stack width='5%'>
                  <FormLabel sx={{ fontSize: '0.5rem' }}>Loans</FormLabel>
                  <Typography>{student.loans.length}</Typography>
                </Stack>
                <Stack>
                  <FormLabel sx={{ fontSize: '0.5rem' }}>Email</FormLabel>
                  <Typography>{student.email}</Typography>
                </Stack>
                <Fab color='primary' aria-label='edit' size='small'>
                  <EditIcon />
                </Fab>
                <Fab color='error' aria-label='delete' size='small'>
                  <DeleteIcon />
                </Fab>
              </Stack>

            </Paper>
          )
          )}
        </Stack>
      )}
    </Container >
  );
};

export default AllStudents;
