import React from 'react';
import { Box, Button, createFilterOptions, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup"; //for validation
import useMediaQuery from '@mui/material/useMediaQuery'; //for responsiveness
import '../style.css';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Header from '../../../components/Header';
import FormikControl from '../FormikControl';
import { addStylish } from './addStylish';

const MySwal = withReactContent(Swal);

const initialValues = {
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    contact: ""
};

const roles = [
    { id: '1', title: "Haircut" },
    { id: '2', title: "Hair styling" },
    { id: '3', title: "Makeup" }
]

const phoneRefExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema = yup.object().shape({
    firstName: yup.string().required("first name required"),
    lastName: yup.string().required("last name required"),
    role: yup.string().required("role required"),
    email: yup.string().email("invalid email").required("email required"),
    contact: yup.string().matches(phoneRefExp, "Phone number is not valid").required("Contact number required")
});


function StylishForm(props) {

    const isNonMobile = useMediaQuery("(min-width: 600px)");

    const handleFormSubmit = async (values) => {
        addStylish(values);
    }
    return (
        <Box m="20px">
            <Header title="STYLISH FORM" subtitle="Crate a New Stylish Profile" />
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
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" }
                            }}
                        >
                            <FormikControl
                                control="input"
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={!!touched.firstName && !!errors.firstName}
                                helperText={touched.firstName && errors.firstName}
                            />

                            <FormikControl
                                control="input"
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                error={!!touched.lastName && !!errors.lastName}
                                helperText={touched.lastName && errors.lastName}
                            />

                            <FormikControl
                                control="select"
                                name="role"
                                label="Role"
                                value={values.role}
                                onChange={handleChange}
                                options={roles}
                                error={!!touched.role && !!errors.role}
                                helperText={touched.role && errors.role}
                            />

                            <FormikControl
                                control="input"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 2", width: "50%" }}
                            />

                            <FormikControl
                                control="input"
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
                            <Button type="submit" color="secondary" variant="contained">Create New Stylish</Button>
                        </Box>
                    </Form>
                )}
            </Formik>

        </Box>
    );
}

export default StylishForm;