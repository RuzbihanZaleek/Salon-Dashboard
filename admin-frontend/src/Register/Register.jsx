import React from 'react';
import { Box, Button, IconButton, InputAdornment, TextField, useTheme } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup"; //for validation
import useMediaQuery from '@mui/material/useMediaQuery'; //for responsiveness
import { useState } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Header from '../components/Header';

const MySwal = withReactContent(Swal);

const phoneRefExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema = yup.object().shape({
    firstName: yup.string().required("first name required"),
    lastName: yup.string().required("last name required"),
    email: yup.string().email("invalid email").required("email required"),
    contact: yup.string().matches(phoneRefExp, "Phone number is not valid").required("Contact number required"),
    password: yup.string().required('No password provided.').min(8, 'Password is too short - should be 8 chars minimum.'),
    cpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('No password provided.')
});


function Register(props) {

    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    var token = searchParams.get("key");
    var decoded = jwt_decode(token);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState(decoded.email);
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [showpassword, setShowpassword] = useState(false);
    const [showcpassword, setShowcpassword] = useState(false);


    const initialValues = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        contact: contact,
        password: password,
        cpassword: cpassword,
        showPassword: showpassword,
        showcpassword: showcpassword
    };

    const handleFormSubmit = async (values) => {
        console.log(values);
        try {
            const response = await axios.post(
                'http://localhost:8080/signup', values
            )
            console.log(response.status);
            if (response.status === 200) {
                console.log(response.status);
                MySwal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Admin Added',
                    time: 4000
                }).then(() => {
                    navigate("/login");
                });
            } else if (response.status === 201) {
                MySwal.fire({
                    icon: 'info',
                    title: 'Oops..',
                    text: 'Admin Already Exist',
                    time: 4000
                });
            }
        } catch (error) {
            console.log(error);
            MySwal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Something Went Wrong',
                time: 4000
            })
        }
    }

    const handleClickShowPassword = () => {
        setShowpassword(!initialValues.showPassword);
    };

    const handleClickShowCpassword = () => {
        setShowcpassword(!initialValues.showcpassword);
    };

    const handleChange = (prop) => (event) => {
        console.log(prop);
        //setValues({ ...value, [prop]: event.target.value });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box m="20px">
            <Box width="500px" margin="40px auto" sx={{ border: 1, borderRadius: "5px", padding: "5px", borderColor: "#70d8bd" }}>
                <Header title="Register" subtitle="Admin Registration Form" />
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
                                    sx={{ gridColumn: "span 2" }}
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
                                    sx={{ gridColumn: "span 2" }}
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
                                    disabled
                                    error={!!touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: "span 2" }}
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
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <TextField
                                    fullWidth
                                    variant='filled'
                                    type={initialValues.showPassword ? 'text' : 'password'}
                                    label="Password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    InputProps={{
                                        ...values,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    // onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {initialValues.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    value={values.password}
                                    name="password"
                                    error={!!touched.password && !!errors.password}
                                    helperText={touched.password && errors.password}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <TextField
                                    fullWidth
                                    variant='filled'
                                    type={initialValues.showcpassword ? 'text' : 'password'}
                                    label="Confirm Password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    InputProps={{
                                        ...values,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowCpassword}
                                                    // onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {initialValues.showcpassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    value={values.cpassword}
                                    name="cpassword"
                                    error={!!touched.cpassword && !!errors.cpassword}
                                    helperText={touched.cpassword && errors.cpassword}
                                    sx={{ gridColumn: "span 2" }}
                                />
                            </Box>
                            <Box display="flex" justifyContent="start" mt="40px">
                                <Button type="submit" color="secondary" variant="contained">Register</Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
}

export default Register;