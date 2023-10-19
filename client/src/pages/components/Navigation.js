import Auth from "../../utils/auth";
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { Grid, Button, Stack, Typography, Link } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Navigation = ({ currentSection, setCurrentSection }) => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        return <Navigate to='/login' />;
    };
    const sections = ['Students', 'Staff', 'Schools', 'Tools', 'Loans'];

    return (
        <Grid width={{ xs: '12', md: '4' }}
            component='nav'
            alignItems='center'
            justifyContent='center'
            sx={{
                display: 'flex',
            }}
        >
            {Auth.loggedIn() ? (
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    textAlign='center'
                >
                    {sections.map(section => (
                        <Link
                            key={section}
                            component={RouterLink}
                            underline="none"
                            to={`/${section.toLowerCase().replace(' ', '-')}`}
                            color={currentSection === section ? 'primary.light' : 'primary.dark'}
                        >
                            <Button
                                onClick={() => setCurrentSection(section)}
                                variant={currentSection === section ? 'outlined' : 'text'}
                            >

                                {section}

                            </Button>
                        </Link>
                    ))}

                    <Button onClick={logout} pr={'5px'}>
                        Logout
                        <LogoutIcon />
                    </Button>

                </Stack>
            ) : (
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    textAlign='center'
                >
                    <Button component={RouterLink} to="/login">
                        <Typography variant='h6' pr={'5px'}>
                            Login
                        </Typography>
                    </Button>
                    <Button component={RouterLink} to="/signup">
                        <Typography variant='h6' pr={'5px'}>
                            Signup
                        </Typography>
                    </Button>
                </Stack>
            )}
        </Grid>

    );
};

export default Navigation;