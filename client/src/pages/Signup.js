import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, TextField, Button, Stack, Container } from '@mui/material';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container component='main'>
      <Stack
        paddingTop={6}
        direction='row'
        spacing={3}
        alignItems='center'
      >
        <Typography variant='h5'>Sign Up</Typography>
        {data ? (
          <p>
            Success! You may now head{' '}
            <Link to="/">back to the homepage.</Link>
          </p>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <Stack
              direction='row'
              spacing={3}
              alignItems='center'
            >
              <TextField
                name="username"
                type="text"
                label="Username"
                value={formState.name}
                onChange={handleChange}
              />
              <TextField
                name="email"
                type="email"
                label="Email"
                value={formState.email}
                onChange={handleChange}
              />
              <TextField
                name="password"
                type="password"
                label="Password"
                value={formState.password}
                onChange={handleChange}
              />
              <Button
                variant='outlined'
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </form>
        )}

        {error && (
          <Typography>
            {error.message}
          </Typography>
        )}

      </Stack>
    </Container>
  );
};

export default Signup;
