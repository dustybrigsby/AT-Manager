import { React, useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './pages/components/Header';
import Footer from './pages/components/Footer';
import Contact from './pages/Contact';
import Loans from './pages/Loans/Loans';
import Students from './pages/Students/Students';
import Schools from './pages/Schools/Schools';
import Staff from './pages/Staff/Staff';
import Tools from './pages/Tools/Tools';
import NoMatch from './pages/NoMatch';

import Auth from './utils/auth';

const httpLink = createHttpLink({
  uri: '/graphql',
});
console.log('httpLink:', httpLink);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [currentSection, setCurrentSection] = useState('Home');
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <ApolloProvider client={client}>
        <Router>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100vw',
              minHeight: '100vh',
            }}
          >
            <Header
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
            />

            {Auth.loggedIn ? (
              <Routes>
                <Route
                  path='/'
                  element={
                    <Home />
                  } />
                <Route
                  path='/login'
                  element={
                    <Login />
                  } />
                <Route
                  path='/contact'
                  element={<Contact />
                  } />
                <Route
                  path='/signup'
                  element={<Signup />
                  } />
                <Route
                  path='/loans'
                  element={<Loans />
                  } />
                <Route
                  path='/students'
                  element={<Students />
                  } />
                <Route
                  path='/schools'
                  element={<Schools />
                  } />
                <Route
                  path='/staff'
                  element={<Staff />
                  } />
                <Route
                  path='/tools'
                  element={<Tools />
                  } />
                <Route
                  path='*'
                  element={<NoMatch />
                  } />
              </Routes>
            ) : (
              <Routes>
                <Route
                  path='/login'
                  element={<Login />
                  } />
                <Route
                  path='/contact'
                  element={<Contact />
                  } />
                <Route
                  path='*'
                  element={<Signup />
                  } />
              </Routes>
            )}
            <Footer />
          </Box>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
