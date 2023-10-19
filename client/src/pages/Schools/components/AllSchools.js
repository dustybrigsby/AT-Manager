import React from 'react';
import { useQuery } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';
import { FormLabel, Container, Link, Typography, Stack, Paper, Fab } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


import { QUERY_SCHOOLS } from '../SchoolQueries';

const AllStaff = () => {
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
                <Stack width={'25%'} key={`${school.firstName}_${school.middleName}_${school.lastName}`} textAlign={{ xs: 'center', sm: 'left' }}>
                  <FormLabel sx={{ fontSize: '0.5rem' }}>Staff Name</FormLabel>
                  {school.middleName ?
                    <Link component={RouterLink} to={`/staff/${school._id}`}>
                      {`${school.firstName} ${school.middleName} ${school.lastName}`}
                    </Link> :
                    <Link component={RouterLink} to={`/staff/${school._id}`}>
                      {`${school.firstName} ${school.lastName}`}
                    </Link>
                  }
                </Stack>
                {school.schools.length ?
                  <Stack width={'10%'} key={school.schools[0]._id}>
                    <FormLabel sx={{ fontSize: '0.5rem' }}>Schools</FormLabel>
                    <Link component={RouterLink} to={`/schools/${school.schools[0]._id}`}>
                      {`${school.schools[0].name}`}
                    </Link>
                  </Stack> :
                  <Stack width={'10%'} key='unknown_school'>
                    <FormLabel sx={{ fontSize: '0.5rem' }}>Schools</FormLabel>
                    <Typography>Unknown</Typography>
                  </Stack>
                }
                <Stack>
                  <FormLabel sx={{ fontSize: '0.5rem' }}>Email</FormLabel>
                  <Typography>{school.email}</Typography>
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
          )
          )}
        </Stack>
      )}
    </Container >
  );
};

export default AllStaff;
