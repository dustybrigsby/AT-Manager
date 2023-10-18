import React from 'react';
import { useQuery } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Link, Typography, Stack, Paper, Box } from '@mui/material';

import { QUERY_STAFF } from '../utils/queries';


const StudentList = () => {
    const { loading, data } = useQuery(QUERY_STAFF);
    const students = data?.students || [];

    if (!students.length) {
        return <Typography variant='h3'>No Students Yet</Typography>;
    }

    return (
        <Container>
            <Typography variant='h3' mb={2}>Students</Typography>
            <Box sx={{ spacing: '1', textAlign: 'center', justifyContent: 'space-evenly' }}>
                <Typography width={'20%'}>Name</Typography>
                <Typography width={'10%'}>SID</Typography>
                <Typography width={'15%'}>School</Typography>
                <Typography width='10%'># Loans</Typography>
                <Typography width='20%'>Email</Typography>
            </Box>
            {loading ? (
                <Typography variant='h3'>Loading...</Typography>
            ) : (
                <Stack spacing={2}>
                    {students && students.map((student) => (
                        <Paper elevation={3} sx={{ p: 1 }}>
                            <Stack>

                            </Stack>

                            <Stack
                                direction='row'
                                spacing={1}
                                alignItems='center'
                                justifyContent='space-evenly'
                            >
                                <Box width={'20%'} key={student._id}>
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
