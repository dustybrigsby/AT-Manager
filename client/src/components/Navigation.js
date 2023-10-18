import Auth from "../utils/auth";
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Button, Stack, Typography, Link } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Navigation = ({ currentSection, setCurrentSection }) => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    const sections = ['Loans', 'Students', 'Staff', 'Tools'];

    return (
        <Grid item xs='12' md='4'
            component='nav'
            alignItems='center'
            justifyContent={{ xs: 'center', md: 'flex-end' }}
            sx={{
                display: 'flex',
            }}
        >
            {Auth.loggedIn() ? (
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    textAlign={{ xs: 'center', md: 'flex-end' }}
                >
                    {sections.map(section => (
                        <Button
                            onClick={() => setCurrentSection(section)}

                        >
                            <Typography
                                variant='h6'
                                key={section}
                                underline={currentSection === section ? 'always' : 'hover'}
                                color={currentSection === section ? 'primary.light' : 'primary.dark'}
                                href={'/'}
                            >
                                {section}
                            </Typography>
                        </Button>

                    ))}

                    <Button onClick={logout}>
                        <Typography variant='h6' pr={'5px'}>
                            Logout
                        </Typography>
                        <LogoutIcon />
                    </Button>

                </Stack>
            ) : (
                <>
                    <Button component={RouterLink} to="/login">Login</Button>
                    <Button component={RouterLink} to="/signup">Signup</Button>
                </>
            )}
        </Grid>

    );
};

export default Navigation;