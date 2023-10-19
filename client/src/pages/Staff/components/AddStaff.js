import { useState } from "react";
import { useMutation } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import { validateEmail } from "../../../utils/helpers";
import { TextField, Button, Container, Stack, Box } from "@mui/material";

import { QUERY_STAFF } from '../StaffQueries';
import { ADD_STAFF } from '../StaffMutations';

function AddStaff() {
    const [value, setValue] = useState("");
    const [fieldName, setfieldName] = useState("");
    const [roleError, setRoleError] = useState(false);
    const [roleHelperText, setRoleHelperText] = useState("");
    const [nameError, setNameError] = useState(false);
    const [nameHelperText, setNameHelperText] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState("");

    const [addStaff, { data, loading, error }] = useMutation(ADD_STAFF, {
        update(cache, { data: { addStaff } }) {
            try {
                console.log('data:', data);
                console.log('loading:', loading);
                console.log('error:', error);
                const { staffs } = cache.readQuery({ query: QUERY_STAFF });

                cache.writeQuery({
                    query: QUERY_STAFF,
                    data: { staffs: [addStaff, ...staffs] },
                });
            } catch (error) {
                console.error(error);
            }
        },
    });

    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        role: "",
        schools: "",
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        console.log("Form submitted", formData);
        if (!nameError && !emailError && !roleError) {
            try {
                const { data } = await addStaff({
                    variables: {
                        firstName: formData.firstName,
                        middleName: formData.middleName,
                        lastName: formData.lastName,
                        email: formData.email,
                        role: formData.role,
                        schools: formData.schools
                    }
                });
                console.log("data", data);

                if (data.success) {
                    console.log(`Staff was successfully added.`);
                    return <Navigate to='/staff' />;
                } else {
                    console.log(`Staff failed to be added.`);
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
        } else if (fieldName === "role") {
            if (!value) {
                setRoleError(true);
                setRoleHelperText("Role is required");
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
                                label="Role"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                error={roleError}
                                helperText={roleHelperText}
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

export default AddStaff;
