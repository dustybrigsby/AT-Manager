import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import { Container, Typography, TextField, Button, Stack } from '@mui/material';


const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value, });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({ email: '', password: '', });
  };

  return (
    <Container component='main'>
      <Stack
        paddingTop={6}
        direction='row'
        spacing={3}
        alignItems='center'
      >
        <Typography variant='h5'>Login</Typography>

        {data ? (
          <Typography>
            Success! You may now head{' '}
            <Link to='/'>back to the homepage.</Link>
          </Typography>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <Stack
              direction='row'
              spacing={3}
              alignItems='center'
            >
              <TextField
                name='email'
                type='email'
                label='Email'
                value={formState.email}
                onChange={handleChange}
              />
              <TextField
                name='password'
                type='password'
                label='Password'
                value={formState.password}
                onChange={handleChange}
              />
              <Button type='submit' variant='outlined'>
                Submit
              </Button>
            </Stack>
          </form>
        )}

        {error && (
          <Typography
            sx={{ color: 'error.main' }}
          >
            {error.message}
          </Typography>
        )}

      </Stack>
    </Container>
  );
};

export default Login;
