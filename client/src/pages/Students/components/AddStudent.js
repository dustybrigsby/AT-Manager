import { useState } from "react";
import { useMutation } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import { validateEmail } from "../../../utils/helpers";
import { validateSid } from "../../../utils/helpers";
import { TextField, Button, Container, Stack, Box } from "@mui/material";

import { QUERY_STUDENTS } from '../StudentQueries';
import { ADD_STUDENT } from '../StudentMutations';

function AddStudent() {
    const [value, setValue] = useState("");
    const [fieldName, setfieldName] = useState("");
    const [sidError, setSidError] = useState(false);
    const [sidHelperText, setSidHelperText] = useState("");
    const [nameError, setNameError] = useState(false);
    const [nameHelperText, setNameHelperText] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState("");

    const [addStudent, { data, loading, error }] = useMutation(ADD_STUDENT, {
        update(cache, { data: { addStudent } }) {
            try {
                console.log('data:', data);
                console.log('loading:', loading);
                console.log('error:', error);
                const { students } = cache.readQuery({ query: QUERY_STUDENTS });

                cache.writeQuery({
                    query: QUERY_STUDENTS,
                    data: { students: [addStudent, ...students] },
                });
            } catch (error) {
                console.error(error);
            }
        },
    });

    const [formData, setFormData] = useState({
        sid: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        school: null
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        console.log("Form submitted", formData);
        if (!nameError && !emailError && !sidError) {
            try {
                const { data } = await addStudent({
                    variables: {
                        sid: formData.sid,
                        firstName: formData.firstName,
                        middleName: formData.middleName,
                        lastName: formData.lastName,
                        email: formData.email
                    }
                });
                console.log("data", data);

                if (data.success) {
                    console.log(`Student was successfully added.`);
                    return <Navigate to='/students' />;
                } else {
                    console.log(`Student with id: ${data.deletedId} failed to be added.`);
                }

            } catch (error) {
                console.error(error);
            }
        }
    };

    const validateInput = () => {
        if (fieldName === "email" && value) {
            if (!validateEmail(value)) {
                setEmailError(true);
                setEmailHelperText("Valid email required");
            } else {
                setEmailError(false);
                setEmailHelperText("");
            }
        } else if (fieldName === "firstName" || fieldName === "lastName") {
            if (!value) {
                setNameError(true);
                setNameHelperText("First and last names are required");
            } else {
                setNameError(false);
                setNameHelperText("");
            }
        } else if (fieldName === "sid") {
            if (!validateSid(value)) {
                setSidError(true);
                setSidHelperText("6-digit student ID is required");
            } else {
                setSidError(false);
                setSidHelperText("");
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
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            error={nameError}
                            helperText={nameHelperText}
                            onBlur={validateInput}
                            required
                        />
                        <TextField
                            variant="outlined"
                            margin="dense"
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            error={nameError}
                            helperText={nameHelperText}
                            onBlur={validateInput}
                            required
                        />
                        <TextField
                            variant="outlined"
                            margin="dense"
                            label="Middle Name"
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleInputChange}
                        />
                    </Stack>

                    <Stack direction="row" justifyContent="space-between">
                        <Box width="45%">
                            <TextField
                                variant="outlined"
                                margin="dense"
                                fullWidth
                                label="Student ID"
                                name="sid"
                                value={formData.sid}
                                onChange={handleInputChange}
                                error={sidError}
                                helperText={sidHelperText}
                                onBlur={validateInput}
                                required
                            />
                        </Box>
                        <Box width="45%">
                            <TextField
                                variant="outlined"
                                margin="dense"
                                fullWidth
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                error={emailError}
                                helperText={emailHelperText}
                                onBlur={validateInput}
                                required
                            />
                        </Box>
                    </Stack>
                    <Button type="button" onClick={handleFormSubmit}>Submit</Button>
                </form>
            </Stack>
        </Container>
    );
};

export default AddStudent;
