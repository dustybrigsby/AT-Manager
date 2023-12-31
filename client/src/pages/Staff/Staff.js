import { useState } from 'react';
import { Container, Typography, Button, Stack } from '@mui/material';

import AllStaff from './components/AllStaff';
import AddStaff from './components/AddStaff';

const Staff = () => {
    const sections = ['View All', 'Add Staff'];
    const [currentSection, setCurrentSection] = useState('View All');

    console.log('currentSection:', currentSection);

    return (
        <Container maxWidth='md'>
            <Stack
                direction='row'
                spacing={2}
                textAlign={{ xs: 'center', md: 'flex-end' }}
                alignItems='center'
                justifyContent='flex-start'
                p={2}
            >
                {sections.map(section => (

                    <Button
                        key={section}
                        size='small'
                        variant={currentSection === section ? 'outlined' : 'contained'}
                        href={`#${section.toLowerCase().replace(' ', '-')}`}
                        onClick={() => setCurrentSection(section)}
                    >
                        <Typography>
                            {section}
                        </Typography>
                    </Button>

                ))}
            </Stack>

            {currentSection === 'View All' && <AllStaff />}
            {currentSection === 'Add Staff' && <AddStaff />}

        </Container>
    );
};

export default Staff;
