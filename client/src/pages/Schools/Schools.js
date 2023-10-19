import { useState } from 'react';
import { Container, Typography, Button, Stack } from '@mui/material';

import AllSchools from './components/AllSchools';
import AddSchool from './components/AddSchool';

const Schools = () => {
    const sections = ['View All', 'Add School'];
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

            {currentSection === 'View All' && <AllSchools />}
            {currentSection === 'Add School' && <AddSchool />}

        </Container>
    );
};

export default Schools;
