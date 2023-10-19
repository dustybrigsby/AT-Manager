import { useState } from "react";
import { useMutation } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import { TextField, Button, Container, Stack } from "@mui/material";

import { QUERY_SCHOOLS } from '../SchoolQueries';
import { ADD_SCHOOL } from '../SchoolMutations';

function AddSchool() {
    const [value, setValue] = useState("");
    const [fieldName, setfieldName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [nameHelperText, setNameHelperText] = useState("");

    const [addSchool, { data, loading, error }] = useMutation(ADD_SCHOOL, {
        update(cache, { data: { addSchool } }) {
            try {
                console.log('data:', data);
                console.log('loading:', loading);
                console.log('error:', error);
                const { schools } = cache.readQuery({ query: QUERY_SCHOOLS });

                cache.writeQuery({
                    query: QUERY_SCHOOLS,
                    data: { schools: [addSchool, ...schools] },
                });
            } catch (error) {
                console.error(error);
            }
        },
    });

    const [formData, setFormData] = useState({
        name: ""
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        console.log("Form submitted", formData);
        if (!nameError) {
            try {
                const { data } = await addSchool({
                    variables: {
                        name: formData.name
                    }
                });
                console.log("data", data);

                if (data.success) {
                    console.log(`School was successfully added.`);
                    return <Navigate to='/schools' />;
                } else {
                    console.log(`School failed to be added.`);
                }

            } catch (error) {
                console.error(error);
            }
        }
    };

    const validateInput = () => {
        if (fieldName === "name") {
            if (!value) {
                setNameError(true);
                setNameHelperText("Name is required");
            } else {
                setNameError(false);
                setNameHelperText("");
            }
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setValue(e.target.value);
        setfieldName(e.target.name);
    };

    return (
        <Container maxWidth="md">
            <Stack direction="column">
                <form>
                    <Stack direction="row" justifyContent="space-between">
                        <TextField
                            variant="outlined"
                            margin="dense"
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            error={nameError}
                            helperText={nameHelperText}
                            onBlur={validateInput}
                            required
                        />
                    </Stack>
                    <Button type="button" onClick={handleFormSubmit}>Submit</Button>
                </form>
            </Stack>
        </Container>
    );
};

export default AddSchool;
