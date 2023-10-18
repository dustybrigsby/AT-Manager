import { React, useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Students from './pages/Students/Students';

import Auth from './utils/auth';

const httpLink = createHttpLink({
  uri: '/graphql',
});

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
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
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
                    <Home currentSection={currentSection} setCurrentSection={setCurrentSection} />
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
                  path='/students'
                  element={<Students />
                  } />
                <Route
                  path='/contact'
                  element={<Contact />
                  } />
              </Routes>
            ) : (
              <Routes>
                <Route
                  path='/login'
                  element={<Login currentSection={currentSection}
                    setCurrentSection={setCurrentSection} />
                  } />
                <Route
                  path='*'
                  element={<Signup currentSection={currentSection}
                    setCurrentSection={setCurrentSection} />
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
