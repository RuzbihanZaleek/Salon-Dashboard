import React from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup"; //for validation
import useMediaQuery from '@mui/material/useMediaQuery'; //for responsiveness
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Header from '../../../components/Header';
import { addClient } from './addClient';

const MySwal = withReactContent(Swal);

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: ""
};

const phoneRefExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema = yup.object().shape({
    firstName: yup.string().required("first name required"),
    lastName: yup.string().required("last name required"),
    email: yup.string().email("invalid email").required("email required"),
    contact: yup.string().matches(phoneRefExp, "Phone number is not valid").required("Contact number required")
});


function ClientForm(props) {

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const isNonMobile = useMediaQuery("(min-width: 600px)");

    const handleFormSubmit = async (values) => {
        addClient(values);
    }

    return (
        <Box m="20px">
            <Header title="CLIENT FORM" subtitle="Crate a New Client Profile" />
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={userSchema}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" }
                            }}
                        >
                            <TextField
                                fullWidth
                                variant='filled'
                                type="text"
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={!!touched.firstName && !!errors.firstName}
                                helperText={touched.firstName && errors.firstName}
                                sx={{ gridColumn: "span 2", width: "50%" }}
                            />

                            <TextField
                                fullWidth
                                variant='filled'
                                type="text"
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                error={!!touched.lastName && !!errors.lastName}
                                helperText={touched.lastName && errors.lastName}
                                sx={{ gridColumn: "span 2", width: "50%" }}
                            />

                            <TextField
                                fullWidth
                                variant='filled'
                                type="text"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 2", width: "50%" }}
                            />

                            <TextField
                                fullWidth
                                variant='filled'
                                type="text"
                                label="Contact"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.contact}
                                name="contact"
                                error={!!touched.contact && !!errors.contact}
                                helperText={touched.contact && errors.contact}
                                sx={{ gridColumn: "span 2", width: "50%" }}
                            />

                        </Box>
                        <Box display="flex" justifyContent="start" mt="40px">
                            <Button type="submit" color="secondary" variant="contained">Create New Client</Button>
                        </Box>
                    </Form>
                )}
            </Formik>

        </Box>
    );
}

export default ClientForm;