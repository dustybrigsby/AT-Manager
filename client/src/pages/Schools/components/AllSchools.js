import React from 'react';
import { useQuery } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';
import { FormLabel, Container, Link, Typography, Stack, Paper, Fab } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { QUERY_SCHOOLS } from '../SchoolQueries';

const AllSchools = () => {
  const { loading, data } = useQuery(QUERY_SCHOOLS);
  const schools = data?.staffs || [];

  console.log('schools:', schools);
  if (!schools.length) {
    return <Typography variant='h3'>No Schools Yet</Typography>;
  }

  return (
    <Container>
      {loading ? (
        <Typography variant='h3'>Loading...</Typography>
      ) : (
        <Stack spacing={2}>
          {schools && schools.map((school) => (
            <Paper elevation={3} sx={{ p: 1 }} key={school._id}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems='center' justifyContent='space-evenly' textAlign='center'>
                <Stack width={'25%'} key={`${school.name}`} textAlign={{ xs: 'center', sm: 'left' }}>
                  <FormLabel sx={{ fontSize: '0.5rem' }}>School Name</FormLabel>
                  <Link component={RouterLink} to={`/staff/${school._id}`}>
                    {`${school.name}`}
                  </Link>

                </Stack>
                <Stack width={'10%'} key={school.students.length}>
                  <FormLabel sx={{ fontSize: '0.5rem' }}>Students</FormLabel>
                  <Link component={RouterLink} to={`/students`}>
                    {`${school.students.length}`}
                  </Link>
                </Stack>
                <Stack width={'10%'} key={school.staff.length}>
                  <FormLabel sx={{ fontSize: '0.5rem' }}>Students</FormLabel>
                  <Link component={RouterLink} to={`/staff`}>
                    {`${school.staff.length}`}
                  </Link>
                </Stack>
                <Stack direction='row' gap={1}>
                  <Fab color='primary' aria-label='edit' size='small'>
                    <EditIcon />
                  </Fab>
                  <Fab color='error' aria-label='delete' size='small'>
                    <DeleteIcon />
                  </Fab>
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
    </Container >
  );
};

export default AllSchools;
