import React from 'react';
import { Box, Button } from "@mui/material";
import { Form, Formik, isEmptyArray } from "formik";
import * as yup from "yup"; //for validation
import useMediaQuery from '@mui/material/useMediaQuery'; //for responsiveness
import { useState } from 'react';
import { addBooking } from './addBooking';
import Header from '../../../components/Header';
import FormikControl from '../FormikControl';
import axios from 'axios';

const initialValues = {
    client: "",
    service: "",
    date: null,
    time: null,
    stylish: "",
    status: "Not Completed"
};

const services = [
    { id: '1', title: "Haircut" },
    { id: '2', title: "Hair styling" },
    { id: '3', title: "Makeup" }
]


const userSchema = yup.object().shape({
    client: yup.string().required("client is required"),
    service: yup.string().required("service is required"),
    date: yup.date().required("date is required"),
    time: yup.date().required("time is required"),
    stylish: yup.string().required("stylish is required"),
});


function BookingForm(props) {

    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [clients, setClients] = useState([{}]);
    const [stylish, setStylish] = useState([{}]);

    const handleChanging = async (changedService) => {
        const response = await axios.get(`http://localhost:8080/get-stylish-service/${changedService}`);
        const newData = await response.data;
        setStylish(newData);
    }

    const handleFormSubmit = (values) => {
        //console.log(values);
        addBooking(values);
    }

    const fetchClients = async () => {
        const response = await fetch('http://localhost:8080/get-client');
        const newData = await response.json();
        setClients(newData);
    }

    const fetchStylish = async () => {
        const response = await fetch('http://localhost:8080/get-stylish');
        const stylish = await response.json();
        setStylish(stylish);
    }

    React.useEffect(() => {
        fetchClients();
        fetchStylish();
    }, []);

    const clientList = clients.map(person => (
        { id: person._id, title: (person.firstName + " " + person.lastName) }
    ));

    const stylishList = stylish.map(person => (
        { id: person._id, title: (person.firstName + " " + person.lastName) }
    ));

    return (
        <Box m="20px">
            <Header title="BOOKING" subtitle="Crate a New Booking" />
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={userSchema}
            >
                {({ values, errors, touched, handleBlur, setFieldValue, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" }
                            }}
                        >
                            {/* CLIENT */}
                            <FormikControl
                                control="select"
                                name="client"
                                label="Client"
                                value={values.client}
                                onChange={handleChange}
                                options={clientList}
                                error={!!touched.client && !!errors.client}
                                helperText={touched.client && errors.client}
                            />

                            {/* SERVICES */}
                            <FormikControl
                                control="select"
                                name="service"
                                label="Service"
                                value={values.service}
                                // onChange={(e) => handleChanging(e.target.value)}
                                // onChange={(e) => {
                                //     setFieldValue("service", e.target.value);
                                //     handleChanging(e.target.value, values.date, values.time);
                                // }}
                                onChange={(e) => {
                                    setFieldValue("service", e.target.value);
                                    handleChanging(e.target.value);
                                }}
                                options={services}
                                error={!!touched.service && !!errors.service}
                                helperText={touched.service && errors.service}
                            />

                            {/* DATE */}
                            <FormikControl
                                control="date"
                                name="date"
                                label="Date"
                                value={values.date}
                                onChange={handleChange}
                                error={!!touched.date && !!errors.date}
                                helperText={touched.date && errors.date}
                            />

                            {/* TIME */}
                            <FormikControl
                                control="time"
                                name="time"
                                label="Time"
                                value={values.time}
                                onChange={handleChange}
                                error={!!touched.time && !!errors.time}
                                helperText={touched.time && errors.time}
                            />

                            {/* STYLISH */}
                            <FormikControl
                                control="select"
                                name="stylish"
                                label="Stylish"
                                value={values.stylish}
                                onChange={handleChange}
                                options={stylishList}
                                error={!!touched.stylish && !!errors.stylish}
                                helperText={touched.stylish && errors.stylish}
                            />

                        </Box>
                        <Box display="flex" justifyContent="start" mt="40px">
                            <Button type="submit" color="secondary" variant="contained">New Booking</Button>
                        </Box>
                    </Form>
                )}
            </Formik>

        </Box>
    );
}

export default BookingForm;