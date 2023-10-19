import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Container, Typography } from '@mui/material';

import { QUERY_SINGLE_STUDENT } from '../../../utils/queries';

const SingleStudent = () => {
  const { studentId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_STUDENT, {
    variables: { studentId: studentId },
  });

  const student = data?.student || {};

  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <Container>
      {student}
    </Container>
  );
};

export default SingleStudent;
