import React from 'react';
import { useQuery } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';
import { FormLabel, Container, Link, Typography, Stack, Paper, Fab } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


import { QUERY_STAFF } from '../StaffQueries';

const AllStaff = () => {
  const { loading, data } = useQuery(QUERY_STAFF);
  const staffs = data?.staffs || [];

  console.log('staffs:', staffs);
  if (!staffs.length) {
    return <Typography variant='h3'>No Staff Yet</Typography>;
  }

  return (
    <Container>
      {loading ? (
        <Typography variant='h3'>Loading...</Typography>
      ) : (
        <Stack spacing={2} paddingBottom={6}>
          {staffs && staffs.map((staff) => (
            <Paper elevation={3} sx={{ p: 1 }} key={staff._id}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems='center' justifyContent='space-evenly' textAlign='center'>
                <Stack width={'25%'} key={`${staff._id}`} textAlign={{ xs: 'center', sm: 'left' }}>
                  <FormLabel sx={{ fontSize: '0.5rem' }}>Staff Name</FormLabel>
                  {staff.middleName ?
                    <Link component={RouterLink} to={`/staff/${staff._id}`}>
                      {`${staff.firstName} ${staff.middleName} ${staff.lastName}`}
                    </Link> :
                    <Link component={RouterLink} to={`/staff/${staff._id}`}>
                      {`${staff.firstName} ${staff.lastName}`}
                    </Link>
                  }
                </Stack>
                <Stack width={'10%'} key='unknown_school'>
                  <FormLabel sx={{ fontSize: '0.5rem' }}>Schools</FormLabel>
                  <Typography>Unknown</Typography>
                </Stack>
                <Stack>
                  <FormLabel sx={{ fontSize: '0.5rem' }}>Email</FormLabel>
                  <Typography>{staff.email}</Typography>
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
