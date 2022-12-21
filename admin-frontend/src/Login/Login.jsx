import React, { useRef } from 'react';
import { Box, Button, IconButton, InputAdornment, TextField, useTheme } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup"; //for validation
import useMediaQuery from '@mui/material/useMediaQuery'; //for responsiveness
import { useState } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { signin } from '../api/routes';

const MySwal = withReactContent(Swal);

const phoneRefExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("email required"),
    password: yup.string().required('No password provided.').min(8, 'Password is too short - should be 8 chars minimum.'),
});


function Login(props) {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showpassword, setShowpassword] = useState(false);

    const initialValues = {
        email: email,
        password: password,
        showPassword: showpassword
    };

    const handleFormSubmit = async (values) => {

        try {
            const response = await axios.post(
                'http://localhost:8080/signin', values
            )

            if (response.status === 200) {
                MySwal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Successfully Logged In',
                    time: 4000
                }).then(() => {
                    if (response.data.accessToken) {
                        localStorage.setItem("admin", JSON.stringify(response.data));
                    }
                    //navigate("/dashboard");
                    window.location = "/dashboard";
                });
            } else if (response.status === 201) {
                MySwal.fire({
                    icon: 'info',
                    title: 'Oops..',
                    text: 'Invalid Email!',
                    time: 4000
                });
            }
            else if (response.status === 202) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Invalid Password!',
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

    const handleChange = (prop) => (event) => {
        console.log(prop);
        //setValues({ ...value, [prop]: event.target.value });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    return (
        <Box m="20px">
            <Box width="500px" margin="120px auto" sx={{ border: 1, borderRadius: "5px", padding: "5px", borderColor: "#70d8bd" }}>
                <Header title="Login" subtitle="Admin Login Page" />
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
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={!!touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <TextField
                                    fullWidth
                                    variant='filled'
                                    //type="password"
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
                            </Box>
                            <Box display="flex" justifyContent="start" mt="40px">
                                <Button type="submit" color="secondary" variant="contained">Login</Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
}

export default Login;